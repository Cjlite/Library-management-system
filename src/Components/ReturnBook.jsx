import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { ToastContainer, toast } from "react-toastify";


export default function ReturnBook() {


    const [all, setAll] = useState({isbn: "",
        libraryid: "",
        issueddate: "",
        returndate: ""})


        useEffect(()=>{
            axios.get(`http://localhost:9000/getissue/${all.isbn}`).then((res)=>{
                setAll(res.data)
            })
        },[all.isbn.length==6])


    const [book, setBook] = useState([])
    useEffect(()=>{
        axios.get("http://localhost:9000/getbook").then((res)=>{
            setBook(res.data)
        })
    })
    const handleClick=(e)=>{
        const {isbn,issueddate,returndate,libraryid}=all;
        if(isbn && issueddate && returndate && libraryid){
         axios.post("http://localhost:9000/addreturned",all).then((res)=>{
             if(res.data.error){
                 toast.error(res.data.error)
             }
             else{
                 toast.success(res.data.msg)
                 setAll({isbn: "",
                 libraryid: "",
                 issueddate: "",
                 returndate: ""})
             }
     })
        }
        else{
         toast.warning("Invalid Data")
     }

     }

  return (
    <div className='container'>
    <div className="row">
    <div>
        <ToastContainer autoClose={1000}   position="top-center" />
      </div>
        <h3>Return Book</h3>
        <hr/>
    </div>
    <div className="row justify-content-center">
       <div className="col-md-4">                  
       <div className="mb-3">
       <label htmlFor="exampleInputPassword1" className="form-label">ISBN:</label>
    <input list="browsers" name="isbn" className='form-control' id="browser" onChange={
        (e)=>{
            setAll({...all,[e.target.name]:e.target.value})          
        }
        } value={all.isbn}/>
    <datalist id="browsers">
       {
        book.map((item)=>{
            return(
                <>
                    <option value={item.isbn}/>
                </>
            )
        })
       }
    </datalist>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Issued Date:</label>
            <input type="date" className="form-control" id="exampleInputPassword1" name='issueddate' onChange={(e)=>{setAll({...all,[e.target.name]:e.target.value})}} value={all.issueddate}/>
        </div>
       </div>
       <div className="col-md-4">                  
       <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">Student Library Id:</label>
            <input type="text" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" name='libraryid' onChange={(e)=>{setAll({...all,[e.target.name]:e.target.value})}} value={all.libraryid}/>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Return Date:</label>
            <input type="date" className="form-control" id="exampleInputPassword1" name='returndate' onChange={(e)=>{setAll({...all,[e.target.name]:e.target.value})}} value={all.returndate}/>
        </div>
       </div>
       <div className="row text-center justify-content-center">
            <button type="submit" className="btn btn-primary text-center w-25" style={{background:"rgb(7, 36, 62)"}} onClick={handleClick}>Submit</button>
       </div>

        
    </div>        
</div>
  )
}
