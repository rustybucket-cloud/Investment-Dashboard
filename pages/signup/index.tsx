import 'bootstrap/dist/css/bootstrap.css';
import { Form, Card, Button, Alert } from "react-bootstrap";
import { useEffect, useRef, useState } from 'react';
import Router from 'next/router';
import { auth, signUpUser } from '../../firebase/clientApp';
import { useAuthState } from 'react-firebase-hooks/auth';
import About from '../../components/signup/About';
import SavingFor from '../../components/signup/SavingFor';

export default function login() {
    const [ loginError, setLoginError ] = useState("")
    const [ page, setPage ] = useState(2)

    const emailRef = useRef<HTMLInputElement>(null)
    const passwordRef = useRef<HTMLInputElement>(null)
    const confirmPasswordRef = useRef<HTMLInputElement>(null)

    const [ user, loading, error ] = useAuthState(auth)

    // redirect to home page if user is logged in
    useEffect( () => {
        user && Router.push("/")
    }, [])

    // sign up user
    const handleSubmit = async (e: any) => {
        e.preventDefault()

        if (!emailRef.current || !passwordRef.current || !confirmPasswordRef.current)  return
        if (passwordRef.current.value !== confirmPasswordRef.current.value) return

        try {
           await signUpUser(emailRef.current.value, passwordRef.current.value)
        }
        catch (err) {
            setLoginError("Unable to Create Account. Try again.")
            console.error(err)
            return
        }
        finally {
            setPage(1) 
        }
    }

    // change page
    const nextPage = (): void => setPage(page => page + 1)
    const prevPage = (): void => setPage(page => page - 1)

    if (page === 0) {
        return (
            <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:"100vh"}}>
                <h1>My Investment Dashboard</h1>
                <Card className="col-6" style={{maxWidth: "32rem", backgroundColor: "#DAE4EE"}}>
                    <Card.Header className="bg-primary text-white">Sign Up</Card.Header>
                    <Card.Body>
                    {loginError && <Alert>{loginError}</Alert>}
                        <Form>
                            <Form.Group controlId="email">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" ref={emailRef}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="password">
                                <Form.Label>Password</Form.Label>
                                <Form.Control type="password" ref={passwordRef}></Form.Control>
                            </Form.Group>
                            <Form.Group controlId="confirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control type="password" ref={confirmPasswordRef}></Form.Control>
                            </Form.Group>
                            <Button className="col-12 mt-2" onClick={handleSubmit}>Sign Up</Button>
                        </Form>
                        <p className="mt-1 mb-1">Already have an account? <a href="/login">Login here.</a></p>
                        <p className="mb-0">Forgot username or password?</p>
                    </Card.Body>
                </Card>
            </div>
        )
    }
    else if (page === 1) return <About next={nextPage}/>
    else if (page === 2) return <SavingFor prev={prevPage} next={nextPage}/>
    else return null
}