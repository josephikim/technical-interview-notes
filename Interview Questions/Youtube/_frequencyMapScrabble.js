const arr = [2, 5, 7, 8, 5, 3, 5, 7, 8, 5, 3, 4, 2, 4, 2, 1, 6, 8, 6];
const getFrequency = (array) => {
  const map = {};
  array.forEach((item) => {
    if (map[item]) {
      map[item]++;
    } else {
      map[item] = 1;
    }
  });
  return map;
};
console.log(getFrequency(arr));
