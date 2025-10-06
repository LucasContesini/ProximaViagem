# Build stage
FROM golang:1.21-alpine AS builder

WORKDIR /app

# Copy go mod files
COPY go.* ./
RUN go mod download

# Copy source code
COPY . .

# Build
RUN go build -o bin/server cmd/server/main.go

# Runtime stage
FROM alpine:latest

RUN apk --no-cache add ca-certificates

WORKDIR /root/

# Copy binary from builder
COPY --from=builder /app/bin/server .

# Expose port
EXPOSE 8080

# Run
CMD ["./server"]
