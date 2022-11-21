import {useCallback, useState} from "react";
import {EditCourse} from '../services/Courses';


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
