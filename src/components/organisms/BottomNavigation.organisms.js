import React, { useState } from "react"
import { Text, TouchableOpacity, View, Image, Dimensions } from "react-native"
import Tailwind from "../../libs/tailwind/Tailwind.lib"
import { HomeIcon, CurrencyDollarIcon, CreditCardIcon, UserIcon} from "react-native-heroicons/outline"
import { useRoute, useNavigation } from "@react-navigation/native"


const BottomNavigation = () => {
    const route = useRoute()
    const navigation = useNavigation()
    const height = Dimensions.get('window').height;
    
  return (
    <View style={ [{ height: 65, marginTop: height - 66 }, Tailwind`bg-white w-full flex flex-row items-center justify-between px-6 absolute z-50 border-t border-grey`] }>
        <TouchableOpacity style={Tailwind`items-center`} onPress={() => route.name === "Homepage" ? null : navigation.replace("Homepage")}>
            <HomeIcon size={ 22 } style={ Tailwind`${route.name === "Homepage" ? "text-black" : "text-grey"}` }/>
            <Text style={Tailwind`${route.name === "Homepage" ? "text-black" : "text-grey"} font-normal text-xs mt-1`}>Home</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Tailwind`items-center`} onPress={() => route.name === "TopUp" ? null : navigation.replace("TopUp")}>
            <CurrencyDollarIcon size={ 22 } style={ Tailwind`${route.name === "TopUp" ? "text-black" : "text-grey"}` }/>
            <Text style={Tailwind`${route.name === "TopUp" ? "text-black" : "text-grey"} font-normal text-xs mt-1`}>Top Up</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Tailwind`items-center`} onPress={() => route.name === "Transaction" ? null : navigation.replace("Transaction")}>
            <CreditCardIcon size={ 22 } style={ Tailwind`${route.name === "Transaction" ? "text-black" : "text-grey"}` }/>
            <Text style={Tailwind`${route.name === "Transaction" ? "text-black" : "text-grey"} font-normal text-xs mt-1`}>Transaction</Text>
        </TouchableOpacity>
        <TouchableOpacity style={Tailwind`items-center`} onPress={() => route.name === "Akun" ? null : navigation.replace("Akun")}>
            <UserIcon size={ 22 } style={ Tailwind`${route.name === "Akun" ? "text-black" : "text-grey"}` }/>
            <Text style={Tailwind`${route.name === "Akun" ? "text-black" : "text-grey"} font-normal text-xs mt-1`}>akun</Text>
        </TouchableOpacity>
    </View>
  )
}

export default BottomNavigation