import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const AddStudent = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [course, setCourse] = useState('');
    const [error, setError] = useState(false)
    const navigate = useNavigate();


    const handleAddStud = async () => {

        if (!name || !email || !course) {
            setError(true)
            alert('Please enter All values')
            return false;
        }

        const auth = localStorage.getItem('user');
        const userid = Number(JSON.parse(auth).id);
        
        
        let result = await fetch('http://localhost:5000/addstudent', {
            method: 'post',
            body: JSON.stringify({ name, course, email, userid }),
            headers: {
                'Content-Type': 'application/json',
                authorization:`bearer ${JSON.parse(localStorage.getItem('token'))}`
            }
        });
        
        result = await result.json();
        navigate('/')
    }

    return (
        <div className='addStud'>
            <h1>Add Student</h1>
            <input className='inputBox' type="text" onChange={(e) => setName(e.target.value)} value={name} placeholder='Enter Student Name' />
            {
                error && !name && <span className='invalid-inp'>Enter valid Student Name</span>
            }

            <input className='inputBox' type="text" onChange={(e) => setEmail(e.target.value)} value={email} placeholder='Enter email' />
            {
                error && !email && <span className='invalid-inp'>Enter valid email</span>
            }
            <input className='inputBox' type="text" onChange={(e) => setCourse(e.target.value)} value={course} placeholder='Enter course' />
            {
                error && !course && <span className='invalid-inp'>Enter valid course</span>
            }
            <button onClick={handleAddStud} className='appButton'>Add Student</button>
        </div>
    )
}

export default AddStudent
