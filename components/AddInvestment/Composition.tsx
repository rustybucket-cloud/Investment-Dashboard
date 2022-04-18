import { AddInvestmentFormPresentation } from "./Presentation";
import { useRef, useState, MouseEvent, useEffect, ChangeEventHandler } from "react"
import { addInvestment, auth } from "../../firebase/clientApp"
import {  useAuthState } from "react-firebase-hooks/auth"

export function AddInvestmentForm({onClick} : { onClick: () => void}) {
    const [error, setError] = useState("")
    const [ suggestions, setSuggestions ] = useState([])
    const [ search, setSearch ] = useState("")

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

    const setValue = (e : MouseEvent) => {
        e.preventDefault()
        const button = e.currentTarget
        const symbol = button.getAttribute("data-symbol")
        const name = button.getAttribute("data-name")
        setSearch(`${name} (${symbol})`)
    }

    useEffect(() => {
        fetch(`/api/investmentsearch/${search}`)
            .then(req => req.json())
            .then(data => setSuggestions(data))
            .catch(err => console.error(err))
    }, [search])

    const handleChange = (e : React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.currentTarget.value)
    }

    return <AddInvestmentFormPresentation search={search} onClick={onClick} add={add} onChange={handleChange} error={error} sharesRef={sharesRef} symbolRef={symbolRef} suggestions={suggestions} />
}