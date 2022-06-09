import axios from "axios"
import { useEffect,useState } from "react"
const HomeConponent=()=>{       
    const axios = require('axios').default
    const [students,setStudents] = useState([])
    const [search,setSearch] = useState('')
    useEffect(()=>{
        axios.get('http://localhost:8080/student/getAll')
        .then(function (res){
            setStudents(res.data)
            console.log(res.data)
        })
    },[])
    return (
        <div className="home-container">
            <form>
            <input onChange={((e)=>setSearch(e.target.value))} type='text' placeholder="search..."/>
            </form>
            <ul>
            {students.filter((e)=>{
                if(search === ''){
                    return e
                }
                else if(e.name.toLowerCase().includes(search.toLowerCase()) || e.address.toLowerCase().includes(search.toLowerCase())){
                    return e
                }
            }).map((e)=>{
                return (
                <div className="home-items">
                <li key={e.id}><h3>{e.name}</h3><p>{e.address}</p></li>
                </div>  
                )
                
            })}
            </ul>
        </div>
        
    )
}
export default HomeConponent