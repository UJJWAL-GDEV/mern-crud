import React, { useEffect, useState } from 'react';

const Profile = () => {
    const auth = JSON.parse(localStorage.getItem('user')); 
    const [user, setUser] = useState({ name: '', email: '' , Role: ''}); 

    const getUser = () => {
        if (auth) {
            setUser(auth);
        }
    }

    useEffect(() => {
        getUser();
    });

    return (
        <div className='profile'>
            <h1> User Profile</h1>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <td>{user.name}</td>
                    </tr>
                    <tr>
                        <th>Email</th>
                        <td>{user.email}</td>
                    </tr>
                    <tr>
                        <th>Role</th>
                        <td>{user.Role}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

export default Profile;
