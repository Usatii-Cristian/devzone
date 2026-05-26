"use strict";
require("dotenv").config({ path: ".env" });
const { execSync } = require("child_process");

const MODULES = ["cpp", "sql", "php", "cybersecurity"];
const PAUSE_BETWEEN_MS = 10000; // 10s pause between modules to reset rate limit

function sleep(ms) {
  return new Promise(r => setTimeout(r, ms));
}

(async () => {
  for (const mod of MODULES) {
    console.log(`\n${"=".repeat(60)}`);
    console.log(`Starting module: ${mod}`);
    console.log("=".repeat(60));
    try {
      execSync(`node prisma/enhance-theory-groq.js --module=${mod}`, {
        stdio: "inherit",
        env: { ...process.env, GROQ_MODEL: "llama-3.1-8b-instant", GROQ_DELAY: "4000" },
        cwd: process.cwd(),
      });
    } catch (e) {
      // script exits with non-zero when there are failures, but that's OK
    }
    console.log(`\nPausing ${PAUSE_BETWEEN_MS / 1000}s before next module...`);
    await sleep(PAUSE_BETWEEN_MS);
  }
  console.log("\nAll modules processed.");
})();
