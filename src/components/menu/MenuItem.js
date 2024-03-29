import Image from "next/image"
import { useContext, useState } from "react"
import { CartContext } from "../AppContext";
import toast from "react-hot-toast";
import MenuItemTile from "@/components/menu/MenuItemTile"
import { FaXmark } from "react-icons/fa6";
import FlyingButton from 'react-flying-item'


const MenuItem = (menuItem) => {
  const {image, name, description, basePrice, sizes, extraIngredients} = menuItem
    const [selectedSize, setSelectedSize] = useState(sizes?.[0] || null);
    const [selectedExtras, setSelectedExtras] = useState([]);
    const {addToCart} = useContext(CartContext);
    const [showPopup, setShowPopup] = useState(false);

    const handleAddToCart = async() =>{
  
      const hasOptions = sizes.length > 0 || extraIngredients.length > 0;
      if (hasOptions && !showPopup) {
        setShowPopup(true);
        return;
      }
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      addToCart(menuItem, selectedSize, selectedExtras);
      setShowPopup(false);
    }

    const handleExtrasSelected = (e, extraIngredient) =>{
     const checked = e.target.checked;
     if(checked){
      setSelectedExtras(prev =>[...prev, extraIngredient])
     }else{
      setSelectedExtras(prev=>{
       return prev.filter((a)=> a.name!==extraIngredient.name)
      })
     }

    }

    let selectedPrice = Number(basePrice);
    if (selectedSize) {
      selectedPrice = selectedPrice + Number(selectedSize.price);
      
    }
    if (selectedExtras?.length > 0) {
      for (const extra of selectedExtras) {
        selectedPrice += Number(extra.price);
      }
    }
  
  return (
    <>
      {
        showPopup && (
          <div 
            onClick={()=>setShowPopup(false)}
          className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center">
            <div 
              onClick={(e)=>e.stopPropagation()}
              className="bg-white p-4 rounded-lg max-w-md max-h-[90vh] min-w-[400px] overflow-auto relative">
              <div className="w-full flex justify-end sticky top-2 ">
                <FaXmark onClick={()=>setShowPopup(false)} size={20} />
              </div>
              
              <Image className="mx-auto" src={image} alt={name} width={200} height={200}/>
              <h2 className="text-lg font-bold text-center mb-2">{name}</h2>
              <p className="text-center text-gray-500 text-sm mb-2">{description}</p>
              {
                sizes?.length>0 && (
                  <div className=" py-2">
                    <h3 className="text-gray-700 text-center text-md">Pick your size</h3>
                    {
                      sizes.map((size,index)=>(
                        <label key={index} className="flex p-3 border my-2 gap-3 items-center">
                          <input 
                            onClick={()=>setSelectedSize(size)}
                            checked={selectedSize?.name===size.name}
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
                      <h3 className="text-gray-700 text-center text-md">Pick extra ingredients</h3>
                      {
                        extraIngredients.map((extraIngredient,index)=>(
                          <label key={index} className="flex p-3 border my-2 gap-3 items-center">
                            <input 
                              onClick={e=>handleExtrasSelected(e,extraIngredient)}
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
              <div className="flying-button-parent w-full rounded-full mt-4">
                <FlyingButton
                  targetTop={'5%'}
                  targetLeft={'90%'}
                  src={image}
                  >
                  <div onClick={handleAddToCart}>
                    Add to Cart ${selectedPrice}
                  </div>
                </FlyingButton>
              </div>
            </div>
          </div>
        )
      }
      <MenuItemTile onAddToCart={handleAddToCart} {...menuItem}/>
    </>
  )
}

export default MenuItem