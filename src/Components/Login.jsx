import React, { useState } from 'react'
import './Login.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from "react-toastify";


export default function Login() {
    const [login, setLogin] = useState({})
    const [passwordType, setPasswordType] = useState("password");

    const history = useNavigate();
    const handleCkick = (e) => {
        e.preventDefault();
        axios.post('http://localhost:9000/login', login).then((res) => {
            if (res.data.error) {
                toast.error(res.data.error)
            }
            else {
                toast.success(res.data.msg)
                setTimeout(() => {
                    history('/sidebar/dashboard')
                }, 2000)
            }

        })
    }

    const togglePassword = () => {
        if (passwordType === "password") {
            setPasswordType("text")
            return;
        }
        setPasswordType("password")
    }
    return (
        <>
            <div>
                <ToastContainer autoClose={1000} position="top-center" />
            </div>
            <div className='container-fluid loginbackground'>
                <div className="row justify-content-center">
                    <div className="col-md-4 p-5 loginForm">
                        <div className="row">
                            <u className='text-white'><h5 className='text-center'>Login Here</h5></u>
                        </div>
                        <form>

                            <div className="mb-3 text-white">
                                <label htmlhtmlFor="exampleInputEmail1" className="form-label">Email address</label>
                                <input type="email" className="form-control inputLogin" id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} value={login.email} />

                            </div>
                            <div className="mb-3 text-white">
                                <label htmlhtmlFor="exampleInputPassword1" className="form-label">Password</label>
                                <input type={passwordType} className="form-control inputLogin" id="exampleInputPassword1 myInput" name='password' onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} value={login.password} />

                            </div>
                            <div className="mb-3 text-white">
                                <input type="checkbox" onClick={togglePassword} /> Show Password
                            </div>


                            <div className="row justify-content-center">
                                <button type="submit" onClick={handleCkick} className="btn btn-primary w-50" style={{ background: "rgb(7, 36, 62)" }}>Login</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
