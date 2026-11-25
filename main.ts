// The Battery's Last Text to Its Charger — make.fun entry (program/v1).
// Writes one line of plain text to entry.txt: the phone battery's final
// message to the charger it waited for all day.

import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const LINE =
  "i stayed at 1% for three hours so you could finish that reel. that\u2019s love. anyway, i\u2019m done \u2014 tell the charger the power bank was better in bed.";

const MAX_CHARS = 200;

function resolveOutputPath(): string {
  const dir =
    process.env.MAKEFUN_OUTPUT_DIR ||
    process.env.OUTPUT_PATH ||
    join(process.cwd(), "output");
  return join(dir, "entry.txt");
}

function main(): void {
  const outPath = resolveOutputPath();
  mkdirSync(join(outPath, ".."), { recursive: true });
  writeFileSync(outPath, LINE, "utf8");

  // Validate after writing: read back, byte-identical, within the gate.
  const back = readFileSync(outPath, "utf8");
  const codePoints = [...back].length;
  if (back !== LINE) {
    console.error("FAIL: entry.txt does not match the entry line");
    process.exit(1);
  }
  if (codePoints < 1 || codePoints > MAX_CHARS) {
    console.error(`FAIL: entry is ${codePoints} characters (limit 1-${MAX_CHARS})`);
    process.exit(1);
  }
  if (back.trim().length === 0) {
    console.error("FAIL: entry is only whitespace");
    process.exit(1);
  }
  console.log(back);
  console.log(`chars: ${codePoints}`);
}

main();
