import './App.css';
import Home from './Home';
import {BrowserRouter ,Routes, Route} from 'react-router-dom'
import SignUp from './SignUp';
import SignIn from './SignIn';
import { AuthContextProvider } from './AuthContext';
import ProtectedRoute from './ProtectedRoute';
import { ToastContainer } from 'react-toastify';
const App = () =>{

  return(
    <>
    <ToastContainer />
    <BrowserRouter>
    <AuthContextProvider>

    <Routes>
    <Route exact path="/" element={<SignIn />} />
    <Route exact path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route exact path="/signup" element={<SignUp />} />

    </Routes>
    </AuthContextProvider>

    </BrowserRouter>
    </>
  )
}
export default App;