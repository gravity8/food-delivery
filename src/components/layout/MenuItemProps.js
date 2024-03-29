

import { FaPlus } from "react-icons/fa6";
import { FaChevronDown } from "react-icons/fa6";
import { FaChevronUp } from "react-icons/fa6";

import DeleteButton from "@/components/layout/DeleteButton"
import { useState } from "react";

const MenuItemProps = ({name, label, props, setProps}) => {

    const [isOpen, setIsOpen] = useState(false)

    const addProp = () =>{
        setProps(oldProps=>{
            return [...oldProps, {name:"", price:0}]
        })
        
    }
    const editProp = (e, index, prop)=> {
        const newValue = e.target.value
        setProps( prevSizes =>{
            const newSizes = [...prevSizes];
            newSizes[index][prop] = newValue;
            return newSizes
        })
    }
  return (
    <div className="bg-gray-200 p-2 rounded-md mb-2">
        <button
            type="button"
            onClick={()=>setIsOpen(!isOpen)}
            className=" w-full flex p-1 justify-between items-center gap-2">
                <div className="flex items-center ">
                     <span>{name}</span>
                     <span>({props.length})</span>
                </div>
           
            {
                isOpen ? <FaChevronDown /> : <FaChevronUp />
            }
        </button>

        { isOpen && <div>
            <div>
                {
                    (props.length>0) && props.map((size, index)=>(
                        <div key={index} className="flex gap-2 items-center">
                            <div>
                                <label>Name</label>
                                    <input 
                                    className="text-sm"
                                    type="text" 
                                    placeholder={`${name} name`}
                                    value={size.name}
                                    onChange={e => editProp(e, index, "name")}
                                />
                            </div>
                            <div>
                                <label >Extra price</label>
                                <input 
                                    className="text-sm" 
                                    type="text" 
                                    placeholder="Extra price" 
                                    value={size.price}
                                    onChange={e=> editProp(e, index, "price")}
                                />
                            </div>
                            <DeleteButton onClick={()=>{setProps(prev=>prev.filter((v,i)=>i!==index))}}/>
                        </div>
                    ))
                }
            </div>
            <button 
            onClick={addProp}
            type="button"
            className="bg-white button flex items-center ">
                <FaPlus />
                Add item {label}
            </button>
        </div>}
    </div>
  )
}

export default MenuItemProps