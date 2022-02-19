// Common exceptions for the project

class BilisError extends Error {
    // BASE ERROR
    constructor(msg: string) {
        super(msg);
        // Set the prototype explicitly.
        Object.setPrototypeOf(this, BilisError.prototype);
    }
}


// Internal API Errors

class ObjectNotFoundError extends BilisError {
    declare field: string

    constructor(msg: string = "Object was not found.") {
        super(msg);
        Object.setPrototypeOf(this, ObjectNotFoundError.prototype);
    }

}



// Outward facing API Errors


class ValidationError extends BilisError {
    // Validation Error always relates to a user input.
    // This can be a URL ID or a request payload field, for example.
    // Thus, the error is raised with the field that the user error originates from.
    declare field: string

    constructor(field: string, msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ValidationError.prototype);
        
        this.field = field
    }

    to_json() {
        return { field: this.field, message: this.message };
    }
}

class MethodNotAllowedError extends BilisError {
    declare method: string
    declare allowed_methods: string[]

    constructor(
        method: string, 
        allowed_methods: string[], 
        msg: string = `Method ${method} not allowed.`) {
        super(msg);
        Object.setPrototypeOf(this, MethodNotAllowedError.prototype);
        
        this.allowed_methods = allowed_methods
    }

    to_json() {
        return { allowed_methods: this.allowed_methods, message: this.message };
    }
}

class ParseError extends BilisError {

    constructor(msg: string) {
        super(msg);
        Object.setPrototypeOf(this, ValidationError.prototype);
        
    }

    to_json() {
        return { message: this.message };
    }
}

export {ObjectNotFoundError, ValidationError, MethodNotAllowedError, ParseError}