import React from 'react';
import {Routes, Route} from 'react-router-dom';
import Home from './pages/Home';
import ManageGroupe from './pages/account/management/ManageGroupe';
import Registration from './pages/account/registration/Registration';
import SignPage from './pages/account/registration/SignPage';
import SignUp from './pages/account/SignUp';
import LogIn from './pages/account/LogIn';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/groupeManagement' element={<ManageGroupe />} />
        <Route path='/registration' element={<Registration />} />
        <Route path='/sign' element={<SignPage />} />
        <Route path='/signUp' element={<SignUp />} />
        <Route path='/signIn' element={<LogIn />} />
      </Routes>
    </div>
  );
}

export default App;