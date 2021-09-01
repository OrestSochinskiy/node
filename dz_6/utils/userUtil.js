module.exports = {
  userNormalizator: (userToNormalize) => {
    const fileldsToRemove = ['password'];

    userToNormalize = userToNormalize.toObject();

    fileldsToRemove.forEach((field) => {
      delete userToNormalize[field];
    });

    return userToNormalize;
  }
};
