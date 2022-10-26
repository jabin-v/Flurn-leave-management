
import { Route, Routes } from "react-router-dom";
import './App.css';
import Calender from './components/calender/Calender';
import DashLayout from './components/dashLayout/DashLayout';
import Layout from './components/layout/Layout';
import Public from './components/public/Public';
import Login from './features/auth/Login';
import EditLeave from './features/leaves/EditLeave';
import LeavesList from './features/leaves/LeavesList';
import NewLeave from './features/leaves/NewLeave';
import NewUserForm from './features/user/NewUser';

function App() {

  // store.dispatch(fetchLeaves());
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Public/>}/>
        <Route path='login' element={<Login/>}/>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<LeavesList/>}/>
          <Route path='visualize' element={<Calender/>}/>
          <Route path='leave/new' element={<NewLeave/>}/>
          <Route path='leave/:leaveId' element={<EditLeave/>}/>

          <Route path="users">
              <Route path="new" element={<NewUserForm />} />
          </Route>

          <Route path="leaves">
              <Route index  element={<NewUserForm />} />
              <Route path='new'  element={<NewUserForm />} />
          </Route>

        </Route>
        

      </Route>
    </Routes>
  );
}

export default App;
