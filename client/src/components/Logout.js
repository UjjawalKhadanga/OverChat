import axios from 'axios'
import React from 'react'
import { useNavigate } from 'react-router-dom'

function Logout() {
    const navigate = useNavigate();
    const handleClick= async ()=>{
        const res = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/user/logout`,{},{withCredentials:true});
        if(res.data && res.data.success){
            alert('Successfuly logged out')
            navigate('/')
        } else{
            alert('User not logged in')
        }

    }
  return (
    <button className='btn btn-danger' onClick={(e)=>{e.preventDefault();handleClick()}}>
        Logout
    </button>
  )
}

export default Logout