import Image from "next/image"
import MenuItem from "../menu/MenuItem"
import Sectionheaders from "./Sectionheaders"

const HomeMenu = () => {
  return (
    <section className="">
        <div className="absolute left-0 group right-0  w-full">
            <div className="h-48 w-48 absolute -left-0 -top-[70px] -z-10">
                <Image src={"/sallad1.png"} height={189} width={109}></Image>
            </div>
            <div className="h-48 absolute -top-[100px] right-0 -z-10">
                <Image src={"/sallad2.png"} height={195} width={107}></Image>
            </div>
        </div>
        <div className="text-center mb-4">
            <Sectionheaders subHeader={"Check out"} mainHeader={"Menu"} />
        </div>
        <div className="grid grid-cols-3 gap-4">
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
            <MenuItem />
        </div>
        
    </section >
  )
}

export default HomeMenu