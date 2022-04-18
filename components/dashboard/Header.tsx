import headerStyles from "../../styles/header.module.css"
import Link from "next/link"
 
export default function Header(props: {name: string}) {
    return (
        <div className="position-fixed bg-primary shadow h-100 text-white p-2 d-none d-md-block">
            <header>
                <p className="text-center">{props.name}&apos;s dashboard</p>
            </header>
            <nav className={`${headerStyles.header} text-white d-md-flex flex-md-column align-items-center gap-2 w-15`}>
                <ul className="list-group w-100">
                    <li className="list-group-item text-center bg-primary border-0 w-100"><Link href="/">
                        <a className="w-100"><img src='/assets/images/icons/chart-line.svg' alt="line graph" style={{width: "3rem"}}/></a>
                    </Link></li>

                </ul>
                
                {/* <FontAwesomeIcon className={`${headerStyles.focus} text-primary w-100`} icon={faChartLine}/> */}
                {/* <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faChartPie}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faNewspaper}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faGear}/> */}
            </nav>
        </div>
    )
}