const filterEndpoint = 'http://localhost:3001/api/courses/filter'
const fromTeacherEndpoint = 'http://localhost:3001/api/courses/fromTeacher'
const basicEndpoint = 'http://localhost:3001/api/courses'


export function GetTopCourses () {
  return fetch(filterEndpoint+'?'+ new URLSearchParams({
    orderBy: 'rating: -1',
    limit: 5})).then(res => {
    if (!res.ok) throw new Error (`${filterEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function GetFilterCourses (inName,inType) {
  return fetch(filterEndpoint+'?'+ new URLSearchParams({
    orderBy: 'rating: -1',
    name: inName,
    type: inType,
    limit: 5})).then(res => {
    if (!res.ok) throw new Error (`${filterEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function EditCourse (data,token) {
  return fetch(basicEndpoint+'/'+data.id, {
    method: 'PUT',
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

export function GetTeacherCourses (token) {
  return fetch(fromTeacherEndpoint, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json",
      "Authorization": "Bearer "+token
    }
  }).then(res => {
    if (!res.ok) throw new Error (`${fromTeacherEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}

export function GetCoursesById (id) {
  return fetch(basicEndpoint+'/'+id, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) throw new Error (`${basicEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}