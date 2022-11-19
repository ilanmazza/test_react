const baseUrl = 'http://localhost:3001/api/users'

export default function createUserService (data) {
  return fetch(baseUrl, {
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