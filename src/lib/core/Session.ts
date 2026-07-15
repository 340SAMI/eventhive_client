import { headers } from "next/headers"
import { auth } from "../auth"

export  const  getUserSession = async ()=>{

    const session = await auth.api.getSession({
    headers: await headers() 
})

return session?.user;
}


export const getUserToken = async () => {
    const session = await auth.api.getSession({
        headers: await headers()
    })
    console.log(session?.session?.token);
    return session?.session?.token || null;
}