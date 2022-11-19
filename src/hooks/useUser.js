import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext";
import loginService from '../services/Login';



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
        login,
        logout
    }
}
