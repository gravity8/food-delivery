
import AddToCartButton from "@/components/layout/AddToCartButton"

const MenuItemTile = ({onAddToCart, ...item}) => {

    const {image, name, description, basePrice, sizes, extraIngredients} = item;

    const hasSizesOrExtras = sizes.length > 0 || extraIngredients.length > 0;

  return (
    <div className="relative group bg-gray-200 p-4 rounded-lg hover:scale-y-105 duration-200 text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all cursor-pointer">
        <img src={image} className={"max-h-auto max-h-24 block mx-auto"} alt={"pizza"} />
        <h4 className=" font-semibold my-3 text-lg">{name}</h4>
        <p className="text-gray-500 tezt-sm line-clamp-3 ">{description}</p>
        <AddToCartButton 
            hasSizesOrExtras = {hasSizesOrExtras}
            onClick={onAddToCart}
            basePrice={basePrice}
            image={image}
        />
    </div> 
  )
}

export default MenuItemTile