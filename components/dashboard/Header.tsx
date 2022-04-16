import headerStyles from "../../styles/header.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faChartPie, faNewspaper, faChartLine } from "@fortawesome/free-solid-svg-icons"
 
export default function Header(props: {name: string}) {
    return (
        <div className="position-fixed bg-primary shadow h-100 text-white p-2 d-none d-md-block">
            <header>
                <p className="text-center">{props.name}'s dashboard</p>
            </header>
            <nav className={`${headerStyles.header} text-white d-md-flex flex-md-column align-items-center gap-2`}>
                <FontAwesomeIcon className={`${headerStyles.focus} text-primary w-100`} icon={faChartLine}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faChartPie}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faNewspaper}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faGear}/>
            </nav>
        </div>
    )
}