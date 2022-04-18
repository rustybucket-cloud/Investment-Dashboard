import headerStyles from "../../styles/header.module.scss"
import Link from "next/link"
 
export default function Header(props: {name: string}) {
    return (
        <div className={`${headerStyles.wrapper} bg-primary`} /* className="position-fixed bg-primary shadow h-100 text-white p-2 d-none d-md-block" */>
            <header>
                <p className="text-center text-white d-none d-md-block">{props.name}&apos;s dashboard</p>
            </header>
            <nav className={`${headerStyles.header} text-white d-flex flex-md-column align-items-center`}>
                <ul className="w-100 d-flex flex-md-column">
                    <li className="list-group-item text-center border-0 w-100"><Link href="/">
                        <a className="w-100" aria-label="investments"><img src='/assets/images/icons/chart-line.svg' alt="line graph" style={{width: "3rem"}}/></a>
                    </Link></li>
                    <li className="list-group-item text-center border-0 w-100"><Link href='/'>
                        <a className="w-100" aria-label="news"><img src="/assets/images/icons/newspaper.svg" alt="newspaper" style={{width: "3rem"}}/></a>
                    </Link></li>
                    <li className="list-group-item text-center border-0 w-100"><Link href='/'>
                        <a className="w-100" aria-label="my pie"><img src="/assets/images/icons/chart-pie.svg" alt="pie chart" style={{width: "3rem"}}/></a>
                    </Link></li>
                    <li className="list-group-item text-center border-0 w-100"><Link href='/'>
                        <a className="w-100" aria-label="settings"><img src="/assets/images/icons/gear.svg" alt="gear" style={{width: "3rem"}}/></a>
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