import React, { useState, useEffect, useRef } from "react";
import { Send, User } from "lucide-react";
import axios from "axios";
import { useParams } from "react-router-dom";

const IndividualWorker = () => {
    const [messages, setMessages] = useState([
        { text: "Welcome to the chat!", sender: "system", timestamp: new Date().toISOString() }
    ]);
    const [input, setInput] = useState("");
    const chatEndRef = useRef(null);
    const socketRef = useRef(null);
    const { id } = useParams(); // Extracting id from the URL parameter
    const [worker, setWorker] = useState(null);

    useEffect(() => {
        // Fetch worker data on page load
        const getWorker = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/v1/worker/${id}`);
                setWorker(response.data);
            } catch (error) {
                console.error("Error fetching worker:", error);
            }
        };

        getWorker();

        // Initialize WebSocket connection
        
        const ws = new WebSocket("ws://localhost:3002");
        socketRef.current = ws;

        // Handle incoming messages from WebSocket
        ws.onmessage = (event) => {
            try {
                const data = JSON.parse(event.data);
                const messageText = data.payload?.message || event.data;
                const newMessage = {
                    text: messageText,
                    sender: data.sender === "me" ? "me" : "other", // Server's sender designation
                    timestamp: data.timestamp || new Date().toISOString()
                };
                setMessages((prev) => [...prev, newMessage]);
            } catch {
                setMessages((prev) => [
                    ...prev,
                    {
                        text: event.data,
                        sender: "other",
                        timestamp: new Date().toISOString()
                    }
                ]);
            }
        };

        // Send a message when WebSocket is opened
        ws.onopen = () => {
            ws.send(JSON.stringify({
                type: "join",
                payload: { roomId: id }  // Use `id` as roomId for the worker's chat room
            }));
        };

        // Cleanup WebSocket connection on component unmount
        return () => {
            ws.close();
        };
    }, [id]); // Re-run effect if id changes

    // Handle sending a message
    const handleSendMessage = () => {
        if (input.trim() === "") return;

        // Send message to WebSocket server
        const message = {
            type: "message",
            payload: { message: input, roomId: id }
        };
        socketRef.current.send(JSON.stringify(message));

        // Update local message state for user
        setMessages([...messages, { sender: "me", text: input, timestamp: new Date().toISOString() }]);
        setInput(""); // Clear input field

        console.log(messages)
    };

    return (
        <div className="flex h-screen p-6 bg-gray-100">
            {/* Left: Worker Profile */}
            <div className="w-1/3 bg-white p-6 rounded-lg shadow-md flex flex-col items-center space-y-4">
                <h2 className="text-xl font-semibold">{worker ? worker.username : "Loading..."}</h2>
                <p className="text-sm text-gray-600">{worker ? worker.occupation : "N/A"}</p>
                <div className="mt-4 p-4 bg-gray-50 rounded-lg shadow-sm w-full">
                    <p><strong>Experience:</strong> {worker ? worker.experience : "N/A"} years</p>
                    <p><strong>Skill:</strong> {worker ? worker.skill : "N/A"}</p>
                </div>
                <p className="mt-4 text-gray-700 text-center">{worker ? worker.description : "No description available."}</p>
            </div>

            {/* Right: Chat Box */}
            <div className="w-2/3 ml-6 bg-white p-6 rounded-lg shadow-md flex flex-col space-y-4">
                <h2 className="text-xl font-semibold flex items-center">
                    <User className="mr-2" /> Chat with {worker ? worker.username : "Worker"}
                </h2>

                {/* Chat Messages */}
                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                    {messages.map((msg, index) =>(
                        <div key={index} className={`flex ${msg.sender === "me" ? "justify-end" : "justify-start"}`}>
                            <p className={`px-4 py-2 rounded-lg text-sm ${msg.sender === "me" ? "bg-blue-500 text-white" : "bg-gray-200 text-black"}`}>
                                {typeof msg.text === "object" ? msg.text.message : msg.text}
                                {/* {msg.text.message} */}
                            </p>
                        </div>
                    ))}
                    <div ref={chatEndRef} />
                </div>

                {/* Input Box */}
                <div className="flex items-center mt-4 border-t border-gray-200 pt-3">
                    <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder="Type a message..."
                        className="flex-1 p-3 bg-gray-50 border border-gray-300 rounded-lg focus:outline-none placeholder-gray-500"
                    />
                    <button
                        onClick={handleSendMessage}
                        className="ml-4 p-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                    >
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default IndividualWorker;