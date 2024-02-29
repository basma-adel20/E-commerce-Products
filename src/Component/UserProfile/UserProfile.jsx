import React, { useContext, useEffect } from 'react'
import style from './UserProfile.module.css'
import about from '../../Assets/images/about.jpg'
import { UserContext } from '../../Context/UserContext';


export default function UserProfile() {

  let { name, setName , email, setEmail} = useContext(UserContext);
  useEffect(() => {
    // Check if userName exists in localStorage and update context if present
    if (localStorage.getItem('userName')) {
      setName(localStorage.getItem('userName'));
    }
  }, []); // Empty dependency array ensures useEffect only runs once after initial render

  
  return <>
  <div className="background-user">

  </div>
  
  <div className="wrapper">
  <div className="profile-card js-profile-card">
    <div className="profile-card__img">
      <img src={about} width={100} alt="profile card"/>
    </div>

    <div className="profile-card__cnt js-profile-cnt p-4">

      <p>Hello , </p>

      <div className="profile-card__name">{name}</div>
      <div className="profile-card__email mb-1">{email}</div>
      <div className="profile-card__txt">Front-end Developer from <strong>Egypt</strong></div>
      <div className="profile-card-loc">
        <span className="profile-card-loc__icon">
          <i className='fas fa-map-marker-alt me-2'></i>
        </span>

        <span className="profile-card-loc__txt">
          Egypt, cairo
        </span>

      </div>
    </div>
  </div>
</div>
  
  </>
}
