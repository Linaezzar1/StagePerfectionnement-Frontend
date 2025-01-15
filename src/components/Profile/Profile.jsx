import React from 'react'
import './Profile.css'

const Profile = () => {
   

    const user = {
        name: 'John',
        lastname: 'Doe',
        email: 'john.doe@example.com',
    };

    return (
        <div className="profile-page">
            
            <h1>User Profile</h1>
            <div className="profile-info">
                <div className="info-item">
                    <label htmlFor="Firstname">First Name:  </label>
                    <input type="text" value={user.name} />
                </div>
                <div className="info-item">
                    <label htmlFor="Lastname">Last Name:  </label>
                    <input type="text" value={user.lastname} />
                </div>
                <div className="info-item">
                    <label htmlFor="Firstname">Email:  </label>
                    <input type="email" value={user.email} />
                </div>
            </div>
        </div>
    )
}

export default Profile
