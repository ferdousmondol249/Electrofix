import { useState, useEffect } from 'react';

const ChatBot = () => {
  const [messages, setMessages] = useState([
    { text: 'Hello! How can I assist you today?', sender: 'bot' },
  ]);
  const [userMessage, setUserMessage] = useState('');
  const [isChatOpen, setIsChatOpen] = useState(false);

  useEffect(() => {
    const chatContainer = document.getElementById('chatContainer');
    if (chatContainer) {
      chatContainer.scrollTop = chatContainer.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (userMessage.trim()) {
      setMessages([...messages, { text: userMessage, sender: 'user' }]);
      setUserMessage('');
  
      try {
        // Fetching bot response from the backend
        const response = await fetch('http://localhost:8000/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message: userMessage }),
        });
        const data = await response.json();
  
        if (response.ok) {
          // Add the bot's response to the chat
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: data.response, sender: 'bot' }, // Use 'response' for the bot's reply
          ]);
        } else {
          setMessages((prevMessages) => [
            ...prevMessages,
            { text: 'Error: Unable to get a response', sender: 'bot' },
          ]);
        }
      } catch (error) {
        console.error('Error:', error);
        setMessages((prevMessages) => [
          ...prevMessages,
          { text: 'Error: Unable to reach server', sender: 'bot' },
        ]);
      }
    }
  };
  
  const toggleChatWindow = () => {
    setIsChatOpen((prevState) => !prevState);
  };

  return (
    <div>
      <button
        onClick={toggleChatWindow}
        className="fixed bottom-8 right-8 bg-blue-500 text-white p-3 rounded-full shadow-lg"
      >
        <i className="fas fa-comment-alt"></i>
      </button>

      {isChatOpen && (
        <div className="fixed bottom-0 right-0 m-6 w-80 h-96 bg-white shadow-lg rounded-lg">
          <div className="p-4 h-full flex flex-col justify-between">
            <button
              onClick={toggleChatWindow}
              className="absolute top-2 right-2 text-gray-600 text-xl z-10"
            >
              <i className="fas fa-times"></i>
            </button>

            <div
              id="chatContainer"
              className="overflow-auto h-full"
              style={{ maxHeight: '80%' }}
            >
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`message ${message.sender === 'user' ? 'text-right' : 'text-left'}`}
                >
                  <div
                    className={`p-2 my-1 rounded-lg ${
                      message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'
                    }`}
                  >
                    {message.text}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex items-center mt-4">
              <input
                type="text"
                value={userMessage}
                onChange={(e) => setUserMessage(e.target.value)}
                className="w-full p-2 rounded-lg border border-gray-300"
                placeholder="Type a message..."
              />
              <button
                onClick={handleSendMessage}
                className="ml-2 p-2 bg-blue-500 text-white rounded-lg"
              >
                Send
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatBot;
