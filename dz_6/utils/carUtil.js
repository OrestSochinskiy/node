module.exports = {
  carNormalizator: (carToNormalize) => {
    const fileldsToRemove = [
      '__v',
      'createdAt',
      'updatedAt'
    ];

    carToNormalize = carToNormalize.toObject();

    fileldsToRemove.forEach((field) => {
      delete carToNormalize[field];
    });

    return carToNormalize;
  }
};
