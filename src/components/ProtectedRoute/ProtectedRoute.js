import { Navigate } from "react-router-dom"
import { useAuth } from "../../context/AuthContext"
import Spinner from "../Spinner/Spinner"

export const  ProtectedRoute  = ({children}) =>{

    const { user, loading } = useAuth()

    if(loading) return <Spinner/>

    if(user) return <Navigate to="/"/>

    return children

}