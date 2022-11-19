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
    if (!res.ok) console.log('Error en login')
    return res.json()
  }).then(res => {
    const { token } = res
    console.log('Login correcto')
    console.log(token)
    return token
  })
}