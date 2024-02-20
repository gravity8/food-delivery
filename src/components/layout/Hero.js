import Image from "next/image";
import Right from "../icons/Right";

export const Hero = () => {
  return (
    <section className="hero mt-10">
        <div className="py-12">
            <h1
            className="text-4xl font-bold leading-[50px]"
            >Everything <br />
            is better <br />
            with a&nbsp;
            <span className="text-primary ">Pizza</span> </h1>
            <p className="my-6 text-gray-500 text-sm">Pizza is the missing piece that makes everyday complete,
                a simple yet delicious joy in life
            </p>
            <div className="flex gap-5  ">
                <button
                 className=" animateArrow bg-primary uppercase items-center flex text-sm justify-between gap-2 text-white px-4 py-2 transition-transform duration-300 ease-in-out rounded-full "
                >Order now
                <Right className={"w-6 h-6 arrow"}/>
                </button>
                <button
                     className=" animateArrow flex gap-2 py-2 text-gray-600 font-semibold"
                >Learn more
                <Right className={"w-6 h-6 arrow"}/>
                </button>
            </div>
        </div>
        
        <div className="relative">
            <Image src={'/pizza.png'} layout={"fill"} objectFit={"contain"} alt={"pizza"} />
        </div>
        
    </section>
  )
}