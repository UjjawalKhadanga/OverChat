import React,{useState} from 'react'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const navigate = useNavigate();
    const [userName,setUserName]=useState('');
    const [password,setPassword]=useState('');
    const submit = async ()=>{
      const res=await axios.post('http://localhost:8080/user/login',
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
        <section
          className="w-100 gradient-form"
          style={{ backgroundColor: "#eee" }}
        >
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-xl-10">
                <div className="card rounded-3 text-black">
                  <div className="row g-0">
                    <div className="col-lg-6">
                      <div className="card-body p-md-5 mx-md-4">
                        <div className="text-center">
                          <div className="d-flex align-items-center justify-content-center pb-4">
                            <p className="mb-0 me-2">Don't have an account?</p>
                            <button
                              type="button"
                              className="btn btn-outline-danger"
                              onClick={()=>{navigate('/register')}}
                            >
                              Create new
                            </button>
                          </div>
                        </div>
                        <form>
                          {/* <p>Please login to your account</p> */}
                          <div className="form-floating mb-4">
                            <input
                              type="email"
                              id="form2Example11"
                              className="form-control"
                              placeholder="Username"
                              onChange={(e)=>setUserName(e.target.value)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example11"
                            >
                              Username
                            </label>
                          </div>
                          <div className="form-floating mb-4">
                            <input
                              type="password"
                              id="form2Example22"
                              className="form-control"
                              placeholder="Password"
                              onChange={(e)=>setPassword(e.target.value)}
                            />
                            <label
                              className="form-label"
                              htmlFor="form2Example22"
                            >
                              Password
                            </label>
                          </div>
                          <div className="text-center pt-1 mb-5 pb-1">
                            <button
                              className="btn btn-primary btn-block btn-lg gradient-custom-2 mb-3 w-100"
                              type="button"
                              onClick={(e)=>{e.preventDefault();submit()}}
                            >
                              Log in
                            </button>
                            <a className="text-muted" href="#!">
                              Forgot password?
                            </a>
                          </div>
                        </form>
                      </div>
                    </div>
                    <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                      <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                        <h4 className="mb-4 h2">OverChat</h4>
                        <div className="mb-4 fst-italic">
                          Connect Beyond Words with <span className="fw-bold">OverChat</span>, Where Conversations Take Flight!
                        </div>
                        <p className="small mb-0">
                          OverChat is more than just a chatroom application; it's your gateway to meaningful connections and vibrant conversations. With OverChat, you can transcend ordinary messaging and take your interactions to new heights. Join our community and experience a world where words come alive, friendships flourish, and ideas soar. Elevate your conversations with OverChat – where connections truly take flight.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
}

export default Login
