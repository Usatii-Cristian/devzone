import { describe, it, expect } from "vitest";
import { mergeQueue } from "../lib/offlineQueue.js";

describe("mergeQueue", () => {
  it("adds a new item", () => {
    expect(mergeQueue([], { lessonId: "a", x: 1 })).toEqual([{ lessonId: "a", x: 1 }]);
  });
  it("replaces an existing lesson (last write wins)", () => {
    const q = [{ lessonId: "a", v: 1 }, { lessonId: "b", v: 1 }];
    const r = mergeQueue(q, { lessonId: "a", v: 2 });
    expect(r).toHaveLength(2);
    expect(r.find((i) => i.lessonId === "a").v).toBe(2);
    expect(r.find((i) => i.lessonId === "b").v).toBe(1);
  });
  it("tolerates a null queue", () => {
    expect(mergeQueue(null, { lessonId: "a" })).toEqual([{ lessonId: "a" }]);
  });
});
