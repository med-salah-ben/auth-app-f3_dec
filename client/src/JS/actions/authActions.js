import axios from "axios";
import {toast} from "react-toastify"
import { LOGIN_USER , USER_LOADING , LOGOUT_USER , REGISTER_USER , GET_AUTH_USER } from "../constant/actions-types";


//loading user 
export const userLoading = ()=>(dispatch)=>{
    dispatch({type:USER_LOADING})
}

//register user 
export const registerUser = (formData) =>async(dispatch)=>{
    dispatch(userLoading())
    try {
        const res = await axios.post('/api/auth/register',formData)
        if(res){
            toast.info(res.data.msg,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        console.log("register res : ",res)
        dispatch({
            type:REGISTER_USER,
            payload:res.data //{msg , user , token}
        })
    } catch (error) {
        console.dir(error)
        const  {errors }  = error.response.data
        
        
        errors.forEach((err)=>toast.error(err.msg , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }))

    }
}

//login

export const loginUser = (formData) =>async(dispatch)=>{
    dispatch(userLoading())
    try {
        const res = await axios.post('/api/auth/login',formData)
        console.log("register res : ",res)
        if(res){
            toast.info(res.data.msg,{
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            })
        }
        dispatch({
            type:LOGIN_USER,
            payload:res.data //{msg , user , token}
        })
    } catch (error) {
        console.dir(error)
        const  {errors }  = error.response.data
        
        
        errors.forEach((err)=>toast.error(err.msg , {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        }))
    }
}

export const getAuthUser = ()=>async(dispatch)=>{
    dispatch(userLoading())
    try {
        //headers
        const config={
            headers : {
                'x-auth-token':localStorage.getItem("token")
            }
        }
        const res = await axios.get('/api/auth/user' , config)
        dispatch({
            type:GET_AUTH_USER,
            payload : res.data
        })
    } catch (error) {
            console.log(error)
    }
}

export const logoutUser = ()=>(dispatch)=>{
    dispatch({type:LOGOUT_USER})
}