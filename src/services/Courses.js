const baseUrl = 'http://localhost:3001/api/courses/filter'

export function GetTopCourses () {
  return fetch(baseUrl+'?'+ new URLSearchParams({
    orderBy: 'raiting: -1',
    limit: 5})).then(res => {
    if (!res.ok) throw new Error ('api/cousers/filter endpoint response is NOT ok')
    return res.json()
  }).then(res => {
    return res
  })
}

export function GetFilterCourses (inName,inType) {
  return fetch(baseUrl+'?'+ new URLSearchParams({
    orderBy: 'raiting: -1',
    name: inName,
    type: inType,
    limit: 5})).then(res => {
    if (!res.ok) throw new Error ('api/cousers/filter endpoint response is NOT ok')
    return res.json()
  }).then(res => {
    return res
  })
}