// netlify/functions/gemini-proxy.js
import fetch from "node-fetch";

// The standard Gemini API REST endpoint URL
const GEMINI_API_BASE_URL = "https://generativelanguage.googleapis.com";

// --- Configuration ---
// 1. Choose your model
const MODEL_NAME = "gemini-2.5-flash"; 
// 2. Define the method endpoint
const API_METHOD = "generateContent"; 
// ---------------------

export async function handler(event) {
  // 1. Ensure the request is a POST request
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" })
    };
  }

  // 2. Safely parse the incoming JSON body
  let body;
  try {
    body = JSON.parse(event.body || "{}");
  } catch (error) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "Invalid JSON body" })
    };
  }

  // 3. Construct the full URL, including the API key as a query parameter
  // We use the environment variable defined in your Netlify settings
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    console.error("GEMINI_API_KEY environment variable is not set.");
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration error." })
    };
  }
  
  // Example full URL: https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=YOUR_KEY
  const fullUrl = `${GEMINI_API_BASE_URL}/v1beta/models/${MODEL_NAME}:${API_METHOD}?key=${apiKey}`;

  try {
    const res = await fetch(fullUrl, {
      method: "POST",
      headers: {
        // The Gemini API expects Content-Type for the body
        "Content-Type": "application/json",
        // Note: The Authorization: Bearer header is removed, 
        // as the standard API key is used in the query parameter.
      },
      // Pass the client's payload (e.g., the 'contents' object) directly
      body: JSON.stringify(body) 
    });

    const data = await res.json();

    // 4. Return the response from the Gemini API back to the client
    return {
      statusCode: res.status,
      // Pass-through the headers (optional, but good practice)
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    };
  } catch (error) {
    console.error("Fetch failed:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Error communicating with the Gemini API." })
    };
  }
}
