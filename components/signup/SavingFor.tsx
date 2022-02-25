import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import { Form, Card, Button, Alert, InputGroup, FormControl } from "react-bootstrap";

export default function SavingFor(props: {prev: () => void, next: () => void}) {

    // changes pages based on button pressed
    const handleClick = ({currentTarget}: React.MouseEvent<HTMLButtonElement>) => {
        currentTarget.classList.contains("next") ? props.next() : props.prev()
    }

    return (
        <div className="d-flex flex-column justify-content-center align-items-center" style={{minHeight:"100vh"}}>
            <h1>Build Your Investment Pie</h1>
            <Card className="col-11" style={{maxWidth: "44rem", backgroundColor: "#DAE4EE"}}>
                <Card.Header className="bg-primary text-white">What are you saving for?</Card.Header>
                <Card.Body>
                    <Form className="container p-0">
                        <div className="row pr-0">
                            <div className="col-12 col-sm-6">
                                <InputGroup>
                                    <InputGroup.Text className="col-9">Retirement</InputGroup.Text>
                                    <InputGroup.Checkbox value="retirement" />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text className="col-9">Education</InputGroup.Text>
                                    <InputGroup.Checkbox value="education" />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text className="col-9">Business</InputGroup.Text>
                                    <InputGroup.Checkbox value="business" />
                                </InputGroup>
                            </div>
                            <div className="col-12 col-sm-6">
                                <InputGroup>
                                    <InputGroup.Text className="col-9">Vacation</InputGroup.Text>
                                    <InputGroup.Checkbox value="vacation" />
                                </InputGroup>
                                <InputGroup>
                                    <InputGroup.Text className="col-9">Wedding</InputGroup.Text>
                                    <InputGroup.Checkbox value="wedding" />
                                </InputGroup>
                            </div> 
                            <InputGroup className="col-6">
                                <InputGroup.Text className="col-4 col-md-2">Other</InputGroup.Text>
                                <FormControl className="col-8"/>
                                <InputGroup.Checkbox/>
                            </InputGroup>
                        </div>
                        <div className="col-12 d-flex justify-content-between flex-wrap flex-sm-row-reverse gap-1 mt-2">
                            <Button className="col-12 col-sm-4 next" onClick={handleClick}>Next</Button> 
                            <Button className="col-12 col-sm-4 bg-secondary prev" onClick={handleClick}>Previous</Button>
                        </div>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}