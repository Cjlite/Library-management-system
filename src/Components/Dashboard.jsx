import React, { useEffect,useState } from 'react'
import {GiOpenBook} from 'react-icons/gi'
import {BsFillPersonFill} from 'react-icons/bs'
import {SiHatenabookmark} from 'react-icons/si'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";

export default function Dashboard() {

  const [confirm, setConfirm] = useState(false)

  const [searchTitle, setSearchTitle] = useState("");
  const [Toggle, setToggle] = useState(false);


  const [student, setStudent] = useState([])
  useEffect(()=>{
      axios.get("http://localhost:9000/getstudent").then((res)=>{
          setStudent(res.data)
      })
  },[Toggle])

  const [book, setbook] = useState([])
  useEffect(()=>{
      axios.get("http://localhost:9000/getbook").then((res)=>{
          setbook(res.data)
      })
  },[])
  const [issue, setissue] = useState([])
  useEffect(()=>{
      axios.get("http://localhost:9000/getissueall").then((res)=>{
          setissue(res.data)
      })
  },[])

  const [previous, setPrevious] = useState({
    studentname: "",
    class: "",
    stream: "",
    rollno: "",
    contact: "",
    libraryid: ""
  })

  const handleEdit=(item)=>{
      axios.get(`http://localhost:9000/getprevios/${item}`).then((res)=>{
        setPrevious(res.data)
      })
  }


  const updateStudent=()=>{
        axios.put(`http://localhost:9000/updateStudent/${localStorage.getItem("editId")}`,previous).then((res)=>{
          if(res.data.msg){
             toast.success(res.data.msg) 
             setToggle(!Toggle)

          }
          else{
            toast.error(res.data.error)
          }
        })
  }
  const handleDelete=()=>{
  
      axios.get(`http://localhost:9000/deletestudent/${localStorage.getItem("deleteId")}`).then((res)=>{
      if(res.data.msg){
         toast.success(res.data.msg) 
         setToggle(!Toggle)

      }
      else{
        toast.error(res.data.error)
      }
    })
    
    
  }

  return (
    <>
    
    <div className='container'>
<div class="modal fade" id="exampleModalTwo" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Confirmation</h5>
      </div>
      <div class="modal-body">
       Are You Sure...?
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" onClick={handleDelete} data-bs-dismiss="modal">Yes</button>
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">No</button>
      </div>
    </div>
  </div>
</div>

    <div>
        <ToastContainer autoClose={1000}   position="top-center" />
      </div>
<div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
  <div class="modal-dialog modal-lg">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
      </div>
      <div class="modal-body">
      <div className="row justify-content-center">
       <div className="col-md-4">                  
       <div className="mb-3">
            <label htmlFor="studentName" className="form-label">Student Name:</label>
            <input type="text" className="form-control"  id='studentName' name="studentname" onChange={(e)=>setPrevious({...previous,[e.target.name]:e.target.value})} value={previous.studentname}/>
        </div>
        <div className="mb-3">
            <label htmlFor="stream" className="form-label">Stream:</label>
            <input type="text" className="form-control" id='stream' value={previous.stream} name='stream' onChange={(e)=>setPrevious({...previous,[e.target.name]:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="contactNumber" className="form-label">Contact Number:</label>
            <input type="number" className="form-control" id='contactNumber' value={previous.contact} name='contact' onChange={(e)=>setPrevious({...previous,[e.target.name]:e.target.value})}/>
        </div>
        {/* <div className="mb-3">
            <label htmlFor="IssuedDate" className="form-label">Issued Date:</label>
            <input type="date" className="form-control" id='IssuedDate'/>
        </div> */}
       </div>
       <div className="col-md-4">                  
       <div className="mb-3">
            <label htmlFor="class" className="form-label">Class:</label>
            <input type="text" className="form-control"  id='class' value={previous.class} name='class' onChange={(e)=>setPrevious({...previous,[e.target.name]:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="rollNumber" className="form-label">Roll No.:</label>
            <input type="number" className="form-control" id='rollNumber' value={previous.rollno} name='rollno' onChange={(e)=>setPrevious({...previous,[e.target.name]:e.target.value})}/>
        </div>
        <div className="mb-3">
            <label htmlFor="libraryId" className="form-label">Library Id:</label>
            <input type="text" className="form-control" id='libraryId'  name='libraryid' onChange={(e)=>setPrevious({...previous,[e.target.name]:e.target.value})} value={previous.libraryid}/>
        </div>
       </div>

        
    </div> 
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={updateStudent} data-bs-dismiss="modal">Save changes</button>
      </div>
    </div>
  </div>
</div>
      <div className="row p-4 justify-content-center">
        
            <div className="col-md-3 mx-2" style={{boxShadow:"0 0 10px white"}}>
                <div className="row">
                  <div className="col-md-3" style={{color:"rgb(7, 36, 62)",placeItems:"center",display:"grid",fontSize:"2.5rem"}}>
                    <span><GiOpenBook/></span>
                  </div>
                  <div className="col-md-9 text-center text-white">
                   <h6> Total Books</h6>
                   <hr />
                   <h3>{book.length}</h3>
                  </div>
                </div>
            </div>
            <div className="col-md-3 mx-2" style={{boxShadow:"0 0 10px white"}}>
                <div className="row">
                  <div className="col-md-3" style={{color:"rgb(7, 36, 62)",placeItems:"center",display:"grid",fontSize:"2.5rem"}}>
                    <span><BsFillPersonFill/></span>
                  </div>
                  <div className="col-md-9 text-center text-white">
                   <h6> Total Students</h6>
                   <hr />
                   <h3>{student.length}</h3>
                  </div>
                </div>
            </div>
            <div className="col-md-3 mx-2" style={{boxShadow:"0 0 10px white"}}>
                <div className="row">
                  <div className="col-md-3" style={{color:"rgb(7, 36, 62)",placeItems:"center",display:"grid",fontSize:"2.5rem"}}>
                    <span><SiHatenabookmark/></span>
                  </div>
                  <div className="col-md-9 text-center text-white">
                   <h6> Issued Books</h6>
                   <hr />
                   <h3>{issue.length}</h3>
                  </div>
                </div>
            </div>
        </div>  

        <div className="row text-white text-center justify-content-center">
            <h4>Search The Students Here...</h4>  
            <input class="form-control w-50" type="search" placeholder="Search..." aria-label="Search" onChange={(e) => setSearchTitle(e.target.value)}/>
        </div>    
        <div className="row justify-content-center">
      <div className="col-md-11">
      <table class="table mt-3 bg-opacity-25" style={{boxShadow:"0 0 15px white"}}>
  <thead style={{color:"black"}}>
    <tr>
      <th scope="col">#</th>
      <th scope="col">Name</th>
      <th scope="col">Class</th>
      <th scope="col">Stream</th>
      <th scope="col">Roll No</th>
      <th scope="col">Contact No.</th>
      <th scope="col">Library No.</th>
      <th scope="col" className='text-center'>Action</th>
    </tr>
  </thead>
  <tbody className='text-white overflow-auto'>
   {
    student.filter((value) => {
      if (searchTitle === "") {
        return value;
      } else if (
        value.studentname.toLowerCase().includes(searchTitle.toLowerCase()) ||
        value.class.toLowerCase().includes(searchTitle.toLowerCase()) ||
        value.stream.toLowerCase().includes(searchTitle.toLowerCase()) ||
        value.rollno.toString().includes(searchTitle.toString()) ||
        value.contact.toString().includes(searchTitle.toString()) ||
        value.libraryid.toLowerCase().includes(searchTitle.toLowerCase())
      
      ) {
        return value;
      }
    }).map((item,index)=>{
      return(
        <>
         <tr>
      <th scope="row">{index+1}</th>
      <td>{item.studentname}</td>
      <td>{item.class}</td>
      <td>{item.stream}</td>
      <td>{item.rollno}</td>
      <td>{item.contact}</td>
      <td>{item.libraryid}</td>
      <td><div className="row justify-content-center">
        <div className="col-auto">
        <button className='btn' style={{background:"transparent",boxShadow:"0 0 5px white"}} onClick={()=>{
          handleEdit(item._id)
          localStorage.setItem("editId",item._id)
        }} data-bs-toggle="modal" data-bs-target="#exampleModal">Edit</button></div>
        <div className="col-auto">
        <button className='btn' style={{background:"transparent",boxShadow:"0 0 5px white"}} onClick={()=>{
          localStorage.setItem("deleteId",item._id)
        }}  data-bs-toggle="modal" data-bs-target="#exampleModalTwo"> delete</button></div></div></td>
    </tr>
        </>
      )
    })
   }
  </tbody>
</table>
      </div>
        </div>
    </div>
    </>
  )
}
