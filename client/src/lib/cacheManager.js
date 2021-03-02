export const getKeyFromCache = (key) => {
  let data = null;
  const cachedData = localStorage.getItem(key);
  if (cachedData) {
    data = JSON.parse(cachedData);
  }
  return data;
};

export const setDataIntoCache = (key, value) => {
  localStorage.setItem(key, JSON.stringify(value));
};

export const cacheHasKey = (key) => localStorage.getItem(key) != null;
