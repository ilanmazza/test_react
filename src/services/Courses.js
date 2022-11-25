import configData from "../config.json";

const filterEndpoint = configData.API_URL+'/api/courses/filter'
const fromTeacherEndpoint = configData.API_URL+'/api/courses/fromTeacher'
const basicEndpoint = configData.API_URL+'/api/courses'
const detailsEndpoint = configData.API_URL+'/api/courses/details'


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

export function CreateCourse (data,token) {
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

export function GetCourseDetailsById (id) {
  return fetch(detailsEndpoint+'/'+id, {
    method: 'GET',
    headers: {
      "Content-Type": "application/json"
    }
  }).then(res => {
    if (!res.ok) throw new Error (`${detailsEndpoint} endpoint response is NOT ok`)
    return res.json()
  }).then(res => {
    return res
  })
}