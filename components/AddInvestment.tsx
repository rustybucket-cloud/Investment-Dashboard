import "../assets/images/x.svg"
import { Card, Form, Button, Alert } from "react-bootstrap"
import { useRef, useState, MouseEvent } from "react"
import { addInvestment, auth } from "../firebase/clientApp"
import {  useAuthState } from "react-firebase-hooks/auth"
import dashboardStyles from "../styles/dashboard.module.css"

export default function AddInvestment({onClick} : { onClick: () => void}) {
    const [error, setError] = useState("")
    const [ suggestions, setSuggestions ] = useState(null)

    const [ user ] = useAuthState(auth)

    const symbolRef = useRef<HTMLInputElement>(null)
    const sharesRef = useRef<HTMLInputElement>(null)

    const handleClick = async (e: MouseEvent) => {
        e.preventDefault()
        const symbol = symbolRef.current?.value;
        let sharesInput = sharesRef.current?.value;
        if (!symbol || !sharesInput) {
            setError("Please Enter a stock symbol and number of shares owned")
            return
        }
        if (!user) {
            setError("There was an error. Try logging out and back in")
            return
        }
        const shares = parseFloat(sharesInput)
        await addInvestment(user.email, symbol, shares)
    }

    const handleChange = async () => {
        const search = symbolRef.current?.value
        const req = await fetch(`/api/investmentsearch/${search}`)
        const data = await req.json()
        setSuggestions(data)
    }

    return (
        <div className="col-12 position-fixed d-grid fixed-top" style={{height: "100vh", backgroundColor: "rgba(0,0,0,.5)"}}>
            <Card className="w-100 m-auto" style={{maxWidth: "40rem"}}>
                <Card.Header className="bg-primary text-white h3 d-flex justify-content-between">
                    Add Investment
                    <button onClick={onClick} className="text-white" style={{background: "none", border: "none"}}>X</button>
                </Card.Header>
                <Card.Body>
                    { error && <Alert variant="danger" className="text-red">{error}</Alert> }
                    <Form>
                        <Form.Group controlId="symbol">
                            <Form.Label>Stock Symbol</Form.Label>
                            <Form.Control ref={symbolRef} onChange={handleChange}></Form.Control>
                        </Form.Group>
                        { suggestions && suggestions.map(result => {
                            return <button className={`${dashboardStyles.searchResult} col-12 border-0 bg-white`} style={{fontSize: "12px"}}>{result.name} ({result.symbol})</button>
                        })}
                        <Form.Group controlId="shares">
                            <Form.Label>Shares Owned</Form.Label>
                            <Form.Control ref={sharesRef}></Form.Control>
                        </Form.Group>
                        <Button onClick={handleClick} className="mt-2">ADD INVESTMENT</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}