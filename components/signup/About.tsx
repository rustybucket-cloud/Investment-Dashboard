import 'bootstrap/dist/css/bootstrap.css';
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useState, useRef } from 'react';

export default function About(props: {next: () => void, userData: {fName: string, lName: string, age: string, experience: string}, changeData: (fName: string, lName: string, age: string, experience: string) => void}) {
    const [ error, setError ] = useState("")

    const fNameRef = useRef<HTMLInputElement>(null)
    const lNameRef = useRef<HTMLInputElement>(null)
    const ageRef = useRef<HTMLInputElement>(null)
    const experienceRef = useRef<HTMLSelectElement>(null)

    type experience = "beginner" | "intermediate" | "expert"

    const handleClick = () => {
        // type guard
        if (!fNameRef.current || !lNameRef.current || !ageRef.current || !experienceRef.current) return
        if (!fNameRef.current.value || !lNameRef.current.value || !ageRef.current.value || experienceRef.current.value === "select one") {
            setError("Please fill in all values.")
            return
        }
        // change userData
        props.changeData(fNameRef.current.value, lNameRef.current.value, ageRef.current.value, experienceRef.current.value)
        // switch to next page
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
                            <Form.Control ref={fNameRef}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="lname">
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control ref={lNameRef}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="age">
                            <Form.Label>Your Age</Form.Label>
                            <Form.Control ref={ageRef} type="number"></Form.Control>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>What is Your Investing Experience?</Form.Label>
                            <Form.Select ref={experienceRef}>
                                <option value="select one">Select One</option>
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