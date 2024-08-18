"use client";

import { useState } from "react";

export default function SubmitContent() {
  const [content, setContent] = useState("");
  const [message, setMessage] = useState("");
  const [buttonVisible, setButtonVisible] = useState(true); // State to control button visibility

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const response = await fetch("http://localhost:8080/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        content: content,
      }).toString(),
    });

    if (response.ok) {
      setMessage("Content submitted successfully!");
      setContent("");
      setButtonVisible(false); // Hide the button

      // Set a timeout to hide the button after 3 seconds
      setTimeout(() => {
        setButtonVisible(true); // Show the button again after 3 seconds (optional)
      }, 3000);
    } else {
      setMessage("Failed to submit content.");
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Submit Content</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="content" className="block mb-2">
            Your Content:
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded text-black"
            rows={4}
            required
          />
        </div>
        {buttonVisible && ( // Conditionally render the button
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Submit
          </button>
        )}
      </form>
      {message && <p className="mt-4 text-green-600">{message}</p>}
    </div>
  );
}
