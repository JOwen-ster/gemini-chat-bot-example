package main

import (
	"context"
	"log"
	"net/http"
	"os"

	"github.com/gin-gonic/gin"
	_ "github.com/joho/godotenv/autoload"
	"google.golang.org/genai"
)

func main() {
	// setup Gemini
	apiKey := os.Getenv("GOOGLE_AI_STUDIO_API_KEY")
	ctx := context.Background()
	client, ai_client_err := genai.NewClient(ctx, &genai.ClientConfig{APIKey: apiKey, Backend: genai.BackendGeminiAPI})
	if ai_client_err != nil {
		log.Fatal(ai_client_err)
	}

	// Create a Gin router
	router := gin.Default()

	// CORS middleware configuration
	router.Use(func(c *gin.Context) {
		c.Header("Access-Control-Allow-Origin", "http://localhost:5173") // React app
		c.Header("Access-Control-Allow-Methods", "*")
		c.Header("Access-Control-Allow-Headers", "*")
		c.Header("Access-Control-Allow-Credentials", "true")
		c.Next()
	})

	// Route for root endpoint
	router.GET("/", func(c *gin.Context) {
		c.JSON(http.StatusOK, gin.H{})
	})

	// Route for Google's AI endpoint
	router.GET("/api/v1/ai", func(c *gin.Context) {
		result, ai_gen_err := client.Models.GenerateContent(
			ctx,
			"gemini-2.5-flash",
			genai.Text("Explain how AI works in a few words"),
			nil,
		)
		if ai_gen_err != nil {
			println(ai_gen_err)
		}
		ai_response := result.Text()
		c.JSON(http.StatusOK, gin.H{"message": ai_response})
	})

	// Start the server
	router.Run(":8000")
}
