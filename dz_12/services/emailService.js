const nodemailer = require('nodemailer');
const path = require('path');

const EmailTemplates = require('email-templates');
const variables = require('../config/variables');
const allTemplates = require('../emailTemplates');
const ErrorHandler = require('../errors/ErrorHandler');
const { WRONG_TEMPLATE_NAME } = require('../config/message');
const { SERVER_ERROR } = require('../config/status');

const templateParser = new EmailTemplates({
  views: {
    root: path.join(process.cwd(), 'emailTemplates')
  }
});

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: variables.NO_REPLY_EMAIL,
    pass: variables.NO_REPLY_EMAIL_PASSWORD
  }
});

const sendMail = async (userMail, emailAction, context = {}) => {
  const templateInfo = allTemplates[emailAction];

  if (!templateInfo) {
    throw new ErrorHandler(SERVER_ERROR, WRONG_TEMPLATE_NAME);
  }

  const { templateName, subject } = templateInfo;
  context.frontendURL = variables.FROTEND_URL;

  const html = await templateParser.render(templateName, context);

  return transporter.sendMail({
    from: 'No reply',
    to: userMail,
    subject,
    html
  });
};

module.exports = {
  sendMail
};
