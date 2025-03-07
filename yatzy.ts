export type Roll = [number, number, number, number, number];

export type Category =
  | "yahtzee"
  | "full house"
  | "chance"
  | "large straight"
  | "small straight"
  | "four of a kind"
  | "three of a kind"
  | "two pairs"
  | "pair"
  | "ones"
  | "twos"
  | "threes"
  | "fours"
  | "fives";

function isYahtzee(roll: Roll): boolean {
  return roll.every((die) => die === roll[0]);
}

function sumRoll(roll: Roll): number {
  return roll.reduce((acc, die) => acc + die, 0);
}

function areEquals(roll: Roll, result: Roll): boolean {
  return roll.every((die) => result.includes(die));
}

function getMap(roll: Roll): Map<number, number> {
  const map = new Map<number, number>();
  for (const die of roll) {
    map.set(die, (map.get(die) || 0) + 1);
  }
  return map;
}

function getRepeatedScore(roll: Roll, count: number): number {
  const map = getMap(roll);
  for (const [die, dieCount] of map) {
    if (dieCount === count) {
      return die * count;
    }
  }

  return 0;
}

function getSumOfDieNumber(roll: Roll, number: number): number {
  return roll.filter((die) => die === number).reduce(
    (acc, die) => acc + die,
    0,
  );
}

function getPairs(roll: Roll): [number, number][] {
  const map = getMap(roll);
  return [...map.entries()].filter((e) => e[1] === 2);
}

export function calculateScore(roll: Roll, category: Category): number {
  switch (category) {
    case "yahtzee":
      return isYahtzee(roll) ? 50 : 0;

    case "chance":
      return sumRoll(roll);

    case "full house": {
      const map = getMap(roll);
      return map.size !== 2 ? 0 : sumRoll(roll);
    }

    case "large straight": {
      const result: Roll = [2, 3, 4, 5, 6];
      const map = getMap(roll);
      return map.size === 5 && areEquals(roll, result) ? 20 : 0;
    }

    case "small straight": {
      const result: Roll = [1, 2, 3, 4, 5];
      const map = getMap(roll);
      return map.size === 5 && areEquals(roll, result) ? 15 : 0;
    }

    case "four of a kind":
      return getRepeatedScore(roll, 4);

    case "three of a kind":
      return getRepeatedScore(roll, 3);

    case "two pairs": {
      const pairs = getPairs(roll);
      if (pairs.length === 2) {
        return pairs.reduce((acc, die) => acc + die[0] * die[1], 0);
      }

      return 0;
    }

    case "pair": {
      const pairs = getPairs(roll);
      if (pairs.length) {
        pairs.sort((a, b) => b[0] - a[0]);
        return pairs[0][0] * pairs[0][1];
      }

      return 0;
    }

    case "ones":
      return getSumOfDieNumber(roll, 1);

    case "twos":
      return getSumOfDieNumber(roll, 2);

    case "threes":
      return getSumOfDieNumber(roll, 3);

    case "fours":
      return getSumOfDieNumber(roll, 4);

    case "fives":
      return getSumOfDieNumber(roll, 5);

    default:
      return 0;
  }
}
