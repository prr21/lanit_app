export const getFromLocalStorage = (key) => {
  try {
    return JSON.parse(window.localStorage.getItem(key))
  } catch (e) {
    console.error("Error in getting data from localStorage", e)
    return null
  }
}

export const setToLocalStorage = (key, data) => {
  try {
    window.localStorage.setItem(key, JSON.stringify(data))
  } catch (e) {
    console.error("Error in setting data to localStorage", e)
  }
}

export function getRandomNum(min, max) {
  return Math.floor(Math.random() * (max - min) + min)
}
