import { AddInvestmentFormPresentation } from "./Presentation";
import { useRef, useState, MouseEvent } from "react"
import { addInvestment, auth } from "../../firebase/clientApp"
import {  useAuthState } from "react-firebase-hooks/auth"

export function AddInvestmentForm({onClick} : { onClick: () => void}) {
    const [error, setError] = useState("")
    const [ suggestions, setSuggestions ] = useState([])
    const [ stock, setStock ] = useState("")

    const [ user ] = useAuthState(auth)

    const symbolRef = useRef<HTMLInputElement>(null)
    const sharesRef = useRef<HTMLInputElement>(null)

    const add = async (e: MouseEvent) => {
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

    return <AddInvestmentFormPresentation onClick={onClick} add={add} onChange={handleChange} error={error} sharesRef={sharesRef} symbolRef={symbolRef} suggestions={suggestions} />
}