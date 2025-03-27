import { useEffect, useRef, useState } from "react";

function Chat() {
  const [messages, setMessages] = useState([
    { text: "Welcome to the chat!", sender: "system", timestamp: new Date().toISOString() }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:3002");
    socketRef.current = ws;

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const newMessage = {
          text: data.payload?.message || event.data,
          sender: data.sender === 'me' ? 'me' : 'other', // Use server's sender designation
          timestamp: data.timestamp || new Date().toISOString()
        };
        setMessages((prev) => [...prev, newMessage]);
      } catch {
        setMessages((prev) => [...prev, {
          text: event.data,
          sender: "other",
          timestamp: new Date().toISOString()
        }]);
      }
    };

    ws.onopen = () => {
      ws.send(JSON.stringify({
        "type": "join", 
        "payload": {"roomId": "red"}
      }));
    };

    return () => {
      if (socketRef.current?.readyState === WebSocket.OPEN) {
        socketRef.current.close();
      }
    };
  }, []);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    const message = input.trim();
    if (!message || !socketRef.current) return;

    const messageData = {
      type: "chat",
      payload: { 
        message,
        timestamp: new Date().toISOString()
      }
    };

    // Only send the message - don't add it locally
    socketRef.current.send(JSON.stringify(messageData));
    setInput("");
  };

  const handleTyping = () => {
    // Implement typing indicator logic if your backend supports it
  };

  return (
    <div className="flex flex-col h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex items-center border-b border-gray-200">
        <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
          C
        </div>
        <div className="ml-3">
          <h2 className="font-semibold text-gray-800">Group Chat</h2>
          <p className="text-xs text-gray-500">
            {isTyping ? "Typing..." : "Online"}
          </p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : message.sender === "system"
                    ? "bg-gray-200 text-gray-600 text-center"
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
              }`}
            >
              {message.sender !== "system" && message.sender !== "me" && (
                <p className="text-xs font-semibold text-blue-600">
                  {message.sender}
                </p>
              )}
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p
                className={`text-xs mt-1 text-right ${
                  message.sender === "me" ? "text-blue-100" : "text-gray-500"
                }`}
              >
                {new Date(message.timestamp).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </p>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {/* Input area */}
      <div className="bg-white p-4 border-t border-gray-200">
        <div className="flex items-center gap-2">
          <button className="p-2 text-gray-500 hover:text-gray-700 rounded-full hover:bg-gray-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15.172 7l-6.586 6.586a2 2 0 102.828 2.828l6.414-6.586a4 4 0 00-5.656-5.656l-6.415 6.585a6 6 0 108.486 8.486L20.5 13"
              />
            </svg>
          </button>
          <input
            type="text"
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              handleTyping();
            }}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-8.707l-3-3a1 1 0 00-1.414 0l-3 3a1 1 0 001.414 1.414L9 9.414V13a1 1 0 102 0V9.414l1.293 1.293a1 1 0 001.414-1.414z"
                clipRule="evenodd"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;