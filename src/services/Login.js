import configData from "../config.json";

const baseUrl = configData.API_URL+'/api/login'

export default function loginService ({email,password}) {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({email,password})
  }).then(res => {
    if (!res.ok) throw new Error ('Login endpoint response is NOT ok')
    return res.json()
  }).then(res => {
    return res
  })
}