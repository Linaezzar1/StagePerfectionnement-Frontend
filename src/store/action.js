    export const login = (token) => {
        return {
            type: 'LOGIN',
            payload: token
        }
    }

    export const logout = () => {
        return {
            type: 'LOGOUT'
        }
    }

    export const setLoading = (isLoading) => {
        return {
            type: 'SET_LOADING',
            payload: isLoading
        }
    }

    export const setError = (error) => {
        return {
            type: 'SET_ERROR',
            payload: error
        }
    }