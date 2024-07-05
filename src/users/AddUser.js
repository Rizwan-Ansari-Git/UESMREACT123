import axios from 'axios'
import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'


export default function AddUser() {
    let navigate = useNavigate()

    const [user, setUser] = useState({
        firstName: "",
        lastName: "",
        role: "",
    })

    const [errors, setErrors] = useState({})
console.log(user)
    const { firstName, lastName, role } = user

    const validateForm = () => {
        let errors = {}
        let isValid = true

        if (!firstName) {
            errors.firstName = "First name is required"
            isValid = false
        }

        if (!lastName) {
            errors.lastName = "Last name is required"
            isValid = false
        }

        if (!role) {
            errors.role = "Role is required"
            isValid = false
        }

        setErrors(errors)
        return isValid
    }

    const onInputChange = (e) => {
     
        setUser({ ...user, [e.target.name]: e.target.value })
    }


    const onSubmit = async (e) => {
        e.preventDefault()

        if (validateForm()) {
            await axios.post("http://localhost:8080/api/v1/create-user", user)
            navigate("/")
        }
    }

    return (
        <div className='container'>
            <div className='row'>
                <div className='col-md-6 offset-md-3 border p-4 mt-2 shadow'>
                    <h2 className='text-center m-4'> Register User</h2>

                    <form onSubmit={(e) => onSubmit(e)}>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                First Name
                            </label>

                            <input type={"text"} className='form-control' placeholder='Enter Your First Name'
                                name='firstName' value={firstName} onChange={(e) => onInputChange(e)}
                            />
                            {errors.firstName && <div className="text-danger">{errors.firstName}</div>}
                        </div>

                        <div className='mb-3'>
                            <label htmlFor='Name' className='form-label'>
                                Last Name
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter Your Last Name'
                                name='lastName' value={lastName} onChange={(e) => onInputChange(e)}
                            />
                            {errors.lastName && <div className="text-danger">{errors.lastName}</div>}
                        </div>
                        <div className='mb-3'>
                            <label htmlFor='Role' className='form-label'>
                                Role
                            </label>
                            <input type={"text"} className='form-control' placeholder='Enter Your Role'
                                name='role' value={role} onChange={(e) => onInputChange(e)}
                            />
                            {errors.role && <div className="text-danger">{errors.role}</div>}
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
