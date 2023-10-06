import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import './IssueBook.css'


export default function IssueBook() {
    const [issue, setIssue] = useState({})

    const handleClick = () => {
        const { isbn, issueddate, returndate, libraryid } = issue;
        if (isbn && issueddate && returndate && libraryid) {
            axios.post("http://localhost:9000/addissue", issue).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                }
                else {
                    toast.success(res.data.msg)
                    setIssue({
                        isbn: "",
                        libraryid: "",
                        issueddate: "",
                        returndate: ""
                    })
                }
            })
        }
        else {
            toast.warning("Invalid Data")
        }

    }

    const [student, setStudent] = useState([])
    useEffect(() => {
        axios.get("http://localhost:9000/getstudent").then((res) => {
            setStudent(res.data)
        })
    })

    const [book, setBook] = useState([])
    useEffect(() => {
        axios.get("http://localhost:9000/getbook").then((res) => {
            setBook(res.data)
        })
    })


    return (
        <>
            <div className='issuebook-container'>
                <div className="">
                    <div>
                        <ToastContainer autoClose={1000} position="top-center" />
                    </div>
                    <h3>Issue Book</h3>
                    <hr />
                </div>
                <div className=" ">
                    <div className="label-row">
                        <div className="">
                            <label htmlFor="exampleInputPassword1" className="">ISBN:</label>
                            <input type='text' list="browsers" name="isbn" className='addinput' id="browser" value={issue.isbn} onChange={(e) => { setIssue({ ...issue, [e.target.name]: e.target.value }) }} />
                            <datalist id="browsers">
                                {
                                    book.map((item) => {
                                        return (
                                            <>
                                                <option value={item.isbn} />
                                            </>
                                        )
                                    })
                                }
                            </datalist>
                        </div>
                        <div className="">
                            <label htmlFor="exampleInputPassword1" className="">Issued Date:</label>
                            <input type="date" className="addinput" id="exampleInputPassword1" name='issueddate' value={issue.issueddate} onChange={(e) => { setIssue({ ...issue, [e.target.name]: e.target.value }) }} />
                        </div>
                    </div>
                    <div className="label-row">
                        <div className="">
                            <label htmlFor="exampleInputPassword1" className="">Student Library Id:</label>
                            <input type='text' list="browsersTwo" name="libraryid" className='addinput' id="browser" value={issue.libraryid} onChange={(e) => { setIssue({ ...issue, [e.target.name]: e.target.value }) }} />
                            <datalist id="browsersTwo">
                                {
                                    student.map((item) => {
                                        return (
                                            <>
                                                <option value={item.libraryid} />
                                            </>
                                        )
                                    })
                                }
                            </datalist>
                        </div>
                        <div className="">
                            <label htmlFor="exampleInputPassword1" className="">Return Date:</label>
                            <input type="date" className="addinput" id="exampleInputPassword1" name='returndate' value={issue.returndate} onChange={(e) => { setIssue({ ...issue, [e.target.name]: e.target.value }) }} />
                        </div>
                    </div>
                    <div className=" ">
                        <button type="submit" className="" onClick={handleClick} style={{ background: "rgb(7, 36, 62)" }}>Submit</button>
                    </div>

                </div>
            </div>
        </>
    )
}
