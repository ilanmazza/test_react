import configData from "../config.json";

const basicEndpoint = configData.API_URL+'/api/contracts'
const ratingEndpoint = configData.API_URL+'/api/contracts/applyRating'
const commentEndpoint = configData.API_URL+'/api/contracts/comment'
const moderateCommentEndpoint = configData.API_URL+'/api/contracts/moderateComment'



export function GetContracts (token,courseid) {
  return fetch(basicEndpoint+'/'+courseid, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    }
  }).then(res => {
    if (!res.ok) throw new Error (`${basicEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function RateContract (contractid,rating,token) {
  return fetch(ratingEndpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    },
    body: JSON.stringify({
      "contractid": contractid,
      "rating": rating
    })
  }).then(res => {
    if (!res.ok) throw new Error (`${ratingEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function CommentContract (contractid,comment,token) {
  return fetch(commentEndpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    },
    body: JSON.stringify({
      "contractid": contractid,
      "comment": comment
    })
  }).then(res => {
    if (!res.ok) throw new Error (`${commentEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function ModerateComment (contractid,state,token) {
  return fetch(moderateCommentEndpoint, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    },
    body: JSON.stringify({
      "contractid": contractid,
      "state": state
    })
  }).then(res => {
    if (!res.ok) throw new Error (`${moderateCommentEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function CreateContract (data,token) {
  return fetch(basicEndpoint, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    },
    body: JSON.stringify(data)
  }).then(res => {
    if (!res.ok) throw new Error (`${basicEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function ChangeContractState (contractid,state,token) {
  return fetch(basicEndpoint, {
    method: 'PUT',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    },
    body: JSON.stringify({
      "contractid": contractid,
      "state": state
    })
  }).then(res => {
    if (!res.ok) throw new Error (`${basicEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}