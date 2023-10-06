import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import './ReturnBook.css'


export default function ReturnBook() {

    const [all, setAll] = useState({
        isbn: "",
        libraryid: "",
        issueddate: "",
        returndate: ""
    })


    useEffect(() => {
        axios.get(`http://localhost:9000/getissue/${all.isbn}`).then((res) => {
            setAll(res.data)
        })
    }, [all.isbn.length == 6])


    const [book, setBook] = useState([])
    useEffect(() => {
        axios.get("http://localhost:9000/getbook").then((res) => {
            setBook(res.data)
        })
    })
    const handleClick = (e) => {
        const { isbn, issueddate, returndate, libraryid } = all;
        if (isbn && issueddate && returndate && libraryid) {
            axios.post("http://localhost:9000/addreturned", all).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                }
                else {
                    toast.success(res.data.msg)
                    setAll({
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

    return (
        <div className='return-book-containers'>
            <div className="">
                <div>
                    <ToastContainer autoClose={1000} position="top-center" />
                </div>
                <h3>Return Book</h3>
                <hr />
            </div>
            <div className=" ">
                <div className="label-row">
                    <div className="">
                        <label htmlFor="exampleInputPassword1" className="">ISBN:</label>
                        <input type="text" list="browsers" name="isbn" className="addinput" id="browser" onChange={
                            (e) => {
                                setAll({ ...all, [e.target.name]: e.target.value })
                            }
                        } value={all.isbn} />
                        <datalist className='' id="browsers">
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
                        <input type="date" className="addinput" id="exampleInputPassword1" name='issueddate' onChange={(e) => { setAll({ ...all, [e.target.name]: e.target.value }) }} value={all.issueddate} />
                    </div>
                </div>
                <div className="label-row">
                    <div className="">
                        <label htmlFor="exampleInputEmail1" className="">Student Library Id:</label>
                        <input type="text" className="addinput" id="exampleInputEmail1" aria-describedby="emailHelp" name='libraryid' onChange={(e) => { setAll({ ...all, [e.target.name]: e.target.value }) }} value={all.libraryid} />
                    </div>
                    <div className="">
                        <label htmlFor="exampleInputPassword1" className="">Return Date:</label>
                        <input type="date" className="addinput" id="exampleInputPassword1" name='returndate' onChange={(e) => { setAll({ ...all, [e.target.name]: e.target.value }) }} value={all.returndate} />
                    </div>
                </div>
                <div className="  ">
                    <button type="submit" className="" style={{ background: "rgb(7, 36, 62)" }} onClick={handleClick}>Submit</button>
                </div>


            </div>
        </div>
    )
}
