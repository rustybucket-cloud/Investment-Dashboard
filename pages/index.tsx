import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'
import { useEffect, useState, useCallback } from 'react'
import Router from 'next/router'
import { auth, logOut, getUserData, getUserInvestments } from "../firebase/clientApp"
import { useAuthState } from "react-firebase-hooks/auth"
import { Button } from 'react-bootstrap'
import { DocumentData } from 'firebase/firestore'
import dashboardStyles from "../styles/dashboard.module.css"
import Header from "../components/dashboard/Header"
import StockCard from "../components/dashboard/StockCard"
import { AddInvestmentForm } from "../components/AddInvestment/Composition"

type userData = {
  age: string
  experience: string
  fName: string
  lName: string
  savingFor: string[]
  user: string
}

const Home: NextPage = () => {
  const [user, loading, error] = useAuthState(auth)
  const [ stocks, setStocks ] = useState<string[] | null>(null)
  const [ userData, setUserData ] = useState<DocumentData>()
  const [ isAddInvestmentOpen, setIsAddInvestmentOpen ] = useState(false)

  useEffect(() => {
    user || Router.push("/login")
  }, [user])

  const fetchUserData = useCallback(
    async () => {
      try {
        if (!user || typeof user.email !== "string") return
        const result = await getUserData(user.email)
        const userStocks = await getUserInvestments(user.email)
        setUserData(result)
        setStocks(userStocks?.stocks)
      }
      catch {
        return
      }
    },
    [],
  )

  useEffect(() => {
    fetchUserData()
    .catch(err => console.error(err))
  }, [fetchUserData])

  const handleClick = async () => {
    await logOut()
  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header name="Jacob"/>
      <main className={`${dashboardStyles.dashboard} gap-4 px-3`}>
          <h1 className="text-primary">My Stocks</h1>
          { isAddInvestmentOpen && <AddInvestmentForm onClick={() => setIsAddInvestmentOpen(false)}/> }
          <section>
              <div className="d-flex justify-content-between">
                  <h2>Stocks</h2>
                  <button onClick={() => setIsAddInvestmentOpen(true)} className="rounded h6 bg-primary text-white btn">ADD INVESTMENT</button>  
              </div>
              <div className="d-flex" style={{overflowX: "auto"}}>
                { stocks && stocks.map((stock : string, i: number) => <StockCard key={i} name={stock} symbol={stock} />) }
              </div>
          </section>
          <section>
              <h2>Bonds</h2>
              <div className="d-flex" style={{overflowX: "auto"}}>
                   
              </div>
          </section>
          <section>
              <h2>Crypto</h2>
              <div className="d-flex" style={{overflowX: "auto"}}>
                  
              </div>
          </section> 
      </main>
    </>
  )
}
export default Home