import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/login'

export default function Login (credentials) {
  return axios.post(baseUrl, credentials)
}