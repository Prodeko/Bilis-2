import { ParseError, ValidationError } from "../exceptions";

const validateRequest = (input: string, schema: Record<string, Function>) => {
  // Function to parse the POST/PUT request body and validate it using a given schema.
  try {
    var parsedInput = JSON.parse(input);
  } catch (error) {
    // Catch expected errors from internal API
    if (error instanceof SyntaxError) {
      throw new ParseError("Invalid JSON input: " + error.message);
    } else {
      throw error;
    }
  }

  for (const specField in schema) {
    if (
      typeof parsedInput[specField as keyof typeof parsedInput] == "undefined"
    ) {
      throw new ValidationError(specField, "Missing field.");
    }
  }
  for (const field in parsedInput) {
    let validator = schema[field as keyof typeof schema];
    if (typeof validator == "undefined") {
      throw new ValidationError(field, "Unknown field.");
    } else if (!validator(parsedInput[field as keyof typeof parsedInput])) {
      throw new ValidationError(field, "Invalid input.");
    }
  }
  return parsedInput;
};

// General type validators for request data:
const stringValidator = (input: any) => input.length > 3 && input.length < 100;

const hexColorValidator = (hex: string) =>
  typeof hex === "string" && hex.length === 6 && !isNaN(Number("0x" + hex));

const validateMutualPlayersQuery = (query: any): [number, number] => {
    if (!('players' in query)) {
      throw new ValidationError('players', 'Player IDs missing');
    }
    const { players } = query;
    if ( !Array.isArray(players) ) {
      throw new ValidationError('players', 'Malformed player ID list, expected an array of integers.');
    }
    if ( players.length !== 2) {
      throw new ValidationError('players', `Expected two IDs, received ${players.length}`);
    }
    const ids = players.map(id => parseInt(id, 10));
    ids.forEach((p) => {
      if ( isNaN(p) ) {
        throw new ValidationError('players', 'Malformed player ID list, IDs are not numbers.');
      }
    })
    return ids as [number, number];
}

const validatePageQuery = (query: any): { page?: number, pageSize?: number } => {
  const { page, pageSize } = query;
  if ('page' in query && isNaN(parseInt(page))) {
    throw new ValidationError('players', 'Malformed page parameter');
  }
  if ('pageSize' in query && isNaN(parseInt(pageSize))) {
    throw new ValidationError('players', 'Malformed pageSize parameter');
  }
  return {page, pageSize};
}

export {validateRequest, stringValidator, hexColorValidator, validateMutualPlayersQuery, validatePageQuery}
