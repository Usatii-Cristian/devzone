import { describe, it, expect } from "vitest";
import { gradeByOutput, canGradeOffline, isLocalLanguage } from "../lib/codeRunner.js";

describe("gradeByOutput", () => {
  it("matches exact output", () => {
    expect(gradeByOutput("Hello, World!", "Hello, World!").correct).toBe(true);
  });
  it("ignores trailing whitespace and newlines", () => {
    expect(gradeByOutput("Hello\n", "Hello").correct).toBe(true);
    expect(gradeByOutput("a \nb  ", "a\nb").correct).toBe(true);
  });
  it("normalizes CRLF", () => {
    expect(gradeByOutput("a\r\nb", "a\nb").correct).toBe(true);
  });
  it("fails on a real mismatch", () => {
    expect(gradeByOutput("5", "6").correct).toBe(false);
  });
  it("never marks empty expected output correct", () => {
    expect(gradeByOutput("", "").correct).toBe(false);
  });
  it("returns a shape compatible with the AI evaluator", () => {
    const r = gradeByOutput("x", "x");
    expect(r).toHaveProperty("scores.functionality");
    expect(r).toHaveProperty("feedback");
    expect(Array.isArray(r.issues)).toBe(true);
    expect(r.offline).toBe(true);
  });
});

describe("canGradeOffline", () => {
  it("true when expectedOutput is present", () => {
    expect(canGradeOffline({ expectedOutput: "x" })).toBe(true);
  });
  it("false when missing or blank", () => {
    expect(canGradeOffline({ expectedOutput: "  " })).toBe(false);
    expect(canGradeOffline({})).toBe(false);
    expect(canGradeOffline(null)).toBe(false);
  });
});

describe("isLocalLanguage", () => {
  it("treats js/jsx/python (and empty) as local", () => {
    ["javascript", "jsx", "python", "", "JavaScript"].forEach((l) =>
      expect(isLocalLanguage(l)).toBe(true)
    );
  });
  it("treats compiled/server languages as non-local", () => {
    ["c", "cpp", "java", "csharp", "php", "sql"].forEach((l) =>
      expect(isLocalLanguage(l)).toBe(false)
    );
  });
});
