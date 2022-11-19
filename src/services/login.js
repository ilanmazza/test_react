//import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

//export default function Login (credentials) {
//  return axios.post(baseUrl, credentials)
//}

export default function Login ({username,password}) {
  return fetch(baseUrl, {
    method: 'POST',
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({username,password})
  }).then(res => {
    if (!res.ok) throw new Error ('Login endpoint response is NOT ok')
    return res.json()
  }).then(res => {
    const { token } = res
    return token
  })
}