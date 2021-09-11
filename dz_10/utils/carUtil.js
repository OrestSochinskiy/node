module.exports = {
  carNormalizator: (carToNormalize) => {
    const fileldsToRemove = [
      '__v',
      'createdAt',
      'updatedAt'
    ];

    // eslint-disable-next-line no-param-reassign
    carToNormalize = carToNormalize.toObject();

    fileldsToRemove.forEach((field) => {
      // eslint-disable-next-line no-param-reassign
      delete carToNormalize[field];
    });

    return carToNormalize;
  }
};
