import configData from "../config.json";

const basicEndpoint = configData.API_URL+'/api/users'
const editEndpoint = configData.API_URL+'/api/users/editUser'
const passwordResetEndpoint = configData.API_URL+'/api/users/resetPassword'


export function createUserService (data) {
  return fetch(basicEndpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) {
      throw new Error ('Create users endpoint response is NOT ok')
    }
  }).then(res => { return res }
  )
}

export function GetUserInfo (token) {
  return fetch(basicEndpoint, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ token
    }
  }).then(res => {
    if (!res.ok) throw new Error (`${basicEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function ChangeUserInfo (data,token) {
  return fetch(editEndpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+ token
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error (`${editEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function PasswordReset (data) {
  return fetch(passwordResetEndpoint, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error (`${passwordResetEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}