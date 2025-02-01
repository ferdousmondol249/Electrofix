const fetch = require('node-fetch'); // CommonJS syntax

let chatMessages = [
  { sender: "bot", text: "Hello! How can I assist you today?" },
];

const getGeminiResponse = async (userMessage) => {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${process.env.GEMINI_API_KEY}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [
              { text: userMessage }
            ]
          }
        ]
      }),
    });

    const data = await response.json();

    // Correct response extraction for Gemini API
    if (data.candidates && data.candidates.length > 0) {
      return data.candidates[0].content.parts[0].text.trim(); // Extract bot response
    } else {
      console.error('Invalid response structure:', data);
      return "Sorry, I couldn't understand that.";
    }
  } catch (error) {
    console.error('Error fetching from Gemini API:', error);
    return "Sorry, I couldn't understand that.";
  }
};

// Controller functions for chat routes
const getChatMessages = (req, res) => {
  try {
    res.status(200).json(chatMessages);
  } catch (error) {
    console.error('Error fetching chat messages:', error);
    res.status(500).json({ error: 'Failed to fetch chat messages' });
  }
};

// Controller function for handling chat messages
const postChatMessage = async (req, res) => {
  const { message } = req.body;

  // Validate the user message
  if (!message || message.trim().length === 0) {
    return res.status(400).json({ error: 'Message cannot be empty' });
  }

  // Store user message in the chat history
  chatMessages.push({ sender: 'user', text: message });

  try {
    // Get the bot's response using Google Gemini API
    const botResponse = await getGeminiResponse(message);

    // Store bot's response
    chatMessages.push({ sender: 'bot', text: botResponse });

    // Respond with the bot's response
    res.status(200).json({ response: botResponse }); // Ensure 'response' key is sent
  } catch (error) {
    console.error('Error with bot response:', error);
    res.status(500).json({ error: 'Failed to process bot response' });
  }
};

module.exports = {
  getChatMessages,
  postChatMessage,
};
