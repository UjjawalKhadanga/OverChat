import React,{useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function Register() {
    const navigate = useNavigate()
    const [userName, setUserName] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const submit = async () => {
      if (confirmPassword !== password) return alert('Passwords do not match');
      const res = await axios.post('http://localhost:8080/user/register', {
          name: userName,
          password: password
      })
      if(res.status === 200) setTimeout(() => navigate('/'), 1000);
    }
  return (
    <div className="container">
    <section
      className="h-100 gradient-form"
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
                      <h4 className="mt-1 mb-5 pb-1">
                        Welcome to OverChat
                      </h4>
                    </div>
                    <form>
                      <p>Please Register an Account</p>
                      <div className="form-floating mb-4">
                        <input
                          type="email"
                          id="name"
                          className="form-control"
                          placeholder="Username"
                          onChange={(e) => setUserName(e.target.value)}
                        />
                        <label
                          className="form-label"
                          htmlFor="name"
                        >
                          Username
                        </label>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          id="pass"
                          className="form-control"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        <label
                          className="form-label"
                          htmlFor="pass"
                        >
                          Password
                        </label>
                      </div>
                      <div className="form-floating mb-4">
                        <input
                          type="password"
                          id="cpass"
                          className="form-control"
                          placeholder="password"
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        <label
                          className="form-label"
                          htmlFor="cpass"
                        >
                          Confirm Password
                        </label>
                      </div>
                      <div className="text-center pt-1 mb-5 pb-1">
                        <button
                          className="btn btn-primary btn-block btn-lg gradient-custom-2 mb-3 w-100"
                          type="button"
                          onClick={(e)=>{e.preventDefault();submit()}}
                        >
                          Register
                        </button>
                      </div>
                      <div className="d-flex align-items-center justify-content-center pb-4">
                        <p className="mb-0 me-2">Have an account, already?</p>
                        <button
                          type="button"
                          className="btn btn-outline-danger"
                          onClick={() => navigate('/')}
                        >
                          Log In
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="col-lg-6 d-flex align-items-center gradient-custom-2">
                  <div className="text-white px-3 py-4 p-md-5 mx-md-4">
                    <h4 className="mb-4">A Chat Room App </h4>
                    <p className="small mb-0">
                      Join and Connect with your peers with{" "}
                      <span className="fw-bold">OverChat</span>. Custom Chat
                      rooms with your friends.
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
  )
}

export default Register