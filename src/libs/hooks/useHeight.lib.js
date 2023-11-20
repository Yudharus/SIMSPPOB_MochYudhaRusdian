import { useState, useEffect } from "react"
import { Dimensions } from "react-native"

const useHeight = () => {
    const [height, setHeight] = useState(Dimensions.get("window").height)

    useEffect(() => {
        Dimensions.addEventListener("change", () => {
            setHeight(Dimensions.get("window").height)
        })
    }, [])

    return [
        height,
        setHeight
    ]
}

export default useHeight