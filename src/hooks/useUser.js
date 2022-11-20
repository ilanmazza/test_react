import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext";
import loginService from '../services/Login';
import createUserService from '../services/Users'

export default function useUser () {
    const {session, setSession} = useContext(Context)
    const [state, setState] = useState({loading: false, error: false})

    const login = useCallback((credentials) => {
        setState({loading: true, error: false})
        loginService(credentials)
            .then(response => {
                setState({loading: false, error: false})
                window.sessionStorage.setItem('session', JSON.stringify(response))
                setSession(response)
                console.log(response)
            })
            .catch(err => {
                setState({loading: false, error: true})
                window.sessionStorage.removeItem('session')
                setSession(null)
                console.error(err)
            })
    }, [setSession])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('session')
        setSession(null)
    }, [setSession])

    return {
        isLogged : Boolean(session),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        session: session,
        login,
        logout
    }
}


export function useCreateUser () {
    const [createState, setCreateState] = useState({loading: false, error: false, done: false})

    const createUser = useCallback((userdata) => {
        setCreateState({loading: true, error: false})
        createUserService(userdata)
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
        hasCreateError: createState.error,
        hasCreated: createState.done,
        createUser
    }
}
