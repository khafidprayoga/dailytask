module.exports = (req, res) => {
  const APIv1DOCS =
    'https://app.swaggerhub.com/apis/khafidprayoga/DailyTask/1.0.0';

  const response = {
    message: 'Hello World!, see the API docs to interact with this services',
    docs: APIv1DOCS,
  };

  return res.send(response);
};
