import { ParseError, ValidationError } from "../exceptions";

const validateRequest = function (input: string, schema: Record<string, Function>) {    
    // Function to parse the POST/PUT request body and validate it using a given schema.
    try {
        var parsed_input = JSON.parse(input)
    }
    catch (error) {
        // Catch expected errors from internal API
        if (error instanceof SyntaxError) {
            throw new ParseError("Invalid JSON input: "+error.message)
        }
        else {
            throw error
        }
    }
    
    for (const spec_field in schema) {
      if (typeof parsed_input[spec_field as keyof typeof parsed_input] == "undefined") {
          throw new ValidationError(spec_field, "Missing field.")
      }
    }
    for(const field in parsed_input) {
      let validator = schema[field as keyof typeof schema]
      if (typeof validator == "undefined") {
          throw new ValidationError(field, "Unknown field.")
      }
      else if (!validator(parsed_input[field as keyof typeof parsed_input])) {
          throw new ValidationError(field, "Invalid input.")
      }
    }
    return parsed_input
  }

// General type validators for request data:
const stringValidator = function(input: any) {
    return input.length > 3 && input.length < 100
}
const hexColorValidator = function (hex: string) {
    return typeof hex === 'string'
        && hex.length === 6
        && !isNaN(Number('0x' + hex))
}

export {validateRequest, stringValidator, hexColorValidator}