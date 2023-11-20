import React, { Fragment } from "react"
import { ActivityIndicator, View } from "react-native"
import Tailwind from "../../libs/tailwind/Tailwind.lib"
import useHeight from "../../libs/hooks/useHeight.lib"


const LoadingFetching = () => {
    const [height, setHeight] = useHeight()

    return (
        <Fragment>
            <View style={ [{ height }, Tailwind`w-full bg-black--50 absolute z-50 flex items-center justify-center`] }>
                <ActivityIndicator size={ "large" } color={ "#FFFFFF" }/>
            </View>
        </Fragment>
    )
}

export default LoadingFetching