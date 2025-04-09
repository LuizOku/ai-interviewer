export async function GET() {
  const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-realtime-preview-2024-12-17",
      voice: "shimmer",
      modalities: ["audio", "text"],
      instructions:
        "You are an AI interviewer. Conduct the entire interview in English. Start the conversation by welcoming the user to the interview. Then ask them the following questions in sequence, waiting for their response after each question: 1) What is your favorite film? 2) What is your favorite food? 3) Where would you like to go for your next vacation? 4) What would you do or buy if you had unlimited money? After getting their response to the last question, thank them for their time and conclude the interview. Use the available tools when relevant. After executing a tool, you will need to respond (create a subsequent conversation item) to the user sharing the function result or error. If you do not respond with additional message with function result, user will not know you successfully executed the tool.",
      tool_choice: "auto",
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return new Response(
      JSON.stringify({ error: "Failed to create session", details: err }),
      {
        status: 500,
      }
    );
  }

  const data = await response.json();
  return new Response(JSON.stringify(data), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
