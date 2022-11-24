import {useCallback, useState} from "react";
import {RateContract, CommentContract, CreateContract} from '../services/Contracts';


export function useRateContract () {
    const [ratingState, setRatingState] = useState({loading: false, error: false, done: false})

    const rateContract = useCallback((courseid,rating,token) => {
        setRatingState({loading: true, error: false})
        RateContract(courseid,rating,token)
            .then(response => {
                setRatingState({loading: false, error: false, done: true})
                console.log(response)
            })
            .catch(err => {
                setRatingState({loading: false, error: true, done: true})
                console.error(err)
            })
    }, [])

    return {
        isRatingLoading: ratingState.loading,
        hasRatedError: ratingState.error,
        hasRated: ratingState.done,
        rateContract
    }
}

export function useCommentContract () {
    const [commentState, setCommentState] = useState({loading: false, error: false, done: false})

    const commentContract = useCallback((courseid,rating,token) => {
        setCommentState({loading: true, error: false})
        CommentContract(courseid,rating,token)
            .then(response => {
                setCommentState({loading: false, error: false, done: true})
                console.log(response)
            })
            .catch(err => {
                setCommentState({loading: false, error: true, done: true})
                console.error(err)
            })
    }, [])

    return {
        isCommentLoading: commentState.loading,
        hasCommentedError: commentState.error,
        hasCommented: commentState.done,
        commentContract
    }
}

export function useCreateContract () {
    const [createState, setCreateState] = useState({loading: false, error: false, done: false})

    const createContract = useCallback((data,token) => {
        setCreateState({loading: true, error: false})
        CreateContract(data,token)
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
        createContract
    }
}