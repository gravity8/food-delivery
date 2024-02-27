'use client';
import SectionHeaders from "@/components/layout/Sectionheaders";
import MenuItem from "@/components/menu/MenuItem";
import { useProfile } from "@/components/useProfile";
import {useEffect, useState} from "react";

import { Bars } from "react-loader-spinner";

const MenuPage = () => {
    const {loading, data} = useProfile();
    const [categories, setCategories] = useState([]);
    const [menuItems, setMenuItems] = useState([]);
    useEffect(() => {
      fetch('/api/categories').then(res => {
        res.json().then(categories => setCategories(categories))
      });
      fetch('/api/menu-items').then(res => {
        res.json().then(menuItems => setMenuItems(menuItems));
      });
    }, []);
    return (
      <>
      {
        loading===true ? (
            <Bars
                height="40"
                width="40"
                color="#f13a01"
                ariaLabel="bars-loading"
                wrapperStyle={{justifyContent:"center",alignItems:"center", height:"80vh"}}    
                wrapperClass=""
                visible={true}
            />
        ): (

          <section className="mt-8">
          {categories?.length > 0 && categories.map(c => (
            <div key={c._id}>
              <div className="text-center">
                <SectionHeaders mainHeader={c.name} />
              </div>
              <div className="grid sm:grid-cols-3 gap-4 mt-6 mb-12">
                {menuItems.filter(item => item.category === c._id).map(item => (
                  <MenuItem key={item._id} {...item} />
                ))}
              </div>
            </div>
          ))}
        </section>
        )
        
        
      }
      </>
      
    );
}

export default MenuPage