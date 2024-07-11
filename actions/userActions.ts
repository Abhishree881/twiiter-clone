import axios from "axios"

export const getUser = async(userId: string) =>{
    const res = await axios.get(`/api/users/${userId}`)
    return res.data ;
}

export const getUsers = () => {
    return (dispatch: any) =>{
        axios.get('/api/users').then((res)=>{
            dispatch({
                type: 'GET_USERS',
                payload: res.data
            })
        })
    }
}