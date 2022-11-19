import { useCallback, useContext, useState } from "react";
import Context from "../context/UserContext";
import loginService from '../services/Login';



export default function useUser () {
    const {jwt, setJWT} = useContext(Context)
    const [state, setState] = useState({loading: false, error: false})

    const login = useCallback((credentials) => {
        setState({loading: true, error: false})
        loginService(credentials)
            .then(jwt => {
                setState({loading: false, error: false})
                window.sessionStorage.setItem('jwt', jwt)
                setJWT(jwt)
                console.log(jwt)
            })
            .catch(err => {
                setState({loading: false, error: true})
                window.sessionStorage.removeItem('jwt')
                setJWT(null)
                console.error(err)
            })
    }, [setJWT])

    const logout = useCallback(() => {
        window.sessionStorage.removeItem('jwt')
        setJWT(null)
    }, [setJWT])

    return {
        isLogged : Boolean(jwt),
        isLoginLoading: state.loading,
        hasLoginError: state.error,
        login,
        logout
    }
}
