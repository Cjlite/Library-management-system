import "react-toastify/dist/ReactToastify.css";
import { Route, Routes } from 'react-router-dom'
import Login from './Components/Login';
import Dashboard from './Components/Dashboard';
import Sidebar from './Components/Sidebar';
import AddBook from './Components/AddBook';
import AddStudent from './Components/AddStudent';
import IssueBook from './Components/IssueBook';
import ReturnBook from './Components/ReturnBook';
import AddUser from './Components/AddUser';

function App() {
  return (
    <>
      <Routes>
        {/* <Route path='/' element={<Login />} /> */}
        <Route path='/' element={<Sidebar />}>
          <Route path='dashboard' element={<Dashboard />} />
          <Route path='addbook' element={<AddBook />} />
          <Route path='addstudent' element={<AddStudent />} />
          <Route path='issuebook' element={<IssueBook />} />
          <Route path='returnbook' element={<ReturnBook />} />
          <Route path='adduser' element={<AddUser />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
