import React from 'react'
import style from './Footer.module.css'

export default function Footer() {
  return <>
    <section className=' bg-dark fixed-bottom text-white p-3 footer py-1'>
       <p className='mb-1'>Get The FreshCart App</p>
       <div className="d-flex row align align-items-center">
       <p className='fw-sm mb-0 col-md-5'>We wish you Like our services</p>
       <p className=' my-0 copy col-md-6'>© 2024 basma-adel , All Rights Reserved</p>
       </div>
    </section>
  </>
}
