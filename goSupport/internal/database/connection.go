package database

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

func ConnectDB(dsn string) (*gorm.DB, error) {
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})
	if err != nil {
		return nil, err
	}

	sqlDB, _ := db.DB()
	sqlDB.SetMaxIdleConns(10)
	sqlDB.SetMaxOpenConns(50)

	// AUTO MIGRATIONS
	// err = db.AutoMigrate(
	// 	&models.User{},
	// 	&models.TeacherProfile{},
	// 	&models.Course{},
	// 	&models.CourseDetails{},
	// 	&models.Section{},
	// 	&models.Lesson{},
	// 	&models.LessonContent{},
	// )
	// if err != nil {
	// 	return nil, err
	// }

	log.Println("📦 Connected to PostgreSQL + Migrated Models")
	return db, nil
}
