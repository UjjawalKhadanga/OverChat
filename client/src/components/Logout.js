import axios from 'axios'
import React from 'react'

function Logout() {
    const handleClick= async ()=>{
        const res = await axios.post('http://localhost:8080/user/logout',{},{withCredentials:true});
        if(res.data.success){
            alert('Successfuly logged out')
            window.location.reload();
        }else{
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