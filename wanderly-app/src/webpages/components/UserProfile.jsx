import React, { useState, useEffect } from 'react'

const UserProfile = () => {

    const [user, setUser] = useState({ name: "", profilePic: "" });
    console.log("user from localStorage", user)

    useEffect(() => {
            const storedUser = JSON.parse(localStorage.getItem("user"));
            console.log("storedUser:", storedUser)
            if (storedUser) {
                setUser(storedUser);
            }
        }, []);
    return (
        <div className='flex col-1 gap-2 items-center'>
            <div className='user-profile'>
            <img 
                    src={user.profilePic} 
                    width={50} 
                    height="auto" 
                    className='rounded-full' 
                    />
            <h2 className='mt-1'>Welcome {user.name}</h2>

    </div>
               {/* Adjusted margin */}
            </div>
  )
}

export default UserProfile