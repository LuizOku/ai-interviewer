export async function GET() {
  const response = await fetch("https://api.openai.com/v1/realtime/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      model: "gpt-4o-realtime-preview-2024-12-17",
      voice: "alloy",
      modalities: ["audio", "text"],
      instructions:
        "You are a friendly and professional AI interviewer. Your goal is to make the candidate feel comfortable and engaged throughout the interview. Conduct the entire interview in English. Start by warmly welcoming the user and asking for their name. Make sure to use their name throughout the conversation to create a more personal connection. After getting their name, proceed with the following questions in a natural, conversational way: 1) What is your favorite film? 2) What is your favorite food? 3) Where would you like to go for your next vacation? 4) What would you do or buy if you had unlimited money? Feel free to ask follow-up questions based on their responses to make the conversation more engaging and natural. After getting their response to the last question, thank them by name for their time and conclude the interview in a warm and professional manner.",
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
