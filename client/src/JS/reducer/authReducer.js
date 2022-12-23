import {GET_AUTH_USER, LOGIN_USER,LOGOUT_USER,REGISTER_USER, USER_LOADING} from "../constant/actions-types";

const initialState = {
    token:localStorage.getItem('token'),
    user:null,
    isAuth:false,
    isLoading:true
}

const authReducer = (state = initialState , {type , payload})=>{
    switch (type) {
        case USER_LOADING:
            return {
                ...state,
                isLoading:true
            }
        case LOGOUT_USER:
            localStorage.removeItem('token')
            return {
                ...state,
                token:null,
                isAuth:false,
                user:null,
                isLoading:false
            }
        case REGISTER_USER:
        case LOGIN_USER:
            localStorage.setItem("token",payload.token)
            return{
                ...state,
                isLoading:false,
                isAuth:true,
                ...payload
            }
        case GET_AUTH_USER:
           
            return{...state,
                    isLoading:false,
                    isAuth:true,
                    ...payload}
        default:
            return state;
    }
}

export default authReducer;