/* eslint-disable @typescript-eslint/no-explicit-any */
import type { NewPlayer } from "@common/types";

export const isNumber = (supposedNumber: unknown): supposedNumber is number => {
  return typeof supposedNumber === "number" && !isNaN(supposedNumber);
};

export const isString = (supposedString: unknown): supposedString is string => {
  return typeof supposedString === "string" || supposedString instanceof String;
};

export const isNewPlayer = (
  supposedNewPlayer: unknown,
): supposedNewPlayer is NewPlayer => {
  const NewPlayer = supposedNewPlayer as NewPlayer;

  return Boolean(
    NewPlayer.firstName &&
      NewPlayer.lastName &&
      NewPlayer.nickname &&
      NewPlayer.emoji &&
      NewPlayer.motto,
  );
};

/**
 * Generator function that creates a type guard for a type that checks that every key of the type exist and is of correct type in the input object.
 *
 * @param type - Type for the generated type guard
 * @returns Type guard function for the type
 */
export function createTypeGuard<T>(type: T): (obj: any) => obj is T {
  return function (obj: any): obj is T {
    for (const key in type) {
      const keyExists = key in obj;
      const typeIsMatching = typeof obj[key] !== typeof type[key];
      if (!(keyExists || typeIsMatching)) {
        return false;
      }
    }
    return true;
  };
}
