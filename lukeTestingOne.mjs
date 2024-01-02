export const handler = async (event) => {
  console.log("About to print out now");
  console.log(event);
  console.log("Printed out");
  const response = {
    statusCode: 200,
    body: JSON.stringify({ event }),
  };
  // this is a test right now now
  return response;
};
//|:)