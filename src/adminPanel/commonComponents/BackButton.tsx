import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
const BackWard = ({link}:Record<string,any>)=>{

    const navigate = useNavigate();
    return (<>
    <button className="p-3 text-black text-2xl" onClick={()=> navigate(link)}>
    <FontAwesomeIcon icon={faArrowLeft} />
    </button>
    </>)
}

export default BackWard;