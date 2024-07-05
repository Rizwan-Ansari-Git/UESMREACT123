import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';

export default function Home() {
  const [users, setUsers] = useState([]);
  const [users2, setUsers2] = useState([]);
  const { id } = useParams();

  useEffect(() => {
    loadUsers();
    loadUsers2();
  }, []);

  const loadUsers = async () => {
    try {
      const result = await axios.get('http://192.168.0.111:8080/api/v1/fetch-user');
      setUsers(result.data);
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const loadUsers2 = async () => {
    try {
      const result2 = await axios.get('http://192.168.0.111:8080/api/v2/fetch-user');
      setUsers2(result2.data);
      console.log('RESULT:', result2.data);
    } catch (error) {
      console.error('Error fetching users2:', error);
    }
  };

  return (
    <div className='container'>
      <div className='py-4'>
        <table className="table border">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">First Name</th>
              <th scope="col">Last Name</th>
              <th scope="col">Role</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={user.id}>
                <th scope="row">{index + 1}</th>
                <td>{user.firstName}</td>
                <td>{user.lastName}</td>
                <td>{user.role}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewuser/${user.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user.id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <table className="table border shadow">
          <thead>
            <tr>
              <th scope="col">Sr No</th>
              <th scope="col">Name</th>
              <th scope="col">Standard</th>
              <th scope="col">School Name</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users2.map((user2, index) => (
              <tr key={user2.id}>
                <th scope="row">{index + 1}</th>
                <td>{user2.name}</td>
                <td>{user2.standard}</td>
                <td>{user2.schoolName}</td>
                <td>
                  <Link className="btn btn-primary mx-2" to={`/viewuser/${user2.id}`}>
                    View
                  </Link>
                  <Link className="btn btn-outline-primary mx-2" to={`/edituser/${user2.id}`}>
                    Edit
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
