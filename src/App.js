
import './App.css';
import {Routes,Route} from "react-router-dom"
import Layout from './components/layout/Layout';
import Public from './components/public/Public';
import Login from './features/auth/Login';
import DashLayout from './components/dashLayout/DashLayout';
import Leaves from './components/leaves/Leaves';
import NewUserForm from './features/user/NewUser';
import LeavesList from './features/leaves/LeavesList';
import { fetchLeaves } from './features/leaves/leavesSlice';
import { store } from './app/store';
import NewLeave from './features/leaves/NewLeave';
import EditLeave from './features/leaves/EditLeave';

function App() {

  // store.dispatch(fetchLeaves());
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Public/>}/>
        <Route path='login' element={<Login/>}/>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<LeavesList/>}/>
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
