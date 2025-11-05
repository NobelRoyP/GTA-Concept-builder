// netlify/functions/gemini-proxy.js
import fetch from "node-fetch";

export async function handler(event) {
  const body = JSON.parse(event.body || "{}");
  // Validate incoming request/body as needed

  const res = await fetch("https://api.example.com/gemini-endpoint", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Authorization": `Bearer ${process.env.GEMINI_API_KEY}`
    },
    body: JSON.stringify(body)
  });

  const data = await res.json();
  return {
    statusCode: res.status,
    body: JSON.stringify(data)
  };
}
