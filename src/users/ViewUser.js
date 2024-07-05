import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'

export default function ViewUser() {
    
console.log("ss")
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


const laodUser=async()=>
{
    const result= await axios.get(`http://localhost:8080/api/v1/fetch-userByid/${id}`)
    setUser(result.data)
}
  return (
    <div className='container'>
    <div className='row'>
    <div className='col-md-6 offset-md-3 border p-4 mt-2 shadow'>
    <h2 className='text-center m-4'> View User</h2>

    <form>

    <div className='mb-3'>
        <label htmlFor='Name' className='form-label'>
        First Name
        </label>
        <input  type={"text"} className='form-control' placeholder='Enter Your First Name'
            name='firstName' readOnly value={firstName} onChange={(e)=>onInputChange(e)}
        />
    </div>

    <div className='mb-3'>
        <label htmlFor='Name' className='form-label'>
       Last Name
        </label>
        <input  type={"text"} className='form-control' placeholder='Enter Your Last Name'
            name='lastName' readOnly  value={lastName} onChange={(e)=>onInputChange(e)}

        />
    </div>
    <div className='mb-3'>
        <label htmlFor='Role' className='form-label'>
        Role
        </label>
        <input  type={"text"} className='form-control' placeholder='Enter Your Role'
            name='role' readOnly value={role} onChange={(e)=>onInputChange(e)}

        />
    </div>


</form>
    </div>


    </div>
      
    </div>
  )
}
