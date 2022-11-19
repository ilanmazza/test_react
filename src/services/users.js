import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/users'

export default function GetAllUsers () {
  return axios.get(baseUrl).then(response => response.data)
}