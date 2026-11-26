/**
 * Parse JSON dari response AI secara defensif.
 * Menangani response JSON bersih, markdown code fence (termasuk dengan teks pengantar/penutup),
 * maupun teks pengantar/penutup di sekitar objek JSON `{ ... }`.
 * Tetap melempar `SyntaxError` jika JSON terpotong atau rusak.
 */
export function parseAIJsonResponse(raw: string): unknown {
  const trimmed = raw.trim();

  // 1. Jalur cepat: langsung JSON murni.
  let firstError: unknown;
  try {
    return JSON.parse(trimmed);
  } catch (err) {
    firstError = err;
  }

  // 2. Ekstrak blok markdown ```json ... ``` atau ``` ... ``` meski ada teks sebelum/sesudahnya.
  const fenceMatch = trimmed.match(/```(?:json)?\s*([\s\S]*?)\s*```/i);
  if (fenceMatch?.[1]) {
    try {
      return JSON.parse(fenceMatch[1].trim());
    } catch {
      // lanjut ke fallback objek JSON
    }
  }

  // 3. Fallback: ambil potongan dari `{` pertama sampai `}` terakhir.
  const firstBrace = trimmed.indexOf("{");
  const lastBrace = trimmed.lastIndexOf("}");
  if (firstBrace !== -1 && lastBrace > firstBrace) {
    try {
      return JSON.parse(trimmed.slice(firstBrace, lastBrace + 1));
    } catch {
      // lempar error asli di bawah
    }
  }

  throw firstError;
}
