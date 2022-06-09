import { useState, useEffect } from 'react';
import '../App.css';
const FormItemList =()=> {
  const axios = require('axios').default
  const [name,setName] = useState('')
  const [id,setId] = useState()
  const [students,setStudents] = useState([])
  const [address,setAddress] = useState('')
  const [editName,setEditName] =useState('')
  const [editAddress,setEditAddress] = useState('')
  const HandleClick=(e)=>{
    e.preventDefault()
    const student={name,address}
    axios.post('http://localhost:8080/student/add',student)
    .then(function (res){
      console.log("New studeent is added")
    })
    setName('')
    setAddress('')
  }

  useEffect(()=>{
    axios.get('http://localhost:8080/student/getAll')
    .then(function (res){
      setStudents(res.data)
    })
  },[students])
  return (
    <div>
      <header className='header'></header>
      <div className="App">
      <h1>Add Student</h1>
      <form onSubmit={HandleClick}>
        <div className="form-student">
          <label>Name</label>
          <input type='text' placeholder='Name' onChange={(e)=>setName(e.target.value)} value={name}/>
        </div>
        <div className="form-student">
          <label>Address</label>
          <input type='text' placeholder='Address' onChange={(e)=>setAddress(e.target.value)} value={address}/>
          <button type='submit'>ADD</button>
        </div>
      </form>
      <div className='list-name'>
        <ul>
          {students.map((e)=>{

            return (
              <li key={e.id}><h3>{e.name}</h3><p>{e.address}</p>
              <div className='edit-container' id={id===e.id ? "":"active"} >
                <input value={editName} onChange={(e)=>setName(e.target.value) }/>
                <input value={editAddress} onChange={(e)=>setAddress(e.target.value)} />
                <button onClick={()=>{
                  axios.put(`http://localhost:8080/student/edit/${e.id}`,{id:e.id,name:name,address:address})
                  .then(()=>console.log('edited'))
      
                }}>Confirm</button>
              </div>
              <div className='btn-name-container'>
              <button id='edit' onClick={()=>{
                if(id==="" || id!==e.id){
                  setId(e.id)
                  setEditName(e.name)
                  setEditAddress(e.address)
                }else{
                  setId()
                }
                
                
                }
                }>
                Edit
              </button>
              <button id='delete' onClick={()=>{
  
                axios.delete(`http://localhost:8080/student/delete/${e.id}`)
                  .then(()=> console.log("Student that ID = " + e.id + " is deleted"))
              }}>
                Delete
                </button>
              </div>
              </li>
            )
          })}
        </ul>
        
      </div>
    </div>
    </div>
    
  );
}
export default FormItemList