import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Login = () => {

  const [credentials, setCredentials] = useState({email: "", password: ""});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
      e.preventDefault();
      const response = await fetch("https://foodhut.onrender.com/api/login", {
          method: "POST",
          headers: {
              "Content-Type": "application/json"
          },
          body: JSON.stringify({ email: credentials.email, password: credentials.password })
      });

      const json = await response.json();
      console.log(json);
      if (!json.success) {
          alert("Enter Valid Credentials");
      }
      if (json.success) {
          localStorage.setItem("userEmail", credentials.email);
          localStorage.setItem("authToken", json.authToken);
          navigate("/")
      }
  }

  const onChange = (event) => {
      setCredentials({ ...credentials, [event.target.name]: event.target.value });
  }

  return (
    <div>
        <div>
            <Navbar/>
        </div>
        <div className="container">
                <form onSubmit={handleSubmit} className='mt-5'>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="formin form-control bg-transparent text-dark" id="exampleInputEmail1" aria-describedby="emailHelp" style={{width:"34%"}} placeholder='Enter Your Email' name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" style={{width:"34%", padding:"0.5rem 0.75rem"}} className="formin form-control bg-transparent text-dark" id="exampleInputPassword1" name='password' placeholder='Enter Your Password' value={credentials.password} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn" style={{color:"white", backgroundColor:"black"}}>Login</button>
                    <Link to="/createuser" className='m-3 btn btn-danger'>New User ?</Link>
                </form>
            </div>
    </div>
  )
}

export default Login
