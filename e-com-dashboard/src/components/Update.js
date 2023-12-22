import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'

const Update = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const params = useParams();
  
    const navigate = useNavigate();
    
    useEffect(() => {
        getStudentDetails()
    }, [])
    
    const getStudentDetails = async () => {
        let result = await fetch(`http://localhost:5000/student/${params.id}`, {
            headers: {
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json();
        result = result[0]
        setName(result.name)
        setEmail(result.email)
        setCourse(result.course)

    }

    const updateStudent = async () => {
        console.log(name, email, course);
        let result = await fetch(`http://localhost:5000/update/${params.id}`, {
            method: 'put',
            body: JSON.stringify({ name, email, course }),
            headers: {
                'Content-Type': "application/json",
                authorization: `bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        })
        result = await result.json()
        navigate('/')
    }

    return (

        <div className='addStud'>
            <h1>Update student</h1>
                <input className='inputBox' type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter student Name' />
                <input className='inputBox' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter email' />
                <input className='inputBox' type="text" onChange={(e) => setCourse(e.target.value)} value={course} placeholder='Enter course' />
                <button onClick={updateStudent} className='appButton'>Update student</button>
        </div>

    )
}

export default Update
