import Image from "next/image"
import { useContext, useState } from "react"
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile"
import { FaXmark } from "react-icons/fa6";

const MenuItem = (menuItem) => {
  const {image, name, description, basePrice, sizes, extraIngredients} = menuItem
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const {addToCart} = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = () =>{
  
      if(sizes.length===0 && extraIngredients.length===0){
        toast.success("Added to cart")
        addToCart(menuItem)
      }else{
        setShowPopup(true)
      }
    }

    const handleExtrasSelected = (e) =>{
     console.log(e)

    }
  return (
    <>
      {
        showPopup && (
          <div className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg max-w-md max-h-[90vh] overflow-auto relative">
            <FaXmark onClick={()=>setShowPopup(false)} size={20} className="absolute right-4"/>
              <Image className="mx-auto" src={image} alt={name} width={200} height={200}/>
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
              {
                sizes?.length>0 && (
                  <div className=" py-2">
                    <h3 className="text-gray-700 text-center text-md">Pick your size</h3>
                    {
                      sizes.map((size)=>(
                        <label className="flex p-3 border my-2 gap-3 items-center">
                          <input 
                            onClick={()=>selectedSize(size)}
                            checked={}
                            type="radio" 
                            name="size"/> 
                          <span>
                            {size.name} ${Number(basePrice)+Number(size.price)}
                          </span>
                        </label>
                      ))
                    }
                  </div>

                )
              }
              
              {
                extraIngredients?.length>0 && (
                  extraIngredients?.length>0 && (
                    <div className=" py-2">
                      <h3 className="text-gray-700 text-center text-md">Pick your size</h3>
                      {
                        extraIngredients.map((extraIngredient)=>(
                          <label className="flex p-3 border my-2 gap-3 items-center">
                            <input 
                              onClick={handleExtrasSelected}
                              type="checkbox" 
                              name="extraIngredient"/>
                              <span>
                                {extraIngredient.name} +${Number(extraIngredient.price)}
                              </span> 
                          </label>
                        ))
                      }
                    </div>
  
                  )
                )
              }
              <button type="button" className="submit w-full">Save</button>
            </div>
          </div>
        )
      }
      <MenuItemTile onAddToCart={handleAddToCart} {...menuItem}/>
    </>
  )
}

export default MenuItem