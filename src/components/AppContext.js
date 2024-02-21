"use client"

import {SessionProvider} from "next-auth/react"

export const AppProvider =({children})=>{
    return (
        <SessionProvider>
            {children}
        </SessionProvider>
    )
}
