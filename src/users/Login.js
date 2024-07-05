import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

export default function Login() {
    let navigate = useNavigate()

    const [user, setUser] = useState({
        firstName: "",
        password: "",
      
    })



    const [errors, setErrors] = useState({})

    const { firstName, password } = user

  

    const validateForm = () => {
        let errors = {}
        let isValid = true

        if (!firstName) {
            errors.firstName = "Username is required"
            isValid = false
        }

        if (!password) {
            errors.password = "Password is required"
            isValid = false
        }



        setErrors(errors)
        return isValid
    }

    const onInputChange = (e) => {
        setUser({ ...user, [e.target.name]: e.target.value })
    }
console.log("user"+user)
    const onSubmit = async (e) => {
      
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'> Login User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                User Name
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter User Name'
                                name='firstName' value={firstName} onChange={(e) => onInputChange(e)}
                            />
                            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Password
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter Password Name'
                                name='password' value={password} onChange={(e) => onInputChange(e)}
                            />
                            {errors.password && <div className="text-danger">{errors.password}</div>}
                        </div>
                       

                        <button type='submit' className='btn btn-outline-primary'>
                            Submit
                        </button>

                        <button type='submit' className='btn btn-outline-danger mx-2' to="/">
                            Reset
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}
