export const getData = (type = 'text') => {
  const typeDataMap = {
    text: "文字",
    number: 10,
  };
  return typeDataMap[type];
};
