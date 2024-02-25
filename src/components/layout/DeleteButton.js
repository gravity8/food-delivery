
import { FaTrash } from "react-icons/fa6"
const DeleteButton = ({onClick}) => {
  return (
    <div className="h-5 flex items-center mt-3 hover:scale-105 transition-all">
        <button 
            onClick={onClick}
            type="button" 
            className="bg-white h-9 w-9 rounded-lg flex items-center justify-center">
            <FaTrash className="hover:text-red-500 transition-all"/>  
        </button>
    </div>
  )
}

export default DeleteButton