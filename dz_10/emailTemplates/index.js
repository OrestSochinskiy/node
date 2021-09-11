const emailActionsEnum = require('../config/email-actions');

module.exports = {
  [emailActionsEnum.WELCOME]: {
    templateName: 'welcome',
    subject: 'WELCOME !!!'
  },
  [emailActionsEnum.FORGOT_PASSWORD]: {
    templateName: 'forgot_password',
    subject: 'Dont worry, be happy'
  }
};
