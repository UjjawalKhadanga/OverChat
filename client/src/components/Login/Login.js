import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css'

const Login = () => {
    const navigate = useNavigate();
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const submit = async ()=>{
      const res=await axios.post(`${process.env.REACT_APP_API_SERVER_URL}/user/login`,
        {
          name:userName,
          password:password
        }, { withCredentials: true }
      );
      console.log(res);
      if(res.data.msg==="success"){
        console.log(res);
        navigate('../home');
      }
    }
    return (
      <div className="container">
          <div class="login-box">
              <form>
                <div className="user-box">
                  <input type="text" name required onChange={(e)=>setUserName(e.target.value)}/>
                  <label>Username</label>
                </div>
                <div className="user-box">
                  <input type="password" name required onChange={(e)=>setPassword(e.target.value)}/>
                  <label>Password</label>
                </div>
                <center>
                  <button className="login-button" onClick={(e)=>{e.preventDefault();submit()}} >
                    Login
                    <span />
                  </button>
                </center>
              </form>
              <div className='link' onClick={()=>{navigate('/register')}}>
                <button>
                  Register, if not?
                </button>
              </div>
          </div>
      </div>
    );
}

export default Login


