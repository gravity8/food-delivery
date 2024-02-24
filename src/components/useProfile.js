import {useState, useEffect} from "react";

export const useProfile=()=>{
    const [data, setData] = useState(false)
    const [loading, setLoading] = useState(true)

    useEffect(()=>{
        setLoading(true)
        fetch("/api/profile").then(response =>{
            response.json().then(data=>{
                console.log(data)
                setData(data)
                setLoading(false)
            })
        })

    },[])

    return {loading, data}
}