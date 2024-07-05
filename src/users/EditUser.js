import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function EditUser() {
    
    let navigate=useNavigate()

    const {id}=useParams()

    const[user,setUser]=useState({
        firstName:"",
        lastName:"",
        role:"",

    })

const{firstName,lastName,role}=user
console.log(user)

const onInputChange=(e)=>{

    setUser({...user,[e.target.name]:e.target.value})

}

useEffect(()=>
{
    laodUser()

},[])

const  onSubmit=async (e) =>{
    e.preventDefault();
    await axios.put(`http://localhost:8080/api/v1/update-user`,user)
    navigate("/");
    
};

const laodUser=async()=>
{
    const result= await axios.get(`http://localhost:8080/api/v1/fetch-userByid/${id}`)
    setUser(result.data)
    
}
  return (
    <div className='container'>
    <div className='row'>
    <div className='col-md-6 offset-md-3 border p-4 mt-2 shadow'>
    <h2 className='text-center m-4'> Edit User</h2>

    <form onSubmit={(e)=>onSubmit(e)}>

    <div className='mb-3'>
        <label htmlFor='Name' className='form-label'>
        First Name
        </label>
        <input  type={"text"} className='form-control' placeholder='Enter Your First Name'
            name='firstName' value={firstName} onChange={(e)=>onInputChange(e)}
        />
    </div>

    <div className='mb-3'>
        <label htmlFor='Name' className='form-label'>
       Last Name
        </label>
        <input  type={"text"} className='form-control' placeholder='Enter Your Last Name'
            name='lastName' value={lastName} onChange={(e)=>onInputChange(e)}

        />
    </div>
    <div className='mb-3'>
        <label htmlFor='Role' className='form-label'>
        Role
        </label>
        <input  type={"text"} className='form-control' placeholder='Enter Your Role'
            name='role' value={role} onChange={(e)=>onInputChange(e)}

        />
    </div>

    <button type='submit' className='btn btn-outline-primary'>
        Submit
    </button>

    <Link type='submit' className='btn btn-outline-danger mx-2' to="/">
        Cancel
    </Link>
</form>
    </div>


    </div>
      
    </div>
  )
}
