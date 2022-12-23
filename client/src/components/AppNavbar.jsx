import React from 'react'
import {Button, Container , Nav ,Navbar} from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { logoutUser } from '../JS/actions/authActions';
import Login from './Login';
import Register from './Register';

const AppNavbar = () => {
  const isAuth = useSelector(state=>state.authReducer.isAuth)
  const user = useSelector(state=>state.authReducer.user)

  const dispatch = useDispatch()

  const logout = ()=>{
    dispatch(logoutUser())
  }

  return (
    <Navbar bg="primary" variant="dark">
    <Container>
      <Navbar.Brand>Auth App</Navbar.Brand>
      <Nav className="me-auto">
      <Nav.Link><Link to="/" style={{color:"white",textDecoration:"none"}}> Home </Link></Nav.Link>
      {!isAuth ? (<></>):( <Nav.Link><Link style={{color:"white",textDecoration:"none"}} to="/dashboard">Dashboard </Link></Nav.Link>)}
     
      </Nav>
    </Container>
    {isAuth ? (
      <>
      <span> {user.name} </span>
      <Button onClick={logout} >Logout</Button>
      </>
    ):(<>
      <Login />
      <Register />
    </>
    )}
  </Navbar>
  )
}

export default AppNavbar