const chai = require('chai')
// const sinon = require('sinon')
// const request = require('request')
const nock = require('nock')
const { expect } = chai

const Client = require('../lib/client')


describe('The ongair client', () => {

  describe('Sending a message', () => {

    it('Can send a text message', (done) => {

      let client = new Client('token', 'https://staging.ongair.im')
      nock('https://staging.ongair.im')
        .post('/send', "token=token&external_id=12345&thread=true&text=Hi&reply_options=Yes%2CNo&tags=")
        .reply(200, JSON.stringify({ success: true }))


      client.sendMessage('12345', 'Hi', "Yes,No")
        .then(success => {
          expect(success).to.be.true
          done()
        })
        .catch(ex => {
          done()
        })

    })
  })

  describe('Sending a thread', () => {

    it('Can send a chain with options', (done) => {
      let client = new Client('token', 'https://staging.ongair.im')

      nock('https://staging.ongair.im')
      .post('/send_chain', {"external_id":"12345","thread":true,"tags":"","messages":[{"text":"Hi","options":["Yes","No"]}]})
      .reply(200, JSON.stringify({ success: true }))

      client.sendThread('12345', [{text: 'Hi', options: ['Yes', 'No']}])
        .then(success => {
          expect(success).to.be.true
          done()
        })
    })

  })

  describe('Can send prompts', () => {
    it('Can send a tel prompt', (done) => {

      let client = new Client('token')
      nock('https://ongair.im:443')
        .post('/api/v1/base/send_telephone_prompt', "token=token&external_id=12345&thread=true&text=What%20is%20your%20number%3F")
        .reply(200, JSON.stringify({ id: '12345' }))

      client.sendTelephonePrompt('12345', "What is your number?")
        .then(id => {
          expect(id).to.be.equal('12345')
          done()
        })
        .catch(ex => {
          console.log('Error', ex)
        })
    })
  })

})
