const axios = require("axios");
require("dotenv").config();

async function generateFlashcards(notes) {
  try {
    const response = await axios.post(
      "https://api.openai.com/v1/chat/completions",
      {
        model: "gpt-3.5-turbo",
        messages: [
          {
            role: "user",
            content: `Make 5 flashcards from the notes below.
Format as JSON like this:
[
  {"question": "Q1?", "answer": "A1"},
  ...
]

Notes:
${notes}`
          }
        ],
        temperature: 0.7
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
          "Content-Type": "application/json"
        }
      }
    );

    const content = response.data.choices[0].message.content.trim();
    const flashcards = JSON.parse(content);

    console.log("✅ Flashcards Generated:\n", flashcards);
  } catch (err) {
    console.error("❌ Error:", err.message);
  }
}

// 👇 TEST IT
generateFlashcards("The mitochondria is the powerhouse of the cell. It produces ATP through cellular respiration.");
