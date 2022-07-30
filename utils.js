const getRandomElement = arr => {
  if (!Array.isArray(arr)) throw new Error('Expected an array');
  return arr[Math.floor(Math.random() * arr.length)];
}

const getElementById = (id, elementList) => {
  return elementList.find((element) => {
    return element.id === Number(id);
  });
};

const getIndexById = (id, arr) => {
  return arr.findIndex((quote) => {
    // return the index if the there is a match 
    return quote.id === Number(id);
  });
};

module.exports = {
  getRandomElement,
  getElementById,
  getIndexById,
};
