import axios from 'axios'
import React, { useEffect,useState } from 'react'
import { ToastContainer, toast } from "react-toastify";


export default function IssueBook() {
        const [issue, setIssue] = useState({})

        const handleClick=()=>{
           const {isbn,issueddate,returndate,libraryid}=issue;
           if(isbn && issueddate && returndate && libraryid){
            axios.post("http://localhost:9000/addissue",issue).then((res)=>{
                if(res.data.error){
                    toast.error(res.data.error)
                }
                else{
                    toast.success(res.data.msg)
                    setIssue({isbn: "",
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

        const [student, setStudent] = useState([])
        useEffect(()=>{
            axios.get("http://localhost:9000/getstudent").then((res)=>{
                setStudent(res.data)
            })
        })

        const [book, setBook] = useState([])
        useEffect(()=>{
            axios.get("http://localhost:9000/getbook").then((res)=>{
                setBook(res.data)
            })
        })

        
  return (
    <>
    <div className='container'>
    <div className="row">
    <div>
        <ToastContainer autoClose={1000}   position="top-center" />
      </div>
        <h3>Issue Book</h3>
        <hr/>
    </div>
    <div className="row justify-content-center">
       <div className="col-md-4">                  
       <div className="mb-3">
       <label htmlFor="exampleInputPassword1" className="form-label">ISBN:</label>
    <input list="browsers" name="isbn" className='form-control' id="browser" value={issue.isbn}  onChange={(e)=>{setIssue({...issue,[e.target.name]:e.target.value})}}  />
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
            <input type="date" className="form-control" id="exampleInputPassword1" name='issueddate' value={issue.issueddate} onChange={(e)=>{setIssue({...issue,[e.target.name]:e.target.value})}}/>
        </div>
       </div>
       <div className="col-md-4">                  
       <div className="mb-3">
       <label htmlFor="exampleInputPassword1" className="form-label">Student Library Id:</label>
    <input list="browsersTwo" name="libraryid" className='form-control' id="browser" value={issue.libraryid} onChange={(e)=>{setIssue({...issue,[e.target.name]:e.target.value})}}/>
    <datalist id="browsersTwo">
        {
          student.map((item)=>{
            return(
                <>
                    <option value={item.libraryid}/>
                </>
            )
          })
        }
    </datalist>
        </div>
        <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">Return Date:</label>
            <input type="date" className="form-control" id="exampleInputPassword1" name='returndate' value={issue.returndate} onChange={(e)=>{setIssue({...issue,[e.target.name]:e.target.value})}}/>
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
