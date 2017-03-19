const request = require('request')

class Client {
  constructor(token, url='https://ongair.im/api/v1/base') {
    this.token = token
    this.url = url
  }

  sendThread(to, messages) {
    return new Promise((resolve, reject) => {
      let options = {
        url: this.url + '/send_chain',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': "Token token=" + this.token
        },
        body: {
          external_id: to,
          thread: true,
          messages: messages
        },
        json: true
      }

      request.post(options, (error, response, body) => {
        if (!error) {
          let code = response.statusCode
          if (code == 200) {
            let success = body.success
            resolve(success)
          }
          else if (code == 422) {
            let error = body.error
            reject(new Error(error))
          }
        }
      })
    })
  }

  sendMessage(to, message, replyOptions) {
    return new Promise((resolve, reject) => {

      let options = buildFormOptions(this.url + '/send', this.token, to, { text: message, reply_options: replyOptions })
      send(options)
        .then((id) => {
          resolve(id)
        })
        .catch((ex) => {
          reject(ex)
        })
    })
  }

  sendImage(to, image, contentType, caption, replyOptions) {
    return new Promise((resolve, reject) => {
      let options = buildFormOptions(this.url + '/send_image', this.token, to, { image: image, content_type: contentType, caption: caption, reply_options: replyOptions })
      send(options)
        .then((id) => {
          resolve(id)
        })
        .catch((ex) => {
          reject(ex)
        })
    })
  }
}

function buildFormOptions(url, token, to, payload) {

  const form = Object.assign({
      token: token,
      external_id: to,
      thread: true
    },
    payload
  )

  const options = {
    url: url,
    headers: {
      'Content-Type': 'application/json'
    },
    form: form
  }

  return options;
}

function send(options)  {
  return new Promise(function(resolve, reject) {
    request.post(options, function(error, response, body) {
      if (!error) {
        code = response.statusCode
        if (code == 200)
        {
          id = JSON.parse(body)['id']
          resolve(id)
        }
        else if (code == 422) {
          error = JSON.parse(body)['error']
          reject(new Error(error))
        }
      }
    });
  });
}

module.exports = Client
