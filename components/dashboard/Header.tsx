import headerStyles from "../../styles/header.module.css"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faGear, faChartPie, faNewspaper, faChartLine } from "@fortawesome/free-solid-svg-icons"
 
export default function Header(props: {name: string}) {
    return (
        <div>
            <header className={`${headerStyles.header} bg-primary position-absolute text-white d-none d-md-flex flex-md-column align-items-center gap-2 p-2`}>
                <p className="text-center">{props.name}'s dashboard</p>
                <FontAwesomeIcon className={`${headerStyles.focus} text-primary w-100`} icon={faChartLine}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faChartPie}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faNewspaper}/>
                <FontAwesomeIcon className={`${headerStyles.icon} h2 p-2 w-100`} icon={faGear}/>
            </header>
        </div>
    )
}