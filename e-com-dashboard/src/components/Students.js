import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

const Students = () => {

  const auth = JSON.parse(localStorage.getItem('user')); 
  const [user, setUser] = useState({ name: '', email: '' , Role: ''}); 

  const getUser = () => {
      if (auth) {
          setUser(auth);
      }
  }

  useEffect(() => {
     
  });
    const [students,setStudents] = useState([])

    useEffect(()=>{
      getUser();
        getStudents();
        
    },[])


    const getStudents= async ()=>{
        let result = await fetch(`http://localhost:5000/students`,{
          headers:{
            authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
          }
        });
        result = await result.json();
        setStudents(result)
    }
    const deleteStud= async(id)=>{
        let result = await fetch(`http://localhost:5000/delete/${id}`,{
            method:'delete',
            headers:{
              authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        result = await result.json();
        if(result) {
            alert('Your student is deleted')
            getStudents();
        }

    }
    
    

  return (
    <div className='student-list'>
      <h1>All Students </h1>
      <ul>
        <li>S.No</li>
        <li>Name</li>
        <li>Email</li>
        <li>Course</li>
        {
          user.Role === 'superadmin' && <li>Actions</li>
        }
       
      </ul>
    {
        students.length>0 ? students.map((item,index)=>
        <ul key={item.id}>
        <li>{index+1}</li>
        <li>{item.name}</li>
        <li> {item.email}</li>
        <li>{item.course}</li>
        {
          user.Role === 'superadmin' &&  <li>
          <button className="delete" onClick={()=>deleteStud(item.id)}  >Delete</button>
          <Link to={`/update/${item.id}`}>Edit</Link>
      </li>
        }
       
        
      </ul>
        )
        : <h1>No student Found </h1>
    }
    </div>
  )
}

export default Students


// http://localhost:5000/students
