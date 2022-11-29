import './App.css';
import  React from 'react';
import  'bootstrap/dist/css/bootstrap.min.css';
import Login from './components/Login.js';
// import Slider from './components/Slider.js';
// import SliderLogin from './components/SliderLogin.js'
import Signup from './components/Signup.js';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Home from './pages/Home.js';
import Userprofile from './components/Userprofile';


function App(){
  
  return (
    <Router>
      
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/signin" element={<Login />} />
              {/* <Route path="/" element={<Slider />} /> */}
              {/* <Route path="/" element={<SliderLogin />} /> */}
              <Route path="/signup" element={<Signup />} />
              <Route path="/navbar"  element={< Navbar/>} />
              <Route path='/home' element={<Home />} />
              <Route path='/userprofile' exact component={Userprofile} />
             
              </Routes>
          
      
    </Router>
  )
}



export default App;
