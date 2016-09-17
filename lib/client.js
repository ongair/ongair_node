var request = require('request');
function Client(authToken) {
  this.authToken = authToken;
  this.baseUrl = "https://ongair.im/api/v1/base";
}

Client.prototype.sendMessage = function(to, message, options) {
  var self = this;
  return new Promise(function(resolve, reject) {
    var options = {
      url: self.baseUrl + '/send',
      headers: {
        'Content-Type': 'application/json'
      },
      form: {
        token: self.authToken,
        external_id: to,
        text: message,
        reply_options: options,
        thread: true
      }
    }
    request.post(options, function(error, response, body) {
      if (!error) {
        code = response.statusCode;
        if (code == 200)
        {
          id = JSON.parse(body)['id'];
          resolve(id);
        }
        else if (code == 422) {
          error = JSON.parse(body)['error'];
          reject(new Error(error));
        }
      }
    });
  });
}

// module.exports = Client;
exports.Client = Client;
