import { Form, Card, Button } from "react-bootstrap";
import { useEffect, useRef } from 'react';
import Router from 'next/router';
import Link from 'next/link';
import {  auth, loginUser } from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';

export default function Login() {
    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)

    const [ user, loading, error ] = useAuthState(auth)

    useEffect( () => {
        user && Router.push("/")
    })

    
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        // prevent type error
        if (!emailRef.current || !passwordRef.current) return
        // log user in
        try {
           await loginUser(emailRef.current.value, passwordRef.current.value)
        }
        catch (err) {
            console.error(err)
        }
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <h1>My Investment Dashboard</h1>
            <Card className="col-11" style={{maxWidth: "32rem", backgroundColor: "#DAE4EE"}}>
                <Card.Header className="bg-primary text-white">Login</Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group controlId="username">
                            <Form.Label>Email</Form.Label>
                            <Form.Control ref={emailRef}></Form.Control>
                        </Form.Group>
                        <Form.Group controlId="password">
                            <Form.Label>Password</Form.Label>
                            <Form.Control type="password" ref={passwordRef}></Form.Control>
                        </Form.Group>
                        <Button className="col-12 mt-2" onClick={handleSubmit}>Login</Button>
                    </Form>
                    <p className="mt-1 mb-1">Don&apos;t have an account? <Link href="/signup">Sign up here.</Link></p>
                    <p className="mb-0">Forgot username or password?</p>
                </Card.Body>
            </Card>
        </div>
    )
}