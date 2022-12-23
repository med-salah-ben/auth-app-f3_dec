import React , {useState} from 'react';
import { Modal,Button , Form } from 'react-bootstrap';
import {useDispatch} from "react-redux";
import {loginUser} from "../JS/actions/authActions";
import { useNavigate } from "react-router-dom";


const Login = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [show, setShow] = useState(false);

    const [email , setEmail] =useState("");
    const [password , setPassword] =useState("");

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleLogin = ()=>{
        const userLogin = { email , password}
        dispatch(loginUser(userLogin))
        navigate("/dashboard")
        setEmail("");
        setPassword('')
    } 

  
    return (
      <>
        <Button variant="primary" onClick={handleShow}>
          Login
        </Button>
  
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Login</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form>
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" name="email" value={email} onChange={(e)=>setEmail(e.target.value)} />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" name="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
    </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={()=>{handleLogin(); handleClose()}}>
              Login
            </Button>   
          </Modal.Footer>
        </Modal>
      </>
    );
}

export default Login