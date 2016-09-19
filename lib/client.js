var request = require('request');
function Client(authToken) {
  this.authToken = authToken;
}

Client.prototype.sendMessage = function(to, message, replyOptions) {
  var self = this;
  return new Promise(function(resolve, reject) {
    options = buildOptions('/send', self.authToken, to, { text: message, reply_options: replyOptions });
    send(options)
      .then(function(id) {
        resolve(id);
      })
      .catch(function(ex) {
        reject(ex);
      })
  });
}

Client.prototype.sendImage = function(to, imageUrl, contentType, caption, replyOptions) {
  var self = this;
  return new Promise(function(resolve, reject) {
    options = buildOptions('/send_image', self.authToken, to, { image: imageUrl, content_type: contentType, caption: caption, reply_options: replyOptions });
    console.log("Options", options);
    send(options)
      .then(function(id) {
        resolve(id);
      })
      .catch(function(ex) {
        reject(ex);
      })
  });
}

function send(options)  {
  return new Promise(function(resolve, reject) {
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

function buildOptions(url, token, to, payload) {
  var form = Object.assign({
      token: token,
      external_id: to,
      thread: true
    }, payload);

  var options = {
    url: "https://ongair.im/api/v1/base" + url,
    headers: {
      'Content-Type': 'application/json'
    },
    form: form
  }

  return options;
}

// module.exports = Client;
exports.Client = Client;
