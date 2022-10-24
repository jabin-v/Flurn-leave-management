
import './App.css';
import {Routes,Route} from "react-router-dom"
import Layout from './components/layout/Layout';
import Public from './components/public/Public';
import Login from './features/auth/Login';
import DashLayout from './components/dashLayout/DashLayout';
import Leaves from './components/leaves/Leaves';
import NewUserForm from './features/user/NewUser';


function App() {
  return (
    <Routes>
      <Route path='/' element={<Layout/>}>
        <Route index element={<Public/>}/>
        <Route path='login' element={<Login/>}/>

        <Route path="dash" element={<DashLayout />}>
          <Route index element={<Leaves/>}/>

          <Route path="users">
              <Route path="new" element={<NewUserForm />} />
            </Route>

        </Route>
        

      </Route>
    </Routes>
  );
}

export default App;
