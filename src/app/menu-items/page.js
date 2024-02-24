"use client"
import { useProfile } from "@/components/UseProfile"
import UserTabs from "@/components/layout/UserTabs"
import { redirect } from "next/navigation";
import { Bars } from "react-loader-spinner";

const MenuItemsPage = () => {
    const {loading, data} =  useProfile();

    if(data && !data.admin){
        redirect("/")
    }
  return (
    <>
        {
            loading===true ? 
                <Bars
                    height="40"
                    width="40"
                    color="#f13a01"
                    ariaLabel="bars-loading"
                    wrapperStyle={{justifyContent:"center",alignItems:"center", height:"80vh"}}    
                    wrapperClass=""
                    visible={true}
                />
            :(
                <section className="mt-8 max-w-md mx-auto">
                    <UserTabs isAdmin={data.admin}/>
                    <form 
                        className="mt-8" 
                        // onSubmit={handleCategorySubmit}
                    >
                        <div className="flex items-start gap-4">
                            <div>
                                Image
                            </div>
                            <div className="grow">
                                <label>Item name</label>
                                <input 
                                    type="text"
                                    // value={}
                                    // onChange={}
                                />
                                <label>Description</label>
                                <input 
                                    type="text"
                                    // value={}
                                    // onChange={}
                                />
                                <label>Base Price</label>
                                <input 
                                    type="text"
                                    // value={}
                                    // onChange={}
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
                </section>
            
            )
        }
        
    </>
  )
}

export default MenuItemsPage