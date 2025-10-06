package cache

import (
	"sync"
	"time"

	"github.com/lcontesini/proxima-viagem/internal/models"
)

type Cache struct {
	mu          sync.RWMutex
	destination *models.Destination
	lastUpdate  time.Time
}

func New() *Cache {
	return &Cache{}
}

func (c *Cache) Get() (*models.Destination, bool) {
	c.mu.RLock()
	defer c.mu.RUnlock()

	// Temporariamente sempre retorna false para forçar nova geração
	// Remova estas linhas depois de testar
	return nil, false

	// if c.destination == nil {
	// 	return nil, false
	// }

	// now := time.Now()
	// lastUpdateDate := c.lastUpdate.Format("2006-01-02")
	// todayDate := now.Format("2006-01-02")

	// if lastUpdateDate != todayDate {
	// 	return nil, false
	// }

	// return c.destination, true
}

func (c *Cache) Set(destination *models.Destination) {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.destination = destination
	c.lastUpdate = time.Now()
}

func (c *Cache) Clear() {
	c.mu.Lock()
	defer c.mu.Unlock()

	c.destination = nil
	c.lastUpdate = time.Time{}
}
