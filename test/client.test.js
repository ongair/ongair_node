const chai = require('chai')
const sinon = require('sinon')
const request = require('request')
const { expect } = chai

const Client = require('../lib/client')


describe('The ongair client', () => {

  describe('Sending a message', () => {
    before(() => {
      sinon
        .stub(request, 'post')
        .yields(null, { statusCode: 200 }, { success: true });
    })

    it('Can send a text message', (done) => {

      let client = new Client('token', 'https://staging.ongair.im')

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
      client.sendThread('12345', [{text: 'Hi', options: ['Yes', 'No']}])
        .then(success => {
          expect(success).to.be.true
          done()
        })
    })

  })

})
