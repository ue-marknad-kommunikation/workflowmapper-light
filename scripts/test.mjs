import { readFile } from "node:fs/promises";
import assert from "node:assert/strict";
import { generateSummary } from "../src/app.js";

const index = await readFile(new URL("../index.html", import.meta.url), "utf8");
const app = await readFile(new URL("../src/app.js", import.meta.url), "utf8");

assert(index.includes('data-theme="dark"'), "index.html must force dark theme");
assert(index.includes("./shared-ui/tokens.css"), "shared-ui tokens must be loaded");
assert(index.includes("./shared-ui/components.css"), "shared-ui components must be loaded");
assert(!/\blocalStorage\b|\bsessionStorage\b|document\.cookie/.test(app), "app must not persist exercise data automatically");
assert(!/XMLHttpRequest|fetch\s*\(\s*["'`]https?:/m.test(app), "app must not send data to remote APIs");

const summary = generateSummary({
  mode: "digital",
  title: "Ta fram månadsrapport",
  painPoint: "Samma uppgifter hämtas flera gånger.",
  desiredOutcome: "Mindre dubbelarbete.",
  steps: [
    { title: "Hämta siffror", role: "Analytiker", friction: ["finding-info"], frictionNote: "Flera källor" },
    { title: "Klistra in i mall", role: "", friction: [], frictionNote: "" },
  ],
  noClearFriction: false,
  improvementKinds: ["process", "automation"],
  improvementIdea: "Förenkla mallen och undersök regelstyrd hämtning.",
  humanOversight: "Analytiker kontrollerar avvikelser.",
  openQuestions: "Vilka källor är godkända?",
  firstTest: "Testa en förenklad mall.",
  successSignal: "Mindre tid",
  customSuccessSignal: "",
  prerequisites: "Kontrollera säkerhet och ansvar.",
  needsHelp: true,
});

assert(summary.includes("Ta fram månadsrapport"));
assert(summary.includes("Hämta siffror"));
assert(summary.includes("Leta information"));
assert(summary.includes("Ändra arbetssättet, Vanlig automatisering"));
assert(summary.includes("Behöver tas vidare med någon."));

console.log("Static checks passed");
