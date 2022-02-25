import 'bootstrap/dist/css/bootstrap.css';
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useState } from 'react';

export default function About(props: {next: () => void}) {
    const [ error, setError ] = useState("")

    const handleClick = () => {
        props.next()
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <h1>Tell Us About Yourself</h1>
            <Card className="col-11" style={{maxWidth: "44rem", backgroundColor: "#DAE4EE"}}>
                <Card.Header className="bg-primary text-white">Personal Info</Card.Header>
                <Card.Body>
                    {error && <Alert>{error}</Alert>}
                   <Form>
                        <Form.Group controlId="fname">
                            <Form.Label>First Name</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="age">
                            <Form.Label>Your Age</Form.Label>
                            <Form.Control type="number"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>What is Your Investing Experience?</Form.Label>
                            <Form.Select>
                                <option>Select One</option>
                                <option value="beginner">Beginner</option>
                                <option value="intermediate">Intermediate</option>
                                <option value="expert">Expert</option>
                            </Form.Select>
                        </Form.Group>
                        <Button className="mt-2 col-12 col-sm-6" onClick={handleClick} type="button">Next</Button>
                    </Form> 
                </Card.Body>
            </Card>
        </div>
    )
}