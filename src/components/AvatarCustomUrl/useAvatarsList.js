/**
 * @file useAvatarsList.js
 * @brief Ce fichier contient le composant d'utilisation d'une liste d'avatars .
 */
import { useEffect, useState } from "react"
import { getAvatarByUserIdApi } from "hooks/apis/UserApi"

const useAvatarsList = (contributors) => {
    const [urls, setUrls] = useState([])

    useEffect(() => {
        async function fetchData() {
        // You can await here
            const response = await Promise.all(contributors.map(async (c) =>{
                return {userId: c.contributerId, url: await getAvatarByUserIdApi(c.contributerId)}
            }))
            if(response){
                return response
            }
        }
        fetchData().then(res=>{
            if(res){
                setUrls(res)
            }
        })
    }, [contributors])
    return urls
}

export default useAvatarsList
