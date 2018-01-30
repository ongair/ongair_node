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

})
