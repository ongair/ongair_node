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
  var client = new Ongair(token)
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
