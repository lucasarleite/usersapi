import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Container, Table, Form, Button } from 'react-bootstrap';

const App = () => {

  const [users, setUsers] = useState([]);
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);

  const getUsers = () => {
    axios.get('http://localhost:5000/users')
      .then((res) => {
        setUsers(res.data);
      });
  }

  const createUser = () => {
    const newUser = {
      email,
      givenName: firstName,
      familyName: lastName
    }
    axios.post('http://localhost:5000/users', newUser)
      .then((res) => {
        getUsers();
      });
  }

  const updateUser = () => {
    const newUser = {
      email,
      givenName: firstName,
      familyName: lastName
    }
    axios.patch(`http://localhost:5000/users/${selectedUser}`, newUser)
      .then((res) => {
        setSelectedUser(null);
        setFirstName('');
        setLastName('');
        setEmail('');
        getUsers();
      });
  }

  const deleteUser = (id) => {
    axios.delete(`http://localhost:5000/users/${id}`)
    .then((res) => {
      getUsers();
    });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (firstName === '' || lastName === '' || email === '') {
      return
    }
    if (selectedUser) {
      updateUser();
    } else {
      createUser();
    }
  }

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  }

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  }

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  }

  const handleEditClick = (user) => {
    setSelectedUser(user._id);
    setFirstName(user.givenName);
    setLastName(user.familyName);
    setEmail(user.email);
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <Container>

      <Table>
        <thead>
          <tr>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => {
            return (
              <tr key={user._id}>
                <td>{user.givenName}</td>
                <td>{user.familyName}</td>
                <td>{user.email}</td>
                <td>
                  <Button variant="primary" type="button" onClick={ () => handleEditClick(user) }>
                    Edit
                  </Button>
                  <Button variant="danger" type="button" onClick={ () => deleteUser(user._id) }>
                    Delete
                  </Button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Form onSubmit={handleSubmit}>
        <Form.Group>
          <Form.Label>First Name</Form.Label>
          <Form.Control value={firstName} name="firstName" type="text" placeholder="Enter email" onChange={handleFirstNameChange} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Last Name</Form.Label>
          <Form.Control value={lastName} name="lastName" type="text" placeholder="Enter email" onChange={handleLastNameChange} />
        </Form.Group>
        <br />
        <Form.Group>
          <Form.Label>Email address</Form.Label>
          <Form.Control value={email} name="email" type="email" placeholder="Enter email" onChange={handleEmailChange} />
        </Form.Group>
        <br />
        <Button variant="primary" type="submit">
          Submit
        </Button>
      </Form>

    </Container>
  );
}

export default App;
