import React from 'react'
import { Link, useNavigate } from 'react-router-dom';
const Nav = () => {
    const auth = localStorage.getItem('user');
    const navigate = useNavigate();
    const logout = ()=>{
        localStorage.clear();
        navigate('/login')
    }

    return (
        <div>
           
                {auth?
                <ul className='nav-ul'><li><Link to='/'>Students</Link></li>
                <li><Link to='/add'>Add Student</Link></li>
                <li><Link to='/profile'>Profile</Link></li>
                <li><Link onClick={logout} to='/login'>LogOut ({JSON.parse(auth).name})</Link></li>
                </ul>
                :<ul className='nav-ul nav-sign'>
                <li><Link to='/login'>Login</Link></li>
                </ul>
                }
        </div>
    )
}

export default Nav;