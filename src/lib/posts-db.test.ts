import { describe, expect, it } from "vitest";
import { deriveTitle } from "./posts-db";

describe("deriveTitle", () => {
  it("returns the full text when it already fits", () => {
    expect(deriveTitle("Prefeitura abre inscrições para cursos gratuitos")).toBe(
      "Prefeitura abre inscrições para cursos gratuitos",
    );
  });

  it("collapses internal whitespace and trims the ends", () => {
    expect(deriveTitle("  texto   com   espaços   \n extras  ")).toBe("texto com espaços extras");
  });

  it("truncates long text at a word boundary and adds an ellipsis", () => {
    const texto =
      "A prefeitura de Piraquara anunciou nesta terça-feira um novo programa de pavimentação " +
      "para os bairros da região metropolitana que vai começar no mês que vem";
    const title = deriveTitle(texto);
    expect(title.length).toBeLessThanOrEqual(61);
    expect(title.endsWith("…")).toBe(true);
    expect(title.endsWith(" …")).toBe(false);
  });
});
