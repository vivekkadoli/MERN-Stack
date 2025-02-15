class HttpError extends Error {
  // Extend the Error class
  constructor(message, errorCode) {
    // Add a constructor
    super(message); // Add a "message" property
    this.code = errorCode; // Add a "code" property
  }
}

module.exports = HttpError; // Export the class
