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
	r.HandleFunc("/api/destination", api.LoggingMiddleware(handler.GetDailyDestination)).Methods("GET")
	r.HandleFunc("/api/destination/fallback", api.LoggingMiddleware(handler.GetTestDestination)).Methods("GET")
	r.HandleFunc("/api/destinations", api.LoggingMiddleware(handler.GetAllDestinations)).Methods("GET")
	r.HandleFunc("/api/destination/add", api.LoggingMiddleware(handler.AddDestination)).Methods("POST")
	r.HandleFunc("/api/health", api.LoggingMiddleware(handler.HealthCheck)).Methods("GET")
	r.HandleFunc("/api/metrics", api.LoggingMiddleware(handler.GetMetrics)).Methods("GET")
	r.HandleFunc("/api/cache/clear", api.LoggingMiddleware(handler.ClearCache)).Methods("POST")
	r.HandleFunc("/api/destination/force", api.LoggingMiddleware(handler.ForceNewDestination)).Methods("POST")

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
