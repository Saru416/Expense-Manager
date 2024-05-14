import { useEffect, useState } from "react"

export const useWindowSize = () => {
    const [size,setsize] = useState([window.innerWidth,window.innerHeight])

    useEffect(() => {
        const updateSize = () => {
            setsize([window.innerWidth,window.innerHeight])
        }
        window.addEventListener('resize',updateSize)
        return () => window.removeEventListener('resize',updateSize)
    }, [])

    return {
        width: size[0],
        height: size[1]
    }
}
