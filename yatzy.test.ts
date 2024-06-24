import { assertEquals } from "@std/assert";
import { calculateScore } from "./yatzy.ts";

Deno.test("hello", () => {
  const score = calculateScore([1, 1, 1, 1, 1], "chance");
  assertEquals(score, 5);
});
