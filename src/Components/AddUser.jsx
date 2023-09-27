import axios from 'axios';
import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";

export default function AddUser() {
    const [user, setUser] = useState({email:"",
        password:"",
        userName:"",
        confirm:""
    })

    
    const {email,password,userName,confirm}=user;
    const AddMoreUser=()=>{
        
        if(email && password && userName && confirm){
            if(password==confirm){
                axios.post("http://localhost:9000/addmoreuser",user).then((res)=>{
                    if(res.data.msg){
                        toast.success(res.data.msg)
                        setUser({
                                email:"",
                                password:"",
                                userName:"",
                                confirm:""
                        })
                    }
                    else{
                        toast.error(res.data.error)
                    }
                })
            }
            else{
                toast.error("password not match")
            }
        }
        else{
            toast.error("Invalid Data")
        }
    }

  return (
    <div className='container'>
    <div className="row">
    <div>
        <ToastContainer autoClose={1000}   position="top-center" />
      </div>
        <h3>New User</h3>
        <hr/>
    </div>
    <div className="row justify-content-center">
       <div className="col-md-4">                  
       <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Email Id:</label>
            <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='email' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} value={user.email}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Password:</label>
            <input type="password" className="form-control" id="exampleInputPassword1"  name='password' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} value={user.password}/>
        </div>
       </div>
       <div className="col-md-4">                  
       <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">User Name:</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"  name='userName' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} value={user.userName}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Confirm Password:</label>
            <input type="password" className="form-control" id="exampleInputPassword1"  name='confirm' onChange={(e)=>setUser({...user,[e.target.name]:e.target.value})} value={user.confirm}/>
        </div>
       </div>
       <div className="row text-center justify-content-center">
            <button type="submit" className="btn btn-primary text-center w-25" style={{background:"rgb(7, 36, 62)"}} onClick={AddMoreUser}>Submit</button>
       </div>

        
    </div>        
</div>
  )
}
