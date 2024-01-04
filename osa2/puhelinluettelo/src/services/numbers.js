import axios from "axios"

export function getNumbers(url, cb) {
  axios
    .get(url)
    .then(res => res.data)
    .then(cb)
}

export function createNumber(url, data, cb) {
  axios
    .post(url, data)
    .then(res => res.data)
    .then(cb)
}