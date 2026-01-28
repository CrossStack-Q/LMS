// package ws

// import (
// 	"time"

// 	"github.com/gorilla/websocket"
// )

// // File: internal/ws/client.go (same package ws)
// // Put these fields/methods into the same file that defines Client/readPump/writePump

// type Client struct {
// 	hub *Hub

// 	conn *websocket.Conn
// 	send chan []byte

// 	userID string

// 	// rate limiting: circular buffer of recent message times
// 	lastMessages []time.Time
// 	// ... other fields if needed
// }

// func (c *Client) pruneMessageWindow(now time.Time) {
// 	threshold := now.Add(-1 * time.Second)
// 	i := 0
// 	for ; i < len(c.lastMessages); i++ {
// 		if c.lastMessages[i].After(threshold) {
// 			break
// 		}
// 	}
// 	// remove entries before i
// 	if i > 0 {
// 		c.lastMessages = c.lastMessages[i:]
// 	}
// }

package ws

import (
	"time"

	"github.com/gorilla/websocket"
)

const (
	writeWait      = 10 * time.Second
	pongWait       = 60 * time.Second
	pingPeriod     = (pongWait * 9) / 10
	maxMessageSize = 512 * 1024
)

type Client struct {
	hub  *Hub
	conn *websocket.Conn
	send chan []byte

	userID string

	lastMessages []time.Time
}

func (c *Client) pruneMessageWindow(now time.Time) {
	threshold := now.Add(-1 * time.Second)
	i := 0
	for ; i < len(c.lastMessages); i++ {
		if c.lastMessages[i].After(threshold) {
			break
		}
	}
	if i > 0 {
		c.lastMessages = c.lastMessages[i:]
	}
}

func (c *Client) readPump(handle func([]byte, *Client)) {
	defer func() {
		c.hub.unregister <- c
		c.conn.Close()
	}()

	c.conn.SetReadLimit(maxMessageSize)
	c.conn.SetReadDeadline(time.Now().Add(pongWait))
	c.conn.SetPongHandler(func(string) error {
		c.conn.SetReadDeadline(time.Now().Add(pongWait))
		return nil
	})

	for {
		_, message, err := c.conn.ReadMessage()
		if err != nil {
			break
		}
		handle(message, c)
	}
}

func (c *Client) writePump() {
	ticker := time.NewTicker(pingPeriod)
	defer func() {
		ticker.Stop()
		c.conn.Close()
	}()

	for {
		select {
		case msg, ok := <-c.send:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			if !ok {
				c.conn.WriteMessage(websocket.CloseMessage, []byte{})
				return
			}
			w, err := c.conn.NextWriter(websocket.TextMessage)
			if err != nil {
				return
			}
			w.Write(msg)
			w.Close()

		case <-ticker.C:
			c.conn.SetWriteDeadline(time.Now().Add(writeWait))
			c.conn.WriteMessage(websocket.PingMessage, nil)
		}
	}
}
