import React from 'react'
import { useParams } from 'react-router'
import { useGetUserDetailsQuery } from '../services';

const UserDetails = () => {
    const { userId } = useParams();

    // Only fetch if userId is defined
    const { data: userData, error, isLoading } = useGetUserDetailsQuery(userId ?? '');

    if (!userId) return <div className='container'>Invalid user ID</div>;
    if(isLoading) return <div className='container'>Loading...</div>
    if(error) return <div className='container'>Error</div>

    return (
        <div>
            <ul>
                <li>{userData?.name}</li>
                <li>{userData?.username}</li>
                <li>{userData?.email}</li>
                <li>{userData?.address.street}</li>
                <li>{userData?.address.suite}</li>
                <li>{userData?.address.city}</li>
                <li>{userData?.address.zipcode}</li>
                <li>{userData?.address.geo.lat}</li>
                <li>{userData?.address.geo.lng}</li>
                <li>{userData?.phone}</li>
                <li>{userData?.website}</li>
                <li>{userData?.company.name}</li>
                <li>{userData?.company.catchPhrase}</li>
                <li>{userData?.company.bs}</li>
            </ul>
        </div>
    )
}

export default UserDetails