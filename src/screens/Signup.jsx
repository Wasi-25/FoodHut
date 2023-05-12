import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';

const Signup = () => {

    const navigate = useNavigate();
    const [credentials, setCredentials] = useState({ name: "", email: "", password: "", geolocation: "" })

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch("https://foodhut.onrender.com/api/createuser", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ name: credentials.name, email: credentials.email, password: credentials.password, location: credentials.geolocation })
        });

        const json = await response.json();
        console.log(json);

        if (json.success) {
            localStorage.setItem("authToken", json.authToken);
            navigate("/");
        }

        if (!json.success) {
            alert("Enter Valid Credentials");
        }
    }

    const onChange = (event) => {
        setCredentials({ ...credentials, [event.target.name]: event.target.value });
    }

    return (
        <>
            <div>
                <Navbar />
            </div>
            <div className="container mt-5">
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input type="text" className="form-control bg-transparent text-dark" style={{width:"34%"}} name='name' value={credentials.name} placeholder='Enter Your Name' onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
                        <input type="email" className="form-control bg-transparent text-dark" style={{width:"34%"}} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder='Enter Your Email' name='email' value={credentials.email} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
                        <input type="password" className="form-control bg-transparent text-dark" style={{width:"34%"}} id="exampleInputPassword1" placeholder='Enter Your Password' name='password' value={credentials.password} onChange={onChange} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="exampleInputPassword1" className="form-label">Address</label>
                        <input type="text" className="form-control bg-transparent text-dark" style={{width:"34%"}} id="exampleInputPassword1" placeholder='Enter your Address' name='geolocation' value={credentials.geolocation} onChange={onChange} />
                    </div>
                    <button type="submit" className="btn" style={{color:"white", backgroundColor:"black"}}> Sign up</button>
                    <Link to="/login" className='m-3 btn btn-danger'>Already a User ?</Link>
                </form>
            </div>
        </>
    )
}

export default Signup;
