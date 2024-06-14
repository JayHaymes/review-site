import React from 'react'
import { Link } from 'react-router-dom'
import UpdateRestaurant from '../components/UpdateRestaurant'

const UpdatePage = () => {
  return (
    <div>
      <div className="mt-4">
        <Link to="/" className="btn btn-primary">
          Home
        </Link>
      </div>
        <h1 className='text-center'>Update Restaurant</h1>
        <UpdateRestaurant/>
    </div>
  )
}

export default UpdatePage