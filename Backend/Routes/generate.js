const axios = require("axios"); // Import axios for making HTTP requests
require("dotenv").config(); // Load environment variables from .env file

// Asynchronous function to generate flashcards from given notes
async function generateFlashcards(notes) {
  try {
    // Make a POST request to OpenAI's Chat Completion API
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo", // Specify the AI model to use
        messages: [
          {
            role: "user",
            content: `You are an assistant that only outputs valid JSON.

From the notes below, create exactly 5 flashcards in this format:

[
  {"question": "Question 1?", "answer": "Answer 1"},
  {"question": "Question 2?", "answer": "Answer 2"},
  {"question": "Question 3?", "answer": "Answer 3"},
  {"question": "Question 4?", "answer": "Answer 4"},
  {"question": "Question 5?", "answer": "Answer 5"}
]

Do NOT include any explanations, extra text, or formatting—only the JSON array.

If the notes do not contain enough information to create 5 flashcards, create as many as possible.

Notes:
${notes}` // Inject user-provided notes here for AI to process
          }
        ],
        temperature: 0.7 // Controls creativity/randomness of AI output (0.7 is moderate)
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`, // API key from environment variables
          "Content-Type": "application/json" // Request content type
        }
      }
    );

    // Extract the AI's text response from the API result
    const content = response.data.choices[0].message.content.trim();

    // Parse the AI's JSON string into a JavaScript object (array of flashcards)
    const flashcards = JSON.parse(content);

    // Log the generated flashcards to the console for verification
    console.log("✅ Flashcards Generated:\n", flashcards);

    // Return the flashcards array for further use (e.g., sending to client)
    return flashcards;
    
  } catch (err) {
    // Handle and log any errors that occur during the API call or JSON parsing
    console.error("❌ Error:", err.message);
  }
}

// 👇 Test the function by passing sample notes
generateFlashcards("The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration.");

// Export the function for use in other parts of the application  
module.exports = generateFlashcards; // Make the function available for import in other files
// This allows the function to be reused in different parts of the backend application
// and keeps the code modular and organized.