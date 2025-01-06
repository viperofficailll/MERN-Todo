
import { createRoot } from 'react-dom/client'
import './index.css'

import {BrowserRouter ,Route,Routes} from 'react-router-dom'
import Signup from './Components/Signup.jsx'
import Home from './Components/Home.jsx'
import Login from './Components/Login.jsx'
import Profile from './Components/Profile.jsx'
import Logout from './Components/Logout.jsx'
import First from './Components/First.jsx'

createRoot(document.getElementById('root')).render(

 <BrowserRouter>
 <Routes>
 <Route path ='/login' element={ <Login />}></Route>
 <Route path ='/' element={ <First />}></Route>
 <Route path ='/signup' element={ <Signup />}></Route>
 <Route path ='/home' element={ <Home />}></Route>
 <Route path ='/profile' element={ <Profile/>}></Route>
 <Route path ='/logout' element={ <Logout />}></Route>
 


 </Routes>


 </BrowserRouter>
 
 


   
 
)
