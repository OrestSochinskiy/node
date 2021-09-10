module.exports = {
  userNormalizator: (userToNormalize) => {
    const fileldsToRemove = ['password'];

    // eslint-disable-next-line no-param-reassign
    userToNormalize = userToNormalize.toObject();

    fileldsToRemove.forEach((field) => {
      // eslint-disable-next-line no-param-reassign
      delete userToNormalize[field];
    });

    return userToNormalize;
  }
};
