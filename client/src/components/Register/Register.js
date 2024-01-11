import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const submit = async () => {
      if (confirmPassword !== password) return alert('Passwords do not match');
      const res = await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/user/register`, {
          name: userName,
          password: password
      })
      if(res.status === 200) setTimeout(() => navigate('/'), 1000);
    }
  return (
    <div className="container">
      <div class="register-box">
        <form>
          <div className="user-box">
            <input type="text" name required onChange={(e)=>setUserName(e.target.value)}/>
            <label>Username</label>
          </div>
          <div className="user-box">
            <input type="password" name required onChange={(e)=>setPassword(e.target.value)}/>
            <label>Password</label>
          </div>
          <div className="user-box">
            <input type="password" name required onChange={(e)=>setConfirmPassword(e.target.value)}/>
            <label>Confirm Password</label>
          </div>
          <center>
            <button className="register-button" onClick={(e)=>{e.preventDefault();submit()}} >
              Register
              <span />
            </button>
          </center>
        </form>
          <div className='link' onClick={()=>{navigate('/')}}>
            <button>
              Go to Login
            </button>
          </div>
      </div>
    </div>
  )
}

export default Register