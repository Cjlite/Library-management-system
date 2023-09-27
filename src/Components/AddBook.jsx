import axios from 'axios'
import React,{useState} from 'react'
import { ToastContainer, toast } from "react-toastify";


export default function AddBook() {
    const [book, setBook] = useState({})

    const handleClick=()=>{
        const {isbn,title,price,author}=book;
        if(isbn && title && price && author){
            axios.post("http://localhost:9000/addbook",book).then((res)=>{
            if(res.data.error){
                toast.error(res.data.error)
            }
            else{
                toast.success(res.data.msg)
                setBook({isbn:"",author:"",title:"",price:""})
            }
        })
        }
        else{
            toast.warning("Invalid Data")
        }
    }

  return (
    <>
    <div className='container'>
        <div className="row">
        <div>
        <ToastContainer autoClose={1000}   position="top-center" />
      </div>
            <h3>Add Book</h3>
            <hr/>
        </div>
        <div className="row justify-content-center">
           <div className="col-md-4">                  
           <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">ISBN:</label>
                <input type="number" className="form-control" name="isbn" onChange={(e)=>setBook({...book,[e.target.name]:e.target.value})} value={book.isbn} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Title:</label>
                <input type="text" className="form-control" name="title" onChange={(e)=>setBook({...book,[e.target.name]:e.target.value})} value={book.title} id="exampleInputPassword1"/>
            </div>
           </div>
           <div className="col-md-4">                  
           <div className="mb-3">
                <label htmlFor="exampleInputEmail1" className="form-label">Author:</label>
                <input type="text" className="form-control" name="author" onChange={(e)=>setBook({...book,[e.target.name]:e.target.value})} value={book.author} id="exampleInputEmail1" aria-describedby="emailHelp"/>
            </div>
            <div className="mb-3">
                <label htmlFor="exampleInputPassword1" className="form-label">Price:</label>
                <input type="number" className="form-control" name="price" onChange={(e)=>setBook({...book,[e.target.name]:e.target.value})} value={book.price} id="exampleInputPassword1"/>
            </div>
           </div>
           <div className="row text-center justify-content-center">
                <button type="submit" className="btn btn-primary text-center w-25" onClick={handleClick} style={{background:"rgb(7, 36, 62)"}}>Submit</button>
           </div>

            
        </div>        
    </div>
    </>
  )
}
