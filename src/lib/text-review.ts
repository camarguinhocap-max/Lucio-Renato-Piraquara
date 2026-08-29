export function textsDiffer(a: string, b: string): boolean {
  const normalize = (s: string) => s.trim().replace(/\s+/g, " ");
  return normalize(a) !== normalize(b);
}

const REVIEW_MODEL = "@cf/meta/llama-3.1-8b-instruct";

export async function reviewText(ai: Ai, original: string): Promise<string> {
  try {
    const response = await ai.run(REVIEW_MODEL, {
      messages: [
        {
          role: "system",
          content:
            "Você revisa ortografia e gramática de textos de notícias locais em português do Brasil. " +
            "Corrija apenas erros de português, mantendo o sentido, o tom e as informações exatamente " +
            "como estão. Responda só com o texto corrigido, sem comentários.",
        },
        { role: "user", content: original },
      ],
    });
    const corrected = (response as { response?: string }).response;
    return typeof corrected === "string" && corrected.trim().length > 0 ? corrected.trim() : original;
  } catch (error) {
    console.error("Text review via Workers AI failed, falling back to original text", error);
    return original;
  }
}
