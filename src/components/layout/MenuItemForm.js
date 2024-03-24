
import { useEffect, useState } from "react";


import EditableImage from "@/components/layout/EditableImage";
import MenuItemProps from "@/components/layout/MenuItemProps"

const MenuItemForm = ({onSubmit, menuItem}) => {
    const [name, setName] = useState(menuItem?.name || "");
    const [description, setDescription] = useState(menuItem?.description || "");
    const [basePrice, setBasePrice] = useState(menuItem?.basePrice|| "");
    const [image, setImage] = useState(menuItem?.image||"");
    const [sizes, setSizes] = useState(menuItem?.sizes || [])
    const [extraIngredients, setExtraIngredients] = useState(menuItem?.extraIngredients || [])
    const [category, setCategory] = useState(menuItem?.category || '')
    const [categories, setCategories] = useState([])

    useEffect(()=>{
        fetch("/api/categories/").then(res=>{
        if(res.ok){
            res.json().then(allCategory=>{
                setCategories(allCategory)
            })
        }
        })
        
    },[])
  return (
    <form 
        className="mt-8" 
        onSubmit={e=>
            onSubmit(e,{name, description, basePrice, image, sizes, extraIngredients, category})}
    >
        <div 
        className="grid items-start gap-4"
        style={{gridTemplateColumns: ".3fr .7fr"}}
        >
            <div className="max-w-[200px]">
                <EditableImage link={image} setLink={setImage}/>
            </div>
            <div className="grow">
                <label>Item name</label>
                <input 
                    type="text"
                    value={name}
                    onChange={e=>setName(e.target.value)}
                />
                <label>Description</label>
                <input 
                    type="text"
                    value={description}
                    onChange={e=>setDescription(e.target.value)}
                />
                <label>Category</label>

                <select  value={category} onChange={e => setCategory(e.target.value)}>
                    <option value="">Select a category</option>
                    {categories?.length > 0 && categories.map(c => (
                    <option key={c._id} value={c._id}>{c.name}</option>
                    ))}
                </select>
                <label>Base Price</label>
                <input 
                    type="text"
                    value={basePrice}
                    onChange={e=>setBasePrice(e.target.value)}
                />
                <MenuItemProps 
                    name="Sizes" 
                    label={"size"} 
                    props={sizes} 
                    setProps={setSizes}
                />
                <MenuItemProps 
                    name="Extra Ingredients" 
                    label={"ingredient"} 
                    props={extraIngredients} 
                    setProps={setExtraIngredients}
                />
                <button
                    type="submit"
                    className="w-full"
                >
                    Save
                </button>
            </div>
        </div>
    </form>
  )
}

export default MenuItemForm