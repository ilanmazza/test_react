import {useCallback, useState} from "react";
import {EditCourse, CreateCourse, GetCourseDetailsById} from '../services/Courses';


export function useEditCourse () {
    const [editState, setEditState] = useState({loading: false, error: false, done: false})

    const editCourse = useCallback((data,token) => {
        setEditState({loading: true, error: false})
        EditCourse(data,token)
            .then(response => {
                setEditState({loading: false, error: false, done: true})
                console.log(response)
            })
            .catch(err => {
                setEditState({loading: false, error: true, done: true})
                console.error(err)
            })
    }, [])

    return {
        isEditLoading: editState.loading,
        hasEditError: editState.error,
        hasEdited: editState.done,
        editCourse
    }
}

export function useCreateCourse () {
    const [createState, setCreateState] = useState({loading: false, error: false, done: false})

    const createCourse = useCallback((data,token) => {
        setCreateState({loading: true, error: false})
        CreateCourse(data,token)
            .then(response => {
                setCreateState({loading: false, error: false, done: true})
                console.log(response)
            })
            .catch(err => {
                setCreateState({loading: false, error: true, done: true})
                console.error(err)
            })
    }, [])

    return {
        isCreateLoading: createState.loading,
        hasCreatedError: createState.error,
        hasCreated: createState.done,
        createCourse
    }
}

export function useCourseDetails () {
    const [detailsState, setDetailsState] = useState({loading: false, error: false, done: false})

    const getCourseDetails = useCallback((data,token) => {
        setDetailsState({loading: true, error: false})
        GetCourseDetailsById(data)
            .then(response => {
                setDetailsState({loading: false, error: false, done: true})
                console.log(response)
            })
            .catch(err => {
                setDetailsState({loading: false, error: true, done: true})
                console.error(err)
            })
    }, [])

    return {
        isDetailsLoading: detailsState.loading,
        hasDetailsError: detailsState.error,
        hasDetails: detailsState.done,
        getCourseDetails
    }
}

