exports.lambdaHandler = async (event) => {
    // TODO implement the function to verify if logged in
    const response = {
      statusCode: 200,
      body: JSON.stringify('Hello from send is logged in!'),
    };
    return response;
  };
  