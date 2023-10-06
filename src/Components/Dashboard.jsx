import React, { useEffect, useState } from 'react'
import { GiOpenBook } from 'react-icons/gi'
import { BsFillPersonFill } from 'react-icons/bs'
import { SiHatenabookmark } from 'react-icons/si'
import axios from 'axios'
import { ToastContainer, toast } from "react-toastify";
import "./Dashboard.css"
import Modal from 'react-modal';

export default function Dashboard() {
  const [confirm, setConfirm] = useState(false);
  const [searchTitle, setSearchTitle] = useState('');
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [searchBooks, setSearchBooks] = useState('');
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [Toggle, setToggle] = useState(false);
  const [student, setStudent] = useState([]);
  const [book, setbook] = useState([]);
  const [issue, setissue] = useState([]);
  const [previous, setPrevious] = useState({
    studentname: '',
    class: '',
    stream: '',
    rollno: '',
    contact: '',
    libraryid: '',
  });
  const [deleteId, setDeleteId] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [displayBooks, setDisplayBooks] = useState(false);

  const fetchData = async () => {
    try {
      const studentResponse = await axios.get('http://localhost:9000/getstudent');
      setStudent(studentResponse.data);

      const bookResponse = await axios.get('http://localhost:9000/getbook');
      setbook(bookResponse.data);

      const issueResponse = await axios.get('http://localhost:9000/getissueall');
      setissue(issueResponse.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  useEffect(() => {
    fetchData();
    const filtered = book.filter((item) =>
      item.title.toLowerCase().includes(searchBooks.toLowerCase())
    );

    const filteredStudents = student.filter((value) => {
      return (
        searchTitle === "" ||
        value.studentname.toLowerCase().includes(searchTitle.toLowerCase()) ||
        value.class.toLowerCase().includes(searchTitle.toLowerCase()) ||
        value.stream.toLowerCase().includes(searchTitle.toLowerCase()) ||
        value.rollno.toString().includes(searchTitle.toString()) ||
        value.contact.toString().includes(searchTitle.toString()) ||
        value.libraryid.toLowerCase().includes(searchTitle.toLowerCase())
      );
    });
    setFilteredStudents(filteredStudents);
    setFilteredBooks(filtered);
  }, [Toggle, searchBooks]);

  const handleEdit = async (item) => {
    try {
      const response = await axios.get(`http://localhost:9000/getprevios/${item}`);
      setPrevious(response.data);
      localStorage.setItem("editId", item._id);
      setIsEditModalOpen(true);
    } catch (error) {
      console.error('Error fetching previous data:', error);
    }
  };

  const updateStudent = async () => {
    try {
      const editId = localStorage.getItem('editId');
      const response = await axios.put(
        `http://localhost:9000/updateStudent/${editId}`,
        previous
      );
      if (response.data.msg) {
        toast.success(response.data.msg);
        setToggle(!Toggle);
      } else {
        toast.error(response.data.error);
      }
    } catch (error) {
      console.error('Error updating student:', error);
    }
    setIsEditModalOpen(false);
  };

  const handleDelete = (item) => {
    setDeleteId(item);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    setIsDeleteModalOpen(false);
    axios.get(`http://localhost:9000/deletestudent/${deleteId}`).then((res) => {
      if (res.data.msg) {
        toast.success(res.data.msg);
        setToggle(!Toggle);
      } else {
        toast.error(res.data.error);
      }
    });
  };

  const toggleDisplay = () => {
    setDisplayBooks(!displayBooks);
  };

  return (
    <>
      <div className="dashboard-container">
        <Modal
          isOpen={isDeleteModalOpen}
          onRequestClose={() => setIsDeleteModalOpen(false)}
          className="deletemodal-container"
        >
          <h5 className="deletemodal-title">Confirmation</h5>
          <p className="deletemodal-content">Are you sure to delete this stdent?</p>
          <button className="deletemodal-button yes-button" onClick={confirmDelete}>
            Yes
          </button>
          <button
            className="deletemodal-button no-button"
            onClick={() => setIsDeleteModalOpen(false)}
          >
            No
          </button>
        </Modal>
        <div>
          <ToastContainer autoClose={1000} position="top-center" />
        </div>
        <Modal
          isOpen={isEditModalOpen}
          onRequestClose={() => setIsEditModalOpen(false)}
          contentLabel="Edit Student Modal"
          className="editemodal-container"
        >
          <h5>Edit Student</h5>
          <div className="modal-content">
            <div className="editemodal-input-container">
              <label htmlFor="studentName" className='editemodal-label'>Student Name:</label>
              <input
                type="text"
                id="studentName"
                name="studentname"
                className='editemodal-input'
                onChange={(e) =>
                  setPrevious({ ...previous, [e.target.name]: e.target.value })
                }
                value={previous.studentname}
              />
            </div>
            <div className="editemodal-input-container">
              <label htmlFor="studentName" className='editemodal-label'>Class:</label>
              <input
                type="text"
                id="class"
                name="class"
                className='editemodal-input'
                onChange={(e) =>
                  setPrevious({ ...previous, [e.target.name]: e.target.value })
                }
                value={previous.class}
              />
            </div>
            <div className="editemodal-input-container">
              <label htmlFor="studentName" className='editemodal-label'>Stream:</label>
              <input
                type="text"
                id="stream"
                name="stream"
                className='editemodal-input'
                onChange={(e) =>
                  setPrevious({ ...previous, [e.target.name]: e.target.value })
                }
                value={previous.stream}
              />
            </div>
            <div className="editemodal-input-container">
              <label htmlFor="rollno" className='editemodal-label'>Roll No:</label>
              <input
                type="text"
                id="rollno"
                name="rollno"
                className='editemodal-input'
                onChange={(e) =>
                  setPrevious({ ...previous, [e.target.name]: e.target.value })
                }
                value={previous.rollno}
              />
            </div>
            <div className="editemodal-input-container">
              <label htmlFor="studentName" className='editemodal-label'>Contact Number:</label>
              <input
                type="text"
                id="contactNumber"
                name="contactNumber"
                className='editemodal-input'
                onChange={(e) =>
                  setPrevious({ ...previous, [e.target.name]: e.target.value })
                }
                value={previous.contact}
              />
            </div>
            <div className="editemodal-input-container">
              <label htmlFor="studentName" className='editemodal-label'>Library Id:</label>
              <input
                type="text"
                id="rollNumber"
                name="rollNumber"
                className='editemodal-input'
                onChange={(e) =>
                  setPrevious({ ...previous, [e.target.name]: e.target.value })
                }
                value={previous.libraryid}
              />
            </div>
          </div>
          <div className="editemodal-button-container">
            <button
              className="editemodal-save-button"
              onClick={updateStudent}
            >
              Save changes
            </button>
            <button
              className="editemodal-cancel-button"
              onClick={() => setIsEditModalOpen(false)}
            >
              Cancel
            </button>
          </div>
        </Modal>

        <div className="dashboard-stats">
          <div className="total-books-container" onClick={toggleDisplay}>
            <div className="stat-icon">
              <GiOpenBook />
            </div>
            <div className="stat-details">
              <h6>Total Books</h6>
              <hr />
              <h3>{book.length}</h3>
            </div>
          </div>
          <div className="total-box">
            <div className="stat-icon">
              <BsFillPersonFill />
            </div>
            <div className="stat-details">
              <h6>Total Students</h6>
              <hr />
              <h3>{student.length}</h3>
            </div>
          </div>
          <div className="total-box">
            <div className="stat-icon">
              <SiHatenabookmark />
            </div>
            <div className="stat-details">
              <h6>Issued Books</h6>
              <hr />
              <h3>{issue.length}</h3>
            </div>
          </div>
        </div>
        {displayBooks ? (
          <div className="search-box">
            <h4>Search The Books Here...</h4>
            <input
              className="search-input"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setSearchBooks(e.target.value)}
            />
          </div>
        ) : (
          <div className="search-box">
            <h4>Search The Students Here...</h4>
            <input
              className="search-input"
              type="search"
              placeholder="Search..."
              aria-label="Search"
              onChange={(e) => setSearchTitle(e.target.value)}
            />
          </div>
        )}

        {displayBooks ? (
          <div className='books-table-container'>
            <table className=" ">
              <thead style={{ color: "black" }}>
                <tr className='books-table-row-header'>
                  <th className='books-table-row' scope="col">No.</th>
                  <th className='books-table-row' scope="col">Title</th>
                  <th className='books-table-row' scope="col">Auther</th>
                  <th className='books-table-row' scope="col">ISBN No</th>
                  <th className='books-table-row' scope="col">Price</th>
                </tr>
              </thead>
              <tbody className=' '>
                {filteredBooks.map((item, index) => (
                  <tr className="" key={item._id}>
                    <th className="th-id" scope="">
                      {index + 1}
                    </th>
                    <th className="book-td">{item.title}</th>
                    <th className="book-td">{item.author}</th>
                    <th className="book-td">{item.isbn}</th>
                    <th className="book-td">{item.price}</th>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="table-container">
            <table className=" ">
              <thead style={{ color: "black" }}>
                <tr className='table-row-header'>
                  <th className='books-table-row' scope="col">No.</th>
                  <th className='books-table-row' scope="col">Name</th>
                  <th className='books-table-row' scope="col">Class</th>
                  <th className='books-table-row' scope="col">Stream</th>
                  <th className='books-table-row' scope="col">Roll No</th>
                  <th className='books-table-row' scope="col">Contact No.</th>
                  <th className='books-table-row' scope="col">Library No.</th>
                  <th className='books-table-row' scope="col" className="action-header">Action</th>
                </tr>
              </thead>
              <tbody className=' '>
                {
                  filteredStudents.map((item, index) => {
                    return (
                      <tr key={item._id}>
                        <th className="th-id">{index + 1}</th>
                        <th className='th-id'>{item.studentname}</th>
                        <th className='th-id'>{item.class}</th>
                        <th className='th-id'>{item.stream}</th>
                        <th className='th-id'>{item.rollno}</th>
                        <th className='th-id'>{item.contact}</th>
                        <th className='th-id'>{item.libraryid}</th>
                        <th className='th-id'>
                          <div className="button-container">
                            <div className="">
                              <button className='editbutton' onClick={() => {
                                handleEdit(item._id)
                                localStorage.setItem("editId", item._id)
                              }} >Edit</button>
                            </div>
                            <div className="">
                              <button className='deletbutton' onClick={() => handleDelete(item._id)}>Delete</button>
                            </div>
                          </div>
                        </th>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  )
}
