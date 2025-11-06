// src/App.jsx
import React from "react";
import Sidebar from "./components/Sidebar";
import Home from "./components/Home/Home";
import Courses from "./components/Courses/Courses";
import { Routes, Route } from "react-router-dom";

const App = () => {
  return (
    // make the app exactly the viewport height and use flex
    <div className="h-screen flex bg-gray-50 p-6">
      <div className="w-1/5 min-h-full">
        <Sidebar />
      </div>
      <div className="w-4/5 min-h-full overflow-hidden">
        <div className="h-full overflow-y-auto hidescroll">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/courses" element={<Courses />} />
          </Routes>
        </div>
      </div>
    </div>
  );
};

export default App;
