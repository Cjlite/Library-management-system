import React, { useState } from 'react'
// import './Login.css'
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
            <div className=' '>
                <div className=" ">
                    <div className=" ">
                        <div className="">
                            <u className=''><h5 className=''>Login Here</h5></u>
                        </div>
                        <form>

                            <div className=" ">
                                <label htmlhtmlFor="exampleInputEmail1" className="">Email address</label>
                                <input type="email" className=" " id="exampleInputEmail1" aria-describedby="emailHelp" name="email" onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} value={login.email} />

                            </div>
                            <div className=" ">
                                <label htmlhtmlFor="exampleInputPassword1" className="">Password</label>
                                <input type={passwordType} className=" " id="exampleInputPassword1 myInput" name='password' onChange={(e) => setLogin({ ...login, [e.target.name]: e.target.value })} value={login.password} />

                            </div>
                            <div className=" ">
                                <input type="checkbox" onClick={togglePassword} /> Show Password
                            </div>


                            <div className=" ">
                                <button type="submit" onClick={handleCkick} className="" style={{ background: "rgb(7, 36, 62)" }}>Login</button>
                            </div>

                        </form>
                    </div>
                </div>

            </div>
        </>
    )
}
