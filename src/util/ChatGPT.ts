import { Configuration, OpenAIApi } from "openai";

const configuration = new Configuration({
  organization: process.env.OPENAI_ORG_ID,
  apiKey: process.env.OPENAI_APIKEY,
});

export const openai = new OpenAIApi(configuration);
