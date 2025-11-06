import { GoogleGenAI, Modality } from "@google/genai";
import type { FormState, GeneratedContent, WritingType } from '../types';

const TEXT_MODEL_NAME = "gemini-2.5-flash";
const IMAGE_MODEL_NAME = "gemini-2.5-flash-image";

const buildPrompt = (formState: FormState): string => {
  const { writingType, theme, tone, customPrompt, length, characters, writingStyle, pointOfView, setting } = formState;
  
  const promptText = customPrompt || theme;
  
  let prompt = `Act as an expert creative writer. Generate a creative and engaging ${writingType.toLowerCase()} based on the following parameters:\n`;
  prompt += `- **Topic/Theme:** ${promptText}\n`;
  prompt += `- **Tone/Mood:** ${tone}\n`;

  if (writingStyle) {
    prompt += `- **Writing Style:** ${writingStyle}\n`;
  }
  
  if (length) {
    prompt += `- **Desired Length:** Approximately ${length} words.\n`;
  }
  
  if (writingType === 'Story') {
    if (pointOfView) {
      prompt += `- **Point of View:** ${pointOfView}\n`;
    }
    if (setting) {
      prompt += `- **Setting:** ${setting}\n`;
    }
    if (characters) {
      prompt += `- **Main Characters:** ${characters}\n`;
    }
  }
  
  prompt += `\nPlease generate the ${writingType.toLowerCase()}. Ensure the output is well-written, appropriate, and adheres strictly to the requested parameters. Only output the generated content, without any additional commentary or introduction.`;
  
  return prompt;
};

export const generateCreativeContent = async (formState: FormState): Promise<GeneratedContent> => {
  if (!process.env.API_KEY) {
    throw new Error("API key is missing. Please set the API_KEY environment variable.");
  }
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

  const textPrompt = buildPrompt(formState);
  const startTime = performance.now();

  try {
    const textResponse = await ai.models.generateContent({
      model: TEXT_MODEL_NAME,
      contents: textPrompt,
    });
    
    const text = textResponse.text;
    
    if (!text || text.trim() === '') {
      throw new Error("The API returned an empty response. Please try again with a different prompt.");
    }
    
    // Now, generate an image based on the content
    let imageUrl: string | undefined;
    try {
      const imagePrompt = `A beautiful and evocative digital painting illustrating a ${formState.writingType.toLowerCase()} about "${formState.customPrompt || formState.theme}" with a ${formState.tone} mood. Style: artistic, imaginative, high-quality.`;
      
      const imageResponse = await ai.models.generateContent({
        model: IMAGE_MODEL_NAME,
        contents: { parts: [{ text: imagePrompt }] },
        config: {
          responseModalities: [Modality.IMAGE],
        },
      });

      for (const part of imageResponse.candidates[0].content.parts) {
        if (part.inlineData) {
          const base64ImageBytes: string = part.inlineData.data;
          imageUrl = `data:image/png;base64,${base64ImageBytes}`;
          break;
        }
      }
    } catch (imageError) {
      console.warn("Image generation failed, but text was successful:", imageError);
      // Proceed without an image if generation fails
    }

    const endTime = performance.now();
    const generationTime = parseFloat(((endTime - startTime) / 1000).toFixed(2));

    return {
      id: `gen-${Date.now()}`,
      type: formState.writingType,
      theme: formState.customPrompt || formState.theme,
      tone: formState.tone,
      text: text.trim(),
      generationTime,
      imageUrl,
    };
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw new Error("Failed to generate content. The model may have refused the request due to safety settings or other limitations. Please adjust your prompt and try again.");
  }
};