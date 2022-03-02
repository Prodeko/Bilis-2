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

export { validateRequest, stringValidator, hexColorValidator };
