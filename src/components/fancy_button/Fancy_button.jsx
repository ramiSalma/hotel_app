import { Link } from "react-router-dom"
import './Fancy_button.css'
export const Fancy_button = ({text , ref})=>{
    return (
        <div>
            <Link
             ref={ref}
            to=''
            className="fancy-btn  transition-all duration-1000"
          >
            <span>{text}</span>
            <i></i>
          </Link>
        </div>
    )
}