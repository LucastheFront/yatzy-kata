import { assertEquals } from "@std/assert";
import { calculateScore } from "./yatzy.ts";

Deno.test("Testing Yahtzee", async (t) => {
  await t.step("Yahtzee should return 50", () => {
    const score = calculateScore([1, 1, 1, 1, 1], "yahtzee");
    assertEquals(score, 50);
  });

  await t.step("False Yahtzee should return 0", () => {
    const score = calculateScore([5, 5, 2, 1, 1], "yahtzee");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Full House", async (t) => {
  await t.step("Full house should return sum of all dices", () => {
    const score = calculateScore([5, 5, 5, 1, 1], "full house");
    assertEquals(score, 17);
  });

  await t.step(
    "Full house with pair first should return sum of all dices",
    () => {
      const score = calculateScore([5, 5, 1, 1, 1], "full house");
      assertEquals(score, 13);
    },
  );

  await t.step(
    "Full house with yahtzee should return 0",
    () => {
      const score = calculateScore([5, 5, 5, 5, 5], "full house");
      assertEquals(score, 0);
    },
  );

  await t.step("False full house should return 0", () => {
    const score = calculateScore([5, 2, 3, 0, 1], "full house");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Chance", async (t) => {
  await t.step("Chance should return sum of all dices", () => {
    const score = calculateScore([5, 4, 3, 2, 1], "chance");
    assertEquals(score, 15);
  });
});

Deno.test("Testing Large straight", async (t) => {
  await t.step("Large straight should return sum of all dices", () => {
    const score = calculateScore([2, 3, 4, 5, 6], "large straight");
    assertEquals(score, 20);
  });

  await t.step("False large straight should return 0", () => {
    const score = calculateScore([2, 3, 3, 5, 6], "large straight");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Small straight", async (t) => {
  await t.step("Small straight should return sum of all dices", () => {
    const score = calculateScore([1, 2, 3, 4, 5], "small straight");
    assertEquals(score, 15);
  });

  await t.step("False small straight should return 0", () => {
    const score = calculateScore([1, 2, 3, 3, 5], "small straight");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Four of a kind", async (t) => {
  await t.step("Four of a kind should return sum of 4 same dices", () => {
    const score = calculateScore([1, 1, 1, 1, 5], "four of a kind");
    assertEquals(score, 4);
  });

  await t.step("False four of a kind should return 0", () => {
    const score = calculateScore([1, 1, 1, 2, 5], "four of a kind");
    assertEquals(score, 0);
  });

  await t.step("False four of a kind with Yahtzee should return 0", () => {
    const score = calculateScore([1, 1, 1, 1, 1], "four of a kind");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Three of a kind", async (t) => {
  await t.step("Three of a kind should return sum of 3 same dices", () => {
    const score = calculateScore([1, 1, 1, 2, 5], "three of a kind");
    assertEquals(score, 3);
  });

  await t.step("False three of a kind should return 0", () => {
    const score = calculateScore([1, 1, 3, 2, 5], "three of a kind");
    assertEquals(score, 0);
  });

  await t.step("False three of a kind with Yahtzee should return 0", () => {
    const score = calculateScore([1, 1, 1, 1, 1], "three of a kind");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Two pairs", async (t) => {
  await t.step("Two pairs should return sum of the pair dices", () => {
    const score = calculateScore([1, 1, 2, 3, 3], "two pairs");
    assertEquals(score, 8);
  });

  await t.step("False two pairs should return 0", () => {
    const score = calculateScore([1, 1, 2, 4, 3], "two pairs");
    assertEquals(score, 0);
  });

  await t.step("False two pairs should return 0", () => {
    const score = calculateScore([1, 1, 1, 3, 3], "two pairs");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Pair", async (t) => {
  await t.step("Pair should return sum of the highest matching dices", () => {
    const score = calculateScore([1, 1, 4, 3, 3], "pair");
    assertEquals(score, 6);
  });

  await t.step("Pair should return sum of the highest matching dices", () => {
    const score = calculateScore([1, 2, 4, 2, 5], "pair");
    assertEquals(score, 4);
  });

  await t.step("False pair should return 0", () => {
    const score = calculateScore([1, 2, 3, 4, 5], "pair");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Ones", async (t) => {
  await t.step("One should return sum of all 1 dices", () => {
    const score = calculateScore([1, 1, 4, 3, 3], "ones");
    assertEquals(score, 2);
  });

  await t.step("One should return sum of all 1 dices", () => {
    const score = calculateScore([1, 1, 4, 1, 3], "ones");
    assertEquals(score, 3);
  });

  await t.step("False one should return 0", () => {
    const score = calculateScore([2, 3, 4, 5, 3], "ones");
    assertEquals(score, 0);
  });
});

Deno.test("Testing Twos", async (t) => {
  await t.step("Twos should return sum of all 2 dices", () => {
    const score = calculateScore([2, 2, 4, 3, 3], "twos");
    assertEquals(score, 4);
  });

  await t.step("Twos should return sum of all 2 dices", () => {
    const score = calculateScore([2, 2, 4, 2, 3], "twos");
    assertEquals(score, 6);
  });

  await t.step("False twos should return 0", () => {
    const score = calculateScore([1, 3, 4, 5, 3], "twos");
    assertEquals(score, 0);
  });
});
