import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import { ClientSignin } from './routes/client/ClientSignin'
import { WorkerSignin } from './routes/worker/WorkerSignin'
import { WorkerSignup } from './routes/worker/WorkerSignup'
import { ClientSignup } from './routes/client/ClientSignup'
import Home from './routes/Home'
import Layout from './Layout/Layout'
import Services from './routes/Services'
import Contact from './routes/Contact'
import Aboutus from './routes/Aboutus'
import RoleSelection from './routes/RoleSelectionPage'

function App() {
 return <BrowserRouter>
    <Routes>
      
      <Route element={<Layout/>}>
        <Route path='/' element={<Home/>} />
        <Route path='/services' element={<Services/>} />
        <Route path='/contact' element={<Contact/>} />
        <Route path='/about' element={<Aboutus/>} />
      </Route>``

      <Route path='/roleselection' element={<RoleSelection/>} />
      <Route path="/client/signup" element={<ClientSignup/> } />
      <Route path="/client/signin" element={<ClientSignin/> } />
      <Route path="/worker/signup" element={<WorkerSignup/> } />
      <Route path="/worker/signin" element={<WorkerSignin/> } />
    </Routes>
 </BrowserRouter>



  // return <>
  //   <RoleSelection />
  // </>
}

export default App
