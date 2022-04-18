import { Card, Form, Button, Alert } from "react-bootstrap"
import style from "./style.module.scss"
import { RefObject, MouseEventHandler } from "react"

interface Props {
    add: MouseEventHandler<HTMLButtonElement>,
    onClick: MouseEventHandler<HTMLButtonElement>,
    onChange: () => void,
    error: string,
    sharesRef: RefObject<HTMLInputElement>,
    symbolRef: RefObject<HTMLInputElement>,
    suggestions: { name: string, symbol: string }[]
}

export function AddInvestmentFormPresentation({ onClick, onChange, add, error, sharesRef, symbolRef, suggestions } : Props) {
    return (
        <div className="col-12 position-fixed d-grid fixed-top" style={{height: "100vh", backgroundColor: "rgba(0,0,0,.5)"}}>
            <Card /* className="w-100 m-auto" */ className={style.card} style={{maxWidth: "40rem"}}>
                <Card.Header className="bg-primary text-white h3 d-flex justify-content-between">
                    Add Investment
                    <button onClick={onClick} className="text-white" style={{background: "none", border: "none"}}>X</button>
                </Card.Header>
                <Card.Body>
                    { error && <Alert variant="danger" className="text-red">{error}</Alert> }
                    <Form>
                        <Form.Group controlId="symbol">
                            <Form.Label>Stock Symbol</Form.Label>
                            <Form.Control ref={symbolRef} onChange={onChange}></Form.Control>
                        </Form.Group>
                        <div className={style.searchResults}>
                            { suggestions && suggestions.map((result: { name: string, symbol: string }, i: number) => {
                                return <button key={i} className={`${style.searchResult} col-12 border-0 bg-white`} style={{fontSize: "12px"}}>{result.name} ({result.symbol})</button>
                            })}
                        </div>
                        <Form.Group controlId="shares">
                            <Form.Label>Shares Owned</Form.Label>
                            <Form.Control ref={sharesRef}></Form.Control>
                        </Form.Group>
                        <Button onClick={add} className="mt-2 text-white">ADD INVESTMENT</Button>
                    </Form>
                </Card.Body>
            </Card>
        </div>
    )
}