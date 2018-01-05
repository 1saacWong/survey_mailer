const sendgrid = require('sendgrid');
const helper = sendgrid.mail;
const keys = require('../config/keys');

class creditMailer extends helper.Mail {
  constructor({ username }, content) {
    super();
    this.sgApi = sendgrid(keys.sendGridKey);
    this.from_email = new helper.Email('no-reply@emaily.com');
    this.subject = 'Credit Awarded';
    this.body = new helper.Content('text/html', content);
    this.recipient = new helper.Email(username);
    this.addContent(this.body);
    this.addRecipient();
  }

  addRecipient() {
    const personalize = new helper.Personalization();

    personalize.addTo(this.recipient);

    this.addPersonalization(personalize);
  }

  async send() {
    const request = this.sgApi.emptyRequest({
      method: 'POST',
      path: '/v3/mail/send',
      body: this.toJSON()
    });

    const response = await this.sgApi.API(request);
    return response;
  }
}

module.exports = creditMailer;
