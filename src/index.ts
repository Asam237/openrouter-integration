import OpenAI from "openai";
import readline from "readline";
import { API_KEY } from "./config";

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: API_KEY,
});

async function askQuestion(rl: readline.Interface) {
  rl.question("\n💬 Ask a question to the AI: ", async (userInput) => {
    console.log("\n⏳ Thinking...\n");
    try {
      const completion = await openai.chat.completions.create({
        model: "deepseek/deepseek-chat-v3-0324",
        messages: [
          {
            role: "user",
            content: userInput,
          },
        ],
      });

      console.log("🤖 AI Response:\n");
      console.log(completion.choices[0].message.content);
    } catch (error) {
      console.error("❌ Error:", error);
    } finally {
      // Relaunch the question prompt
      askQuestion(rl);
    }
  });
}

async function main() {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  askQuestion(rl);
}

main();
