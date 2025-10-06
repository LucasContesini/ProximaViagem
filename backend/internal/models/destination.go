package models

import "time"

type Destination struct {
	ID          string    `json:"id"`
	Name        string    `json:"name"`
	Country     string    `json:"country"`
	Description string    `json:"description"`
	ImageURL    string    `json:"imageUrl"`
	Tips        []string  `json:"tips"`
	Attractions []string  `json:"attractions"`
	BestTime    string    `json:"bestTime"`
	Date        time.Time `json:"date"`
}

type AIRequest struct {
	Model     string      `json:"model"`
	Messages  []AIMessage `json:"messages"`
	MaxTokens int         `json:"max_tokens"`
}

type AIMessage struct {
	Role    string `json:"role"`
	Content string `json:"content"`
}

type AIResponse struct {
	Choices []struct {
		Message AIMessage `json:"message"`
	} `json:"choices"`
}

