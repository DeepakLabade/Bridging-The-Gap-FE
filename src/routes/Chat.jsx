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
          sender: data.sender === "me" ? "me" : "other",
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
      ws.send(JSON.stringify({ "type": "join", "payload": { "roomId": "red" } }));
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

    socketRef.current.send(JSON.stringify(messageData));
    setInput("");
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
          <div key={index} className={`flex ${message.sender === "me" ? "justify-end" : "justify-start"}`}>
            <div
              className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                message.sender === "me"
                  ? "bg-blue-500 text-white rounded-br-none"
                  : message.sender === "system"
                    ? "bg-gray-200 text-gray-600 text-center"
                    : "bg-white text-gray-800 rounded-bl-none shadow-sm"
              }`}
            >
              <p className="whitespace-pre-wrap">{message.text}</p>
              <p className={`text-xs mt-1 text-right ${message.sender === "me" ? "text-blue-100" : "text-gray-500"}`}>
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
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Type a message..."
          />
          <button
            onClick={sendMessage}
            className="p-2 bg-blue-500 text-white rounded-full hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}

export default Chat;