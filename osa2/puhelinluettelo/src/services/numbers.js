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

export function deleteNumber(url, id, cb) {
  axios
    .delete(`${url}/${id}`)
    .then(cb)
}

export function updateNumber(url, id, data, cb) {
  axios
    .put(`${url}/${id}`, data)
    .then(res => res.data)
    .then(cb)
}