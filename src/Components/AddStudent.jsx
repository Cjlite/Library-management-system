import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import './AddStudent.css'
const key = require('generate-serial-key');

export default function AddStudent() {
    const [student, setStudent] = useState({})

    const handleClick = () => {
        //    const {studentname,stream,classs,rollno,contact}=student;
        if (student.studentname && student.stream && student.studentclass && student.contact && student.libraryid && student.rollno) {
            axios.post("http://localhost:9000/addstudent", student).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                }
                else {
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
        else {
            toast.warning("Invalid Data")
        }

    }

    useEffect(() => {
        setStudent({ ...student, "libraryid": key.generate(7, "-", 4) })
    }, [])
    return (
        <>
            {console.log(student)}
            <div className='add-book-container' value={student.studentname} >
                <div className="">
                    <div>
                        <ToastContainer autoClose={1000} position="top-center" />
                    </div>
                    <h3>Add Student</h3>
                    <hr />
                </div>

                <div className="label-row">
                    <div className="">
                        <label htmlFor="studentName" className="">Student Name:</label>
                        <input type="text" className="addinput" id='studentName' name="studentname" onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} value={student.studentname} />
                    </div>
                    <div className="">
                        <label htmlFor="stream" className="">Stream:</label>
                        <input type="text" className="addinput" id='stream' value={student.stream} name='stream' onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} />
                    </div>
                </div>
                <div className="label-row">
                    <div className="">
                        <label htmlFor="contactNumber" className="">Contact Number:</label>
                        <input type="number" className="addinput" id='contactNumber' value={student.contact} name='contact' onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} />
                    </div>
                    {/* <div className="">
                        <label htmlFor="IssuedDate" className="">Issued Date:</label>
                        <input type="date" className="" id='IssuedDate'/>
                        </div> */}

                    <div className="">
                        <label htmlFor="class" className="">Class:</label>
                        <input type="text" className="addinput" id='class' value={student.studentclass} name='studentclass' onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} />
                    </div>
                </div>
                <div className="label-row">
                    <div className="">
                        <label htmlFor="rollNumber" className="">Roll No.:</label>
                        <input type="number" className="addinput" id='rollNumber' value={student.rollno} name='rollno' onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} />
                    </div>
                    <div className="">
                        <label htmlFor="libraryId" className="">Library Id:</label>
                        <input type="text" className="addinput" id='libraryId' name='libraryid' onChange={(e) => setStudent({ ...student, [e.target.name]: e.target.value })} value={student.libraryid} />
                    </div>
                    {/* <div className="">
                        <label htmlFor="returnDate" className="">Return Date:</label>
                        <input type="date" className="" id='returnDate'/>
                         </div> */}
                </div>
                <div className="  ">
                    <button type="submit" className="" onClick={handleClick} style={{ background: "rgb(7, 36, 62)" }}>Submit</button>
                </div>

            </div >
        </>
    )
}
