import logo from './logo.svg';
import './App.css';
import {useEffect, useState} from 'react'
import FormItemList from './components/FormItemList';
import { BrowserRouter as Router,Routes,Route,Link } from "react-router-dom";
import HomeConponent from './components/HomeComponent';
function App() {

  const headerList = [{id:1,path:"/",link:"Home"},
                      {id:2,path:"/manage-data",link:"Manage"}] 

  return (
    <div>
      <Router>
        <div>
          <div className='header-container'>
          <ul>
            {headerList.map((e)=>{
              return <li key={e.id}>
                  <Link id={e.path===window.location.pathname ? "active-page":""} onClick={()=>window.location.pathname = e.path} to={e.path}>{e.link}</Link>
                </li>
            }
            )
          }
          </ul>
          </div>
          
          <Routes>
            <Route path='/' element={<HomeConponent/>}></Route>
            <Route path='/manage-data' element={<FormItemList/>}></Route>
          </Routes>
        </div>
      </Router>
    </div>
  )
}

export default App;
