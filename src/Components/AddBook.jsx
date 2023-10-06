import axios from 'axios'
import React, { useState } from 'react'
import { ToastContainer, toast } from "react-toastify";
import './AddBook.css'


export default function AddBook() {
    const [book, setBook] = useState({})

    const handleClick = () => {
        const { isbn, title, price, author } = book;
        if (isbn && title && price && author) {
            axios.post("http://localhost:9000/addbook", book).then((res) => {
                if (res.data.error) {
                    toast.error(res.data.error)
                }
                else {
                    toast.success(res.data.msg)
                    setBook({ isbn: "", author: "", title: "", price: "" })
                }
            })
        }
        else {
            toast.warning("Invalid Data")
        }
    }

    return (
        <>
            <div className="add-book-container">
                <div className="">
                    <div>
                        <ToastContainer autoClose={1000} position="top-center" />
                    </div>
                    <h2>Add Book</h2>
                    <hr />
                </div>
                <div className=" ">
                    <div className="label-row">
                        <div className="">
                            <label htmlFor="exampleInputEmail1" className="">ISBN :</label>
                            <input type="number" className="addinput" name="isbn" onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })} value={book.isbn} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="">
                            <label htmlFor="exampleInputPassword1" className="">Title:</label>
                            <input type="text" className="addinput" name="title" onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })} value={book.title} id="exampleInputPassword1" />
                        </div>
                    </div>
                    <div className="label-row">
                        <div className="">
                            <label htmlFor="exampleInputEmail1" className="">Author:</label>
                            <input type="text" className="addinput" name="author" onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })} value={book.author} id="exampleInputEmail1" aria-describedby="emailHelp" />
                        </div>
                        <div className="">
                            <label htmlFor="exampleInputPassword1" className="">Price:</label>
                            <input type="number" className="addinput" name="price" onChange={(e) => setBook({ ...book, [e.target.name]: e.target.value })} value={book.price} id="exampleInputPassword1" />
                        </div>
                    </div>
                    <div className="">
                        <button type="submit" className="" onClick={handleClick} style={{ background: "rgb(7, 36, 62)" }}>Submit</button>
                    </div>
                </div>
            </div>
        </>
    )
}
