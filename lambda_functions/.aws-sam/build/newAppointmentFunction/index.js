const argon2 = require("argon2");

exports.lambdaHandler = async (event) => {

    // TODO implement
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from new appointment!'),
    };
    return response;
  };
  