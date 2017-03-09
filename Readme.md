## Ongair

[Ongair](https://ongair.im) is an Instant Message aggregator, letting businesses engage their customers through Instant Messaging platforms such as Facebook Messenger and Telegram through an uniform API.

### How to use it
- First you need to create an account at [Ongair](https://ongair.im)
- Enable api access by pointing to your endpoint url in the account settings
- Obtain an access token to use for your requests

#### Installing

```
  npm install ongair
```

#### Creating a client

```
  var Ongair = require('ongair');
  var token = process.env.TOKEN || 'my-token'
  var client = new Ongair.Client(token)
```

##### 1. Sending a simple text message

```
  to = 'contactId';
  message = 'Hello world'
  client.sendMessage(to, message);
    .then(function(id) {
      console.log("id: ", id);
    });
```

##### 2. Sending a text message with some quick reply options

```
  to = 'contactId';
  message = 'Hello world'
  client.sendMessage(to, message, "Yes,No");
    .then(function(id) {
      console.log("id: ", id);
    });
```

##### 3. Sending an image with a caption

```
  to = 'contactid';
  caption = 'What a wonderful world';
  url = 'http://example.com/demo.gif';
  contentType = 'image/gif';
  client.sendImage(to, url, contentType,caption);
    .then(function(id:) {
      console.log("Send image id:", id);
    });
```
