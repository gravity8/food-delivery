import Image from "next/image"
const MenuItem = () => {
  return (
            <div className="relative group bg-gray-200 p-4 rounded-lg hover:scale-y-105 duration-200 text-center hover:bg-white hover:shadow-md hover:shadow-black/25 transition-all cursor-pointer">
                <img src={"/pizza.png"} className={"max-h-auto max-h-24 block mx-auto"} alt={"pizza"} />
                <h4 className=" font-semibold my-3 text-xl">Pepperoni Pizza</h4>
                <p className="text-gray-500 tezt-sm ">Lorem ipsum dolor sit amet consectetur adipisicing elit.</p>
                <button
                className="bg-primary transition-all text-white rounded-full px-8 py-2 my-3 "
                >Add to cart $12</button>
            </div> 
  )
}

export default MenuItem