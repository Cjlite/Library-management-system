import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
const key=require('generate-serial-key')


export default function AddStudent() {
    const [student,setStudent]=useState({})

        const handleClick=()=>{
        //    const {studentname,stream,classs,rollno,contact}=student;
          if(student.studentname && student.stream && student.studentclass && student.contact && student.libraryid && student.rollno){
            axios.post("http://localhost:9000/addstudent",student).then((res)=>{
                if(res.data.error){
                    toast.error(res.data.error)
                }
                else{
                    toast.success(res.data.msg)
                    setStudent({
                        studentname: "",
                            class: "",
                            stream: "",
                            rollno: "",
                            contact: "",
                            libraryid: ""
                    })
                }
            })
          }
          else{
            toast.warning("Invalid Data")
          }
          
        }

    useEffect(()=>{
        setStudent({...student,"libraryid":key.generate(7,"-",4)})
    },[])
  return (
    <>
    {console.log(student)}
    <div clas value={student.studentname}sName='container'>
    <div className="row">
    <div>
        <ToastContainer autoClose={1000}   position="top-center" />
      </div>
        <h3>Add Student</h3>
        <hr/>
    </div>
    <div className="row justify-content-center">
       <div className="col-md-4">                  
       <div className="mb-3">
            <label htmlFor="studentName" className="form-label">Student Name:</label>
            <input type="text" className="form-control"  id='studentName' name="studentname" onChange={(e)=>setStudent({...student,[e.target.name]:e.target.value})} value={student.studentname}/>
        </div>
        <div className="mb-3">
            <label htmlFor="stream" className="form-label">Stream:</label>
            <input type="text" className="form-control" id='stream' value={student.stream} name='stream' onChange={(e)=>setStudent({...student,[e.target.name]:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
            <input type="number" className="form-control" id='contactNumber' value={student.contact} name='contact' onChange={(e)=>setStudent({...student,[e.target.name]:e.target.value})}/>
        </div>
        {/* <div className="mb-3">
            <label htmlFor="IssuedDate" className="form-label">Issued Date:</label>
            <input type="date" className="form-control" id='IssuedDate'/>
        </div> */}
       </div>
       <div className="col-md-4">                  
       <div className="mb-3">
            <label htmlFor="class" className="form-label">Class:</label>
            <input type="text" className="form-control"  id='class' value={student.studentclass} name='studentclass' onChange={(e)=>setStudent({...student,[e.target.name]:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="rollNumber" className="form-label">Roll No.:</label>
            <input type="number" className="form-control" id='rollNumber' value={student.rollno} name='rollno' onChange={(e)=>setStudent({...student,[e.target.name]:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="libraryId" className="form-label">Library Id:</label>
            <input type="text" className="form-control" id='libraryId'  name='libraryid' onChange={(e)=>setStudent({...student,[e.target.name]:e.target.value})} value={student.libraryid}/>
        </div>
        {/* <div className="mb-3">
            <label htmlFor="returnDate" className="form-label">Return Date:</label>
            <input type="date" className="form-control" id='returnDate'/>
        </div> */}
       </div>
       <div className="row text-center justify-content-center">
            <button type="submit" className="btn btn-primary text-center w-25" onClick={handleClick} style={{background:"rgb(7, 36, 62)"}}>Submit</button>
       </div>

        
    </div>        
</div>
</>
  )
}
