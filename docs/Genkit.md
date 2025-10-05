
import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
  model: googleAI.model('gemini-2.5-flash'), // Default model
});

// Generate with default model
const response1 = await ai.generate('prompt text');
console.log(response1.text);

// Generate with specific model reference
import { googleAI } from '@genkit-ai/google-genai';
const response2 = await ai.generate({
  model: googleAI.model('gemini-2.5-flash'),
  prompt: 'prompt text',
});
console.log(response2.text);

// Generate with model string ID
const response3 = await ai.generate({
  model: 'googleai/gemini-2.5-flash',
  prompt: 'prompt text',
});
console.log(response3.text);
At the heart of generative AI are AI models. Currently, the two most prominent examples of generative models are large language models (LLMs) and image generation models. These models take input, called a prompt (most commonly text, an image, or a combination of both), and from it produce as output text, an image, or even audio or video.

The output of these models can be surprisingly convincing: LLMs generate text that appears as though it could have been written by a human being, and image generation models can produce images that are very close to real photographs or artwork created by humans.

In addition, LLMs have proven capable of tasks beyond simple text generation:

Writing computer programs
Planning subtasks that are required to complete a larger task
Organizing unorganized data
Understanding and extracting information data from a corpus of text
Following and performing automated activities based on a text description of the activity
There are many models available to you, from several different providers. Each model has its own strengths and weaknesses and one model might excel at one task but perform less well at others. Apps making use of generative AI can often benefit from using multiple different models depending on the task at hand.

As an app developer, you typically don’t interact with generative AI models directly, but rather through services available as web APIs. Although these services often have similar functionality, they all provide them through different and incompatible APIs. If you want to make use of multiple model services, you have to use each of their proprietary SDKs, potentially incompatible with each other. And if you want to upgrade from one model to the newest and most capable one, you might have to build that integration all over again.

Genkit addresses this challenge by providing a single interface that abstracts away the details of accessing potentially any generative AI model service, with several pre-built implementations already available. Building your AI-powered app around Genkit simplifies the process of making your first generative AI call and makes it equally easy to combine multiple models or swap one model for another as new models emerge.

Before you begin
If you want to run the code examples on this page, first complete the steps in the Getting started guide. All of the examples assume that you have already installed Genkit as a dependency in your project.

Models supported by Genkit
Genkit is designed to be flexible enough to use potentially any generative AI model service. Its core libraries define the common interface for working with models, and model plugins define the implementation details for working with a specific model and its API.

The Genkit team maintains plugins for working with models provided by Vertex AI, Google Generative AI, and Ollama:

Gemini family of LLMs, through the Google Cloud Vertex AI plugin
Gemini family of LLMs, through the Google AI plugin
Imagen2 and Imagen3 image generation models, through Google Cloud Vertex AI
Anthropic’s Claude 3 family of LLMs, through Google Cloud Vertex AI’s model garden
Gemma 2, Llama 3, and many more open models, through the Ollama plugin (you must host the Ollama server yourself)
GPT, Dall-E and Whisper family of models, through the OpenAI plugin
Grok family of models, through the xAI plugin
DeepSeek Chat and DeepSeek Reasoner models, through the DeepSeek plugin
In addition, there are also several community-supported plugins that provide interfaces to these models:

Claude 3 family of LLMs, through the Anthropic plugin
GPT family of LLMs through the Azure OpenAI plugin
Command R family of LLMs through the Cohere plugin
Mistral family of LLMs through the Mistral plugin
Gemma 2, Llama 3, and many more open models hosted on Groq, through the Groq plugin
You can discover more by searching for packages tagged with genkit-model on npmjs.org.

Loading and configuring model plugins
Before you can use Genkit to start generating content, you need to load and configure a model plugin. If you’re coming from the Getting Started guide, you’ve already done this. Otherwise, see the Getting Started guide or the individual plugin’s documentation and follow the steps there before continuing.

The generate() method
In Genkit, the primary interface through which you interact with generative AI models is the generate() method.

The simplest generate() call specifies the model you want to use and a text prompt:

import { googleAI } from '@genkit-ai/google-genai';
import { genkit } from 'genkit';

const ai = genkit({
  plugins: [googleAI()],
  // Optional. Specify a default model.
  model: googleAI.model('gemini-2.5-flash'),
});

async function run() {
  const response = await ai.generate('Invent a menu item for a restaurant with a pirate theme.');
  console.log(response.text);
}

run();

When you run this brief example, it will print out some debugging information followed by the output of the generate() call, which will usually be Markdown text as in the following example:

## The Blackheart's Bounty

**A hearty stew of slow-cooked beef, spiced with rum and molasses, served in a
hollowed-out cannonball with a side of crusty bread and a dollop of tangy
pineapple salsa.**

**Description:** This dish is a tribute to the hearty meals enjoyed by pirates
on the high seas. The beef is tender and flavorful, infused with the warm spices
of rum and molasses. The pineapple salsa adds a touch of sweetness and acidity,
balancing the richness of the stew. The cannonball serving vessel adds a fun and
thematic touch, making this dish a perfect choice for any pirate-themed
adventure.

Run the script again and you’ll get a different output.

The preceding code sample sent the generation request to the default model, which you specified when you configured the Genkit instance.

You can also specify a model for a single generate() call:

import { googleAI } from '@genkit-ai/google-genai';

const response = await ai.generate({
  model: googleAI.model('gemini-2.5-flash'),
  prompt: 'Invent a menu item for a restaurant with a pirate theme.',
});

This example uses a model reference function provided by the model plugin. Model references carry static type information about the model and its options which can be useful for code completion in the IDE and at compile time. Many plugins use this pattern, but not all, so in cases where they don’t, refer to the plugin documentation for their preferred way to create function references.

Sometimes you may see code samples where model references are imported as constants:

import { googleAI, gemini20Flash } from '@genkit-ai/google-genai';

const ai = genkit({
  plugins: [googleAI()],
  model: gemini20Flash,
});

Some plugins may still use this pattern. For plugins that switched to the new syntax those constants are still there and continue to work, but new constants for new future models may not to be added in the future.

Another option is to specify the model using a string identifier. This way will work for all plugins regardless of how they chose to handle typed model references, however you won’t have the help of static type checking:

const response = await ai.generate({
  model: 'googleai/gemini-2.5-flash-001',
  prompt: 'Invent a menu item for a restaurant with a pirate theme.',
});

A model string identifier looks like providerid/modelid, where the provider ID (in this case, googleai) identifies the plugin, and the model ID is a plugin-specific string identifier for a specific version of a model.

Some model plugins, such as the Ollama plugin, provide access to potentially dozens of different models and therefore do not export individual model references. In these cases, you can only specify a model to generate() using its string identifier.

These examples also illustrate an important point: when you use generate() to make generative AI model calls, changing the model you want to use is simply a matter of passing a different value to the model parameter. By using generate() instead of the native model SDKs, you give yourself the flexibility to more easily use several different models in your app and change models in the future.

So far you have only seen examples of the simplest generate() calls. However, generate() also provides an interface for more advanced interactions with generative models, which you will see in the sections that follow.

System prompts
Some models support providing a system prompt, which gives the model instructions as to how you want it to respond to messages from the user. You can use the system prompt to specify a persona you want the model to adopt, the tone of its responses, the format of its responses, and so on.

If the model you’re using supports system prompts, you can provide one with the system parameter:

const response = await ai.generate({
  prompt: 'What is your quest?',
  system: "You are a knight from Monty Python's Flying Circus.",
});

Multi-turn conversations with messages
For multi-turn conversations, you can use the messages parameter instead of prompt to provide a conversation history. This is particularly useful when you need to maintain context across multiple interactions with the model.

The messages parameter accepts an array of message objects, where each message has a role (one of 'system', 'user', 'model', or 'tool') and content:

const response = await ai.generate({
  messages: [
    { role: 'user', content: 'Hello, can you help me plan a trip?' },
    { role: 'model', content: "Of course! I'd be happy to help you plan a trip. Where are you thinking of going?" },
    { role: 'user', content: 'I want to visit Japan for two weeks in spring.' },
  ],
});

You can also combine messages with other parameters like system prompts:

const response = await ai.generate({
  system: 'You are a helpful travel assistant.',
  messages: [{ role: 'user', content: 'What should I pack for Japan in spring?' }],
});

When to use messages vs. Chat API:

Use the messages parameter for simple multi-turn conversations where you manually manage the conversation history
For persistent chat sessions with automatic history management, use the Chat API instead
Model parameters
The generate() function takes a config parameter, through which you can specify optional settings that control how the model generates content:

const response = await ai.generate({
  prompt: 'Invent a menu item for a restaurant with a pirate theme.',
  config: {
    maxOutputTokens: 512,
    stopSequences: ['\n'],
    temperature: 1.0,
    topP: 0.95,
    topK: 40,
  },
});

The exact parameters that are supported depend on the individual model and model API. However, the parameters in the previous example are common to almost every model. The following is an explanation of these parameters:

Parameters that control output length
maxOutputTokens

LLMs operate on units called tokens. A token usually, but does not necessarily, map to a specific sequence of characters. When you pass a prompt to a model, one of the first steps it takes is to tokenize your prompt string into a sequence of tokens. Then, the LLM generates a sequence of tokens from the tokenized input. Finally, the sequence of tokens gets converted back into text, which is your output.

The maximum output tokens parameter simply sets a limit on how many tokens to generate using the LLM. Every model potentially uses a different tokenizer, but a good rule of thumb is to consider a single English word to be made of 2 to 4 tokens.

As stated earlier, some tokens might not map to character sequences. One such example is that there is often a token that indicates the end of the sequence: when an LLM generates this token, it stops generating more. Therefore, it’s possible and often the case that an LLM generates fewer tokens than the maximum because it generated the “stop” token.

stopSequences

You can use this parameter to set the tokens or token sequences that, when generated, indicate the end of LLM output. The correct values to use here generally depend on how the model was trained, and are usually set by the model plugin. However, if you have prompted the model to generate another stop sequence, you might specify it here.

Note that you are specifying character sequences, and not tokens per se. In most cases, you will specify a character sequence that the model’s tokenizer maps to a single token.

Parameters that control “creativity”
The temperature, top-p, and top-k parameters together control how “creative” you want the model to be. Below are very brief explanations of what these parameters mean, but the more important point to take away is this: these parameters are used to adjust the character of an LLM’s output. The optimal values for them depend on your goals and preferences, and are likely to be found only through experimentation.

temperature

LLMs are fundamentally token-predicting machines. For a given sequence of tokens (such as the prompt) an LLM predicts, for each token in its vocabulary, the likelihood that the token comes next in the sequence. The temperature is a scaling factor by which these predictions are divided before being normalized to a probability between 0 and 1.

Low temperature values—between 0.0 and 1.0—amplify the difference in likelihoods between tokens, with the result that the model will be even less likely to produce a token it already evaluated to be unlikely. This is often perceived as output that is less creative. Although 0.0 is technically not a valid value, many models treat it as indicating that the model should behave deterministically, and to only consider the single most likely token.

High temperature values—those greater than 1.0—compress the differences in likelihoods between tokens, with the result that the model becomes more likely to produce tokens it had previously evaluated to be unlikely. This is often perceived as output that is more creative. Some model APIs impose a maximum temperature, often 2.0.

topP

Top-p is a value between 0.0 and 1.0 that controls the number of possible tokens you want the model to consider, by specifying the cumulative probability of the tokens. For example, a value of 1.0 means to consider every possible token (but still take into account the probability of each token). A value of 0.4 means to only consider the most likely tokens, whose probabilities add up to 0.4, and to exclude the remaining tokens from consideration.

topK

Top-k is an integer value that also controls the number of possible tokens you want the model to consider, but this time by explicitly specifying the maximum number of tokens. Specifying a value of 1 means that the model should behave deterministically.

Experiment with model parameters
You can experiment with the effect of these parameters on the output generated by different model and prompt combinations by using the Developer UI. Start the developer UI with the genkit start command and it will automatically load all of the models defined by the plugins configured in your project. You can quickly try different prompts and configuration values without having to repeatedly make these changes in code.

Structured output
Genkit by Example: Structured Output
View a live example of using structured output to generate a D&D character sheet.
When using generative AI as a component in your application, you often want output in a format other than plain text. Even if you’re just generating content to display to the user, you can benefit from structured output simply for the purpose of presenting it more attractively to the user. But for more advanced applications of generative AI, such as programmatic use of the model’s output, or feeding the output of one model into another, structured output is a must.

In Genkit, you can request structured output from a model by specifying a schema when you call generate():

import { z } from 'genkit';

const MenuItemSchema = z.object({
  name: z.string().describe('The name of the menu item.'),
  description: z.string().describe('A description of the menu item.'),
  calories: z.number().describe('The estimated number of calories.'),
  allergens: z.array(z.string()).describe('Any known allergens in the menu item.'),
});

const response = await ai.generate({
  prompt: 'Suggest a menu item for a pirate-themed restaurant.',
  output: { schema: MenuItemSchema },
});

Model output schemas are specified using the Zod library. In addition to a schema definition language, Zod also provides runtime type checking, which bridges the gap between static TypeScript types and the unpredictable output of generative AI models. Zod lets you write code that can rely on the fact that a successful generate call will always return output that conforms to your TypeScript types.

When you specify a schema in generate(), Genkit does several things behind the scenes:

Augments the prompt with additional guidance about the desired output format. This also has the side effect of specifying to the model what content exactly you want to generate (for example, not only suggest a menu item but also generate a description, a list of allergens, and so on).
Parses the model output into a JavaScript object.
Verifies that the output conforms with the schema.
To get structured output from a successful generate call, use the response object’s output property:

const menuItem = response.output; // Typed as z.infer<typeof MenuItemSchema>
console.log(menuItem?.name);

Handling errors
Note in the prior example that the output property can be null. This can happen when the model fails to generate output that conforms to the schema. The best strategy for dealing with such errors will depend on your exact use case, but here are some general hints:

Try a different model. For structured output to succeed, the model must be capable of generating output in JSON. The most powerful LLMs, like Gemini and Claude, are versatile enough to do this; however, smaller models, such as some of the local models you would use with Ollama, might not be able to generate structured output reliably unless they have been specifically trained to do so.

Make use of Zod’s coercion abilities: You can specify in your schemas that Zod should try to coerce non-conforming types into the type specified by the schema. If your schema includes primitive types other than strings, using Zod coercion can reduce the number of generate() failures you experience. The following version of MenuItemSchema uses type coercion to automatically correct situations where the model generates calorie information as a string instead of a number:

const MenuItemSchema = z.object({
  name: z.string().describe('The name of the menu item.'),
  description: z.string().describe('A description of the menu item.'),
  calories: z.coerce.number().describe('The estimated number of calories.'),
  allergens: z.array(z.string()).describe('Any known allergens in the menu item.'),
});

Retry the generate() call. If the model you’ve chosen only rarely fails to generate conformant output, you can treat the error as you would treat a network error, and simply retry the request using some kind of incremental back-off strategy.

Streaming
When generating large amounts of text, you can improve the experience for your users by presenting the output as it’s generated—streaming the output. A familiar example of streaming in action can be seen in most LLM chat apps: users can read the model’s response to their message as it’s being generated, which improves the perceived responsiveness of the application and enhances the illusion of chatting with an intelligent counterpart.

In Genkit, you can stream output using the generateStream() method. Its syntax is similar to the generate() method:

const { stream, response } = ai.generateStream({
  prompt: 'Tell me a story about a boy and his dog.',
});

The response object has a stream property, which you can use to iterate over the streaming output of the request as it’s generated:

for await (const chunk of stream) {
  console.log(chunk.text);
}

You can also get the complete output of the request, as you can with a non-streaming request:

const finalResponse = await response;
console.log(finalResponse.text);

Streaming also works with structured output:

const { stream, response } = ai.generateStream({
  prompt: 'Suggest three pirate-themed menu items.',
  output: { schema: z.array(MenuItemSchema) },
});

for await (const chunk of stream) {
  console.log(chunk.output);
}

const finalResponse = await response;
console.log(finalResponse.output);

Streaming structured output works a little differently from streaming text: the output property of a response chunk is an object constructed from the accumulation of the chunks that have been produced so far, rather than an object representing a single chunk (which might not be valid on its own). Every chunk of structured output in a sense supersedes the chunk that came before it.

For example, here’s what the first five outputs from the prior example might look like:

null;

{
  starters: [{}];
}

{
  starters: [{ name: "Captain's Treasure Chest", description: 'A' }];
}

{
  starters: [
    {
      name: "Captain's Treasure Chest",
      description: 'A mix of spiced nuts, olives, and marinated cheese served in a treasure chest.',
      calories: 350,
    },
  ];
}

{
  starters: [
    {
      name: "Captain's Treasure Chest",
      description: 'A mix of spiced nuts, olives, and marinated cheese served in a treasure chest.',
      calories: 350,
      allergens: [Array],
    },
    { name: 'Shipwreck Salad', description: 'Fresh' },
  ];
}

Multimodal input
Genkit by Example: Image Analysis
See a live demo of how Genkit can enable image analysis using multimodal input.
The examples you’ve seen so far have used text strings as model prompts. While this remains the most common way to prompt generative AI models, many models can also accept other media as prompts. Media prompts are most often used in conjunction with text prompts that instruct the model to perform some operation on the media, such as to caption an image or transcribe an audio recording.

The ability to accept media input and the types of media you can use are completely dependent on the model and its API. For example, the Gemini 1.5 series of models can accept images, video, and audio as prompts.

To provide a media prompt to a model that supports it, instead of passing a simple text prompt to generate, pass an array consisting of a media part and a text part:

const response = await ai.generate({
  prompt: [{ media: { url: 'https://.../image.jpg' } }, { text: 'What is in this image?' }],
});

In the above example, you specified an image using a publicly-accessible HTTPS URL. You can also pass media data directly by encoding it as a data URL. For example:

import { readFile } from 'node:fs/promises';

const data = await readFile('image.jpg');
const response = await ai.generate({
  prompt: [{ media: { url: `data:image/jpeg;base64,${data.toString('base64')}` } }, { text: 'What is in this image?' }],
});

All models that support media input support both data URLs and HTTPS URLs. Some model plugins add support for other media sources. For example, the Vertex AI plugin also lets you use Cloud Storage (gs://) URLs.

Generating Media
While most examples in this guide focus on generating text with LLMs, Genkit also supports generating other types of media, including images and audio. Thanks to its unified generate() interface, working with media models is just as straightforward as generating text.

Note

Genkit returns generated media as a data URL, a widely supported format for handling binary media in both browsers and Node.js environments.

Image Generation
To generate an image using a model like Imagen from Vertex AI, follow these steps:

Install a data URL parser. Genkit outputs media as data URLs, so you’ll need to decode them before saving to disk. This example uses data-urls:

Terminal window
npm install data-urls
npm install --save-dev @types/data-urls

Generate the image and save it to a file:

import { vertexAI } from '@genkit-ai/vertexai';
import parseDataURL from 'data-urls';
import { writeFile } from 'node:fs/promises';

const response = await ai.generate({
  model: vertexAI.model('imagen-3.0-fast-generate-001'),
  prompt: 'An illustration of a dog wearing a space suit, photorealistic',
  output: { format: 'media' },
});

if (response?.media?.url) {
  const parsed = parseDataURL(response.media.url);
  if (parsed) {
    await writeFile('dog.png', parsed.body);
  }
}

This will generate an image and save it as a PNG file named dog.png.

Audio Generation
You can also use Genkit to generate audio with a text-to-speech (TTS) models. This is especially useful for voice features, narration, or accessibility support.

Here’s how to convert text into speech and save it as an audio file:

import { googleAI } from '@genkit-ai/google-genai';
import { writeFile } from 'node:fs/promises';
import { Buffer } from 'node:buffer';

const response = await ai.generate({
  model: googleAI.model('gemini-2.5-flash-preview-tts'),

  // Gemini-specific configuration for audio generation
  // Available configuration options will depend on model and provider
  config: {
    responseModalities: ['AUDIO'],
    speechConfig: {
      voiceConfig: {
        prebuiltVoiceConfig: { voiceName: 'Algenib' },
      },
    },
  },
  prompt: 'Say that Genkit is an amazing AI framework',
});

// Handle the audio data (returned as a data URL)
if (response.media?.url) {
  // Extract base64 data from the data URL
  const audioBuffer = Buffer.from(response.media.url.substring(response.media.url.indexOf(',') + 1), 'base64');

  // Save to a file
  await writeFile('output.wav', audioBuffer);
}

This code generates speech using the Gemini TTS model and saves the result to a file named output.wav.

Next steps
Learn more about Genkit
As an app developer, the primary way you influence the output of generative AI models is through prompting. Read Prompt management to learn how Genkit helps you develop effective prompts and manage them in your codebase.
Although generate() is the nucleus of every generative AI powered application, real-world applications usually require additional work before and after invoking a generative AI model. To reflect this, Genkit introduces the concept of flows, which are defined like functions but add additional features such as observability and simplified deployment. To learn more, see Defining workflows.
Advanced LLM use
Many of your users will have interacted with large language models for the first time through chatbots. Although LLMs are capable of much more than simulating conversations, it remains a familiar and useful style of interaction. Even when your users will not be interacting directly with the model in this way, the conversational style of prompting is a powerful way to influence the output generated by an AI model. Read Multi-turn chats to learn how to use Genkit as part of an LLM chat implementation.
One way to enhance the capabilities of LLMs is to prompt them with a list of ways they can request more information from you, or request you to perform some action. This is known as tool calling or function calling. Models that are trained to support this capability can respond to a prompt with a specially-formatted response, which indicates to the calling application that it should perform some action and send the result back to the LLM along with the original prompt. Genkit has library functions that automate both the prompt generation and the call-response loop elements of a tool calling implementation. See Tool calling to learn more.
Retrieval-augmented generation (RAG) is a technique used to introduce domain-specific information into a model’s output. This is accomplished by inserting relevant information into a prompt before passing it on to the language model. A complete RAG implementation requires you to bring several technologies together: text embedding generation models, vector databases, and large language models. See Retrieval-augmented generation (RAG) to learn how Genkit simplifies the process of coordinating these various elements.
There are different categories of information that a developer working with an LLM may be handling simultaneously:

Input: Information that is directly relevant to guide the LLM’s response for a particular call. An example of this is the text that needs to be summarized.
Generation Context: Information that is relevant to the LLM, but isn’t specific to the call. An example of this is the current time or a user’s name.
Execution Context: Information that is important to the code surrounding the LLM call but not to the LLM itself. An example of this is a user’s current auth token.
Genkit provides a consistent context object that can propagate generation and execution context throughout the process. This context is made available to all actions including flows, tools, and prompts.

Context is automatically propagated to all actions called within the scope of execution: Context passed to a flow is made available to prompts executed within the flow. Context passed to the generate() method is available to tools called within the generation loop.

Why is context important?
As a best practice, you should provide the minimum amount of information to the LLM that it needs to complete a task. This is important for multiple reasons:

The less extraneous information the LLM has, the more likely it is to perform well at its task.
If an LLM needs to pass around information like user or account IDs to tools, it can potentially be tricked into leaking information.
Context gives you a side channel of information that can be used by any of your code but doesn’t necessarily have to be sent to the LLM. As an example, it can allow you to restrict tool queries to the current user’s available scope.

Context structure
Context must be an object, but its properties are yours to decide. In some situations Genkit automatically populates context. For example, when using persistent sessions the state property is automatically added to context.

One of the most common uses of context is to store information about the current user. We recommend adding auth context in the following format:

{
  auth: {
    uid: "...", // the user's unique identifier
    token: {...}, // the decoded claims of a user's id token
    rawToken: "...", // the user's raw encoded id token
    // ...any other fields
  }
}

The context object can store any information that you might need to know somewhere else in the flow of execution.

Use context in an action
To use context within an action, you can access the context helper that is automatically supplied to your function definition:

Flow
Tool
Prompt file
const summarizeHistory = ai.defineFlow({
  name: 'summarizeMessages',
  inputSchema: z.object({friendUid: z.string()}),
  outputSchema: z.string()
}, async ({friendUid}, {context}) => {
  if (!context.auth?.uid) throw new Error("Must supply auth context.");
  const messages = await listMessagesBetween(friendUid, context.auth.uid);
  const {text} = await ai.generate({
    prompt:
      `Summarize the content of these messages: ${JSON.stringify(messages)}`,
  });
  return text;
});

Provide context at runtime
To provide context to an action, you pass the context object as an option when calling the action.

Flows
Generation
Prompts
const summarizeHistory = ai.defineFlow(/* ... */);

const summary = await summarizeHistory(friend.uid, {
  context: { auth: currentUser },
});

Context propagation and overrides
By default, when you provide context it is automatically propagated to all actions called as a result of your original call. If your flow calls other flows, or your generation calls tools, the same context is provided.

If you wish to override context within an action, you can pass a different context object to replace the existing one:

const otherFlow = ai.defineFlow(/* ... */);

const myFlow = ai.defineFlow(
  {
    // ...
  },
  (input, { context }) => {
    // override the existing context completely
    otherFlow(
      {
        /*...*/
      },
      { context: { newContext: true } },
    );
    // or selectively override
    otherFlow(
      {
        /*...*/
      },
      { context: { ...context, updatedContext: true } },
    );
  },
);

When context is replaced, it propagates the same way. In this example, any actions that otherFlow called during its execution would inherit the overridden context.
The core of your app’s AI features are generative model requests, but it’s rare that you can simply take user input, pass it to the model, and display the model output back to the user. Usually, there are pre- and post-processing steps that must accompany the model call. For example:

Retrieving contextual information to send with the model call
Retrieving the history of the user’s current session, for example in a chat app
Using one model to reformat the user input in a way that’s suitable to pass to another model
Evaluating the “safety” of a model’s output before presenting it to the user
Combining the output of several models
Every step of this workflow must work together for any AI-related task to succeed.

In Genkit, you represent this tightly-linked logic using a construction called a flow. Flows are written just like functions, using ordinary TypeScript code, but they add additional capabilities intended to ease the development of AI features:

Type safety: Input and output schemas defined using Zod, which provides both static and runtime type checking
Integration with developer UI: Debug flows independently of your application code using the developer UI. In the developer UI, you can run flows and view traces for each step of the flow.
Simplified deployment: Deploy flows directly as web API endpoints, using Cloud Functions for Firebase or any platform that can host a web app.
Unlike similar features in other frameworks, Genkit’s flows are lightweight and unobtrusive, and don’t force your app to conform to any specific abstraction. All of the flow’s logic is written in standard TypeScript, and code inside a flow doesn’t need to be flow-aware.

Defining and calling flows
In its simplest form, a flow just wraps a function. The following example wraps a function that calls generate():

export const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ menuItem: z.string() }),
  },
  async ({ theme }) => {
    const { text } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
    });
    return { menuItem: text };
  },
);

Just by wrapping your generate() calls like this, you add some functionality: doing so lets you run the flow from the Genkit CLI and from the developer UI, and is a requirement for several of Genkit’s features, including deployment and observability (later sections discuss these topics).

Input and output schemas
One of the most important advantages Genkit flows have over directly calling a model API is type safety of both inputs and outputs. When defining flows, you can define schemas for them using Zod, in much the same way as you define the output schema of a generate() call; however, unlike with generate(), you can also specify an input schema.

While it’s not mandatory to wrap your input and output schemas in z.object(), it’s considered best practice for these reasons:

Better developer experience: Wrapping schemas in objects provides a better experience in the Developer UI by giving you labeled input fields.
Future-proof API design: Object-based schemas allow for easy extensibility in the future. You can add new fields to your input or output schemas without breaking existing clients, which is a core principle of robust API design.
All examples in this documentation use object-based schemas to follow these best practices.

Here’s a refinement of the last example, which defines a flow that takes a string as input and outputs an object:

import { z } from 'genkit';

const MenuItemSchema = z.object({
  dishname: z.string(),
  description: z.string(),
});

export const menuSuggestionFlowWithSchema = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: MenuItemSchema,
  },
  async ({ theme }) => {
    const { output } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
      output: { schema: MenuItemSchema },
    });
    if (output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
    return output;
  },
);

Note that the schema of a flow does not necessarily have to line up with the schema of the generate() calls within the flow (in fact, a flow might not even contain generate() calls). Here’s a variation of the example that passes a schema to generate(), but uses the structured output to format a simple string, which the flow returns.

export const menuSuggestionFlowMarkdown = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ formattedMenuItem: z.string() }),
  },
  async ({ theme }) => {
    const { output } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
      output: { schema: MenuItemSchema },
    });
    if (output == null) {
      throw new Error("Response doesn't satisfy schema.");
    }
    return {
      formattedMenuItem: `**${output.dishname}**: ${output.description}`,
    };
  },
);

Calling flows
Once you’ve defined a flow, you can call it from your Node.js code:

const { text } = await menuSuggestionFlow({ theme: 'bistro' });

The argument to the flow must conform to the input schema, if you defined one.

If you defined an output schema, the flow response will conform to it. For example, if you set the output schema to MenuItemSchema, the flow output will contain its properties:

const { dishname, description } = await menuSuggestionFlowWithSchema({ theme: 'bistro' });

Streaming flows
Flows support streaming using an interface similar to generate()’s streaming interface. Streaming is useful when your flow generates a large amount of output, because you can present the output to the user as it’s being generated, which improves the perceived responsiveness of your app. As a familiar example, chat-based LLM interfaces often stream their responses to the user as they are generated.

Here’s an example of a flow that supports streaming:

export const menuSuggestionStreamingFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    streamSchema: z.string(),
    outputSchema: z.object({ theme: z.string(), menuItem: z.string() }),
  },
  async ({ theme }, { sendChunk }) => {
    const { stream, response } = ai.generateStream({
      model: googleAI.model('gemini-2.5-flash'),
      prompt: `Invent a menu item for a ${theme} themed restaurant.`,
    });

    for await (const chunk of stream) {
      // Here, you could process the chunk in some way before sending it to
      // the output stream via sendChunk(). In this example, we output
      // the text of the chunk, unmodified.
      sendChunk(chunk.text);
    }

    const { text: menuItem } = await response;

    return {
      theme,
      menuItem,
    };
  },
);

The streamSchema option specifies the type of values your flow streams. This does not necessarily need to be the same type as the outputSchema, which is the type of the flow’s complete output.
The second parameter to your flow definition is called sideChannel. It provides features such as request context and the sendChunk callback. The sendChunk callback takes a single parameter, of the type specified by streamSchema. Whenever data becomes available within your flow, send the data to the output stream by calling this function.
In the above example, the values streamed by the flow are directly coupled to the values streamed by the generate() call inside the flow. Although this is often the case, it doesn’t have to be: you can output values to the stream using the callback as often as is useful for your flow.

Calling streaming flows
Streaming flows are also callable, but they immediately return a response object rather than a promise:

const response = menuSuggestionStreamingFlow.stream({ theme: 'Danube' });

The response object has a stream property, which you can use to iterate over the streaming output of the flow as it’s generated:

for await (const chunk of response.stream) {
  console.log('chunk', chunk);
}

You can also get the complete output of the flow, as you can with a non-streaming flow:

const output = await response.output;

Note that the streaming output of a flow might not be the same type as the complete output; the streaming output conforms to streamSchema, whereas the complete output conforms to outputSchema.

Running flows from the command line
You can run flows from the command line using the Genkit CLI tool:

Terminal window
genkit flow:run menuSuggestionFlow '{"theme": "French"}'

For streaming flows, you can print the streaming output to the console by adding the -s flag:

Terminal window
genkit flow:run menuSuggestionFlow '{"theme": "French"}' -s

Running a flow from the command line is useful for testing a flow, or for running flows that perform tasks needed on an ad hoc basis—for example, to run a flow that ingests a document into your vector database.

Debugging flows
One of the advantages of encapsulating AI logic within a flow is that you can test and debug the flow independently from your app using the Genkit developer UI.

To start the developer UI, run the following commands from your project directory:

Terminal window
genkit start -- tsx --watch src/your-code.ts

From the Run tab of developer UI, you can run any of the flows defined in your project:

Genkit DevUI flows

After you’ve run a flow, you can inspect a trace of the flow invocation by either clicking View trace or looking on the Inspect tab.

In the trace viewer, you can see details about the execution of the entire flow, as well as details for each of the individual steps within the flow. For example, consider the following flow, which contains several generation requests:

const PrixFixeMenuSchema = z.object({
  starter: z.string(),
  soup: z.string(),
  main: z.string(),
  dessert: z.string(),
});

export const complexMenuSuggestionFlow = ai.defineFlow(
  {
    name: 'complexMenuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: PrixFixeMenuSchema,
  },
  async ({ theme }): Promise<z.infer<typeof PrixFixeMenuSchema>> => {
    const chat = ai.chat({ model: googleAI.model('gemini-2.5-flash') });
    await chat.send('What makes a good prix fixe menu?');
    await chat.send(
      'What are some ingredients, seasonings, and cooking techniques that ' + `would work for a ${theme} themed menu?`,
    );
    const { output } = await chat.send({
      prompt: `Based on our discussion, invent a prix fixe menu for a ${theme} ` + 'themed restaurant.',
      output: {
        schema: PrixFixeMenuSchema,
      },
    });
    if (!output) {
      throw new Error('No data generated.');
    }
    return output;
  },
);

When you run this flow, the trace viewer shows you details about each generation request including its output:

Genkit DevUI flows

Flow steps
In the last example, you saw that each generate() call showed up as a separate step in the trace viewer. Each of Genkit’s fundamental actions show up as separate steps of a flow:

generate()
Chat.send()
embed()
index()
retrieve()
If you want to include code other than the above in your traces, you can do so by wrapping the code in a run() call. You might do this for calls to third-party libraries that are not Genkit-aware, or for any critical section of code.

For example, here’s a flow with two steps: the first step retrieves a menu using some unspecified method, and the second step includes the menu as context for a generate() call.

export const menuQuestionFlow = ai.defineFlow(
  {
    name: 'menuQuestionFlow',
    inputSchema: z.object({ question: z.string() }),
    outputSchema: z.object({ answer: z.string() }),
  },
  async ({ question }): Promise<{ answer: string }> => {
    const menu = await ai.run('retrieve-daily-menu', async (): Promise<string> => {
      // Retrieve today's menu. (This could be a database access or simply
      // fetching the menu from your website.)

      // ...

      return menu;
    });
    const { text } = await ai.generate({
      model: googleAI.model('gemini-2.5-flash'),
      system: "Help the user answer questions about today's menu.",
      prompt: question,
      docs: [{ content: [{ text: menu }] }],
    });
    return { answer: text };
  },
);

Because the retrieval step is wrapped in a run() call, it’s included as a step in the trace viewer:

Genkit DevUI flows

Deploying flows
You can deploy your flows directly as web API endpoints, ready for you to call from your app clients. Deployment is discussed in detail on several other pages, but this section gives brief overviews of your deployment options.

Cloud Functions for Firebase
To deploy flows with Cloud Functions for Firebase, use the onCallGenkit feature of firebase-functions/https. onCallGenkit wraps your flow in a callable function. You may set an auth policy and configure App Check.

import { hasClaim, onCallGenkit } from 'firebase-functions/https';
import { defineSecret } from 'firebase-functions/params';

const apiKey = defineSecret('GOOGLE_AI_API_KEY');

const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ menuItem: z.string() }),
  },
  async ({ theme }) => {
    // ...
    return { menuItem: 'Generated menu item would go here' };
  },
);

export const menuSuggestion = onCallGenkit(
  {
    secrets: [apiKey],
    authPolicy: hasClaim('email_verified'),
  },
  menuSuggestionFlow,
);

For more information, see the following pages:

Deploy with Firebase
Authorization and integrity
Firebase plugin
Express.js
To deploy flows using any Node.js hosting platform, such as Cloud Run, define your flows using defineFlow() and then call startFlowServer():

import { startFlowServer } from '@genkit-ai/express';

export const menuSuggestionFlow = ai.defineFlow(
  {
    name: 'menuSuggestionFlow',
    inputSchema: z.object({ theme: z.string() }),
    outputSchema: z.object({ result: z.string() }),
  },
  async ({ theme }) => {
    // ...
  },
);

startFlowServer({
  flows: [menuSuggestionFlow],
});

By default, startFlowServer will serve all the flows defined in your codebase as HTTP endpoints (for example, http://localhost:3400/menuSuggestionFlow). You can call a flow with a POST request as follows:

Terminal window
curl -X POST "http://localhost:3400/menuSuggestionFlow" \
  -H "Content-Type: application/json"  -d '{"data": {"theme": "banana"}}'

If needed, you can customize the flows server to serve a specific list of flows, as shown below. You can also specify a custom port (it will use the PORT environment variable if set) or specify CORS settings.

export const flowA = ai.defineFlow(
  {
    name: 'flowA',
    inputSchema: z.object({ subject: z.string() }),
    outputSchema: z.object({ response: z.string() }),
  },
  async ({ subject }) => {
    // ...
    return { response: 'Generated response would go here' };
  },
);

export const flowB = ai.defineFlow(
  {
    name: 'flowB',
    inputSchema: z.object({ subject: z.string() }),
    outputSchema: z.object({ response: z.string() }),
  },
  async ({ subject }) => {
    // ...
    return { response: 'Generated response would go here' };
  },
);

startFlowServer({
  flows: [flowB],
  port: 4567,
  cors: {
    origin: '*',
  },
});