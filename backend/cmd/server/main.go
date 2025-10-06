package main

import (
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/joho/godotenv"
	"github.com/rs/cors"

	"github.com/lcontesini/proxima-viagem/internal/ai"
	"github.com/lcontesini/proxima-viagem/internal/api"
	"github.com/lcontesini/proxima-viagem/internal/cache"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found, using environment variables")
	}

	port := os.Getenv("PORT")
	if port == "" {
		port = "8080"
	}

	cacheInstance := cache.New()
	aiClient := ai.NewClient()
	handler := api.NewHandler(cacheInstance, aiClient)

	r := mux.NewRouter()
	r.HandleFunc("/api/destination", handler.GetTestDestination).Methods("GET")
	r.HandleFunc("/api/destination/real", handler.GetDailyDestination).Methods("GET")
	r.HandleFunc("/api/health", handler.HealthCheck).Methods("GET")
	r.HandleFunc("/api/cache/clear", handler.ClearCache).Methods("POST")

	c := cors.New(cors.Options{
		AllowedOrigins:   []string{"*"},
		AllowedMethods:   []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowedHeaders:   []string{"*"},
		AllowCredentials: true,
	})

	handlerWithCors := c.Handler(r)

	log.Printf("Server starting on port %s", port)
	if err := http.ListenAndServe(":"+port, handlerWithCors); err != nil {
		log.Fatal(err)
	}
}
