import { Configuration, OpenAIApi } from "openai";

// Define Answer enum for yes/no
export enum Answer {
  Yes = "yes",
  No = "no",
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

export const containsArgument = async (text: string): Promise<Answer> => {
  const response = await openai.createCompletion({
    prompt: 'Is this text making an argument? Answer "yes" or "no".'.concat(
      text
    ),
    model: "text-davinci-002",
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    best_of: 1,
  });

  // Return "yes" or "no"
  const answer = response.data.choices[0].text;
  if (!answer) {
    throw new Error("Could not determine if text contains an argument.");
  }

  return answer.trim().toLowerCase() === "yes" ? Answer.Yes : Answer.No;
};

export const getCoreArgument = async (text: string): Promise<string> => {
  const response = await openai.createCompletion({
    prompt: "What is the core argument of this text?".concat(text),
    model: "text-davinci-002",
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    best_of: 1,
  });

  // If no core argument was found, throw an error
  if (!response.data.choices[0].text) {
    throw new Error("No core argument found.");
  }

  // Return the core argument
  return response.data.choices[0].text;
};

export const writeCounterargument = async (text: string): Promise<string> => {
  // Analyze the text using GPT-3's language modeling capabilities
  const response = await openai.createCompletion({
    prompt: "Write a counterargument to this text.".concat(text),
    model: "text-davinci-002",
    temperature: 0.5,
    max_tokens: 2048,
    top_p: 1,
    frequency_penalty: 0,
    presence_penalty: 0,
    best_of: 1,
  });

  // If no counterargument was found, throw an error
  if (!response.data.choices[0].text) {
    throw new Error("Could not write a counterargument.");
  }

  // Return the counterargument
  return response.data.choices[0].text;
};
