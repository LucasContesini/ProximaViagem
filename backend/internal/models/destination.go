package models

import "time"

type Destination struct {
	ID              string       `json:"id"`
	Name            string       `json:"name"`
	Country         string       `json:"country"`
	Description     string       `json:"description"`
	DetailedInfo    string       `json:"detailedInfo"`
	ImageURL        string       `json:"imageUrl"`
	Images          []string     `json:"images"`
	Tips            []string     `json:"tips"`
	Attractions     []Attraction `json:"attractions"`
	BestTime        string       `json:"bestTime"`
	Budget          Budget       `json:"budget"`
	Transportation  string       `json:"transportation"`
	Accommodation   string       `json:"accommodation"`
	LocalCuisine    []string     `json:"localCuisine"`
	Date            time.Time    `json:"date"`
}

type Attraction struct {
	Name        string `json:"name"`
	Description string `json:"description"`
	Duration    string `json:"duration"`
	Price       string `json:"price"`
}

type Budget struct {
	Low    string `json:"low"`
	Medium string `json:"medium"`
	High   string `json:"high"`
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

