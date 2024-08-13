import React from 'react'
import { Link } from 'react-router-dom'

function Navbara() {
  return (
    <div>
      <section>
     <div className='container'>
         <Link to="/">
         <h3>Workout Boddy</h3>
         </Link>
     </div>
     </section>
    </div>
  )
}

export default Navbara
