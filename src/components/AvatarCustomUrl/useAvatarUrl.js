/**
 * @file useAvatarsUrl.js
 * @brief Ce fichier contient le composant useAvatarUrl .
 */
import { useEffect, useState } from "react"
import { getAvatarByUserIdApi } from "hooks/apis/UserApi"

const useAvatarUrl = (userId) => {
    const [url, setUrl] = useState(null)
    useEffect(() => {
        getAvatarByUserIdApi(userId).then((res) => {
            setUrl(res)
        })
    }, [userId])
    return url
}

export default useAvatarUrl
