module.exports = {
  userNormalizator: (userToNormalize) => {
    const fileldsToRemove = ['password'];

    fileldsToRemove.forEach((field) => {
      delete userToNormalize[field];
    });
    return userToNormalize;
  }
};
