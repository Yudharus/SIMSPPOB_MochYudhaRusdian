import React from 'react'
import View from '../atoms/View.atom'
import Text from '../atoms/Text.atom'
import { ArrowLeftIcon } from "react-native-heroicons/outline"
import Tailwind from '../../libs/tailwind/Tailwind.lib'
import { Dimensions, TouchableOpacity } from 'react-native';



const TopMenu = ({text, onPress}) => {
  const width = Dimensions.get('window').width;

  return (
    <View className={`flex-row items-center justify-between `}>
        <TouchableOpacity style={Tailwind`flex-row items-center`} onPress={onPress}>
            <ArrowLeftIcon size={ 16 } style={ Tailwind`text-black mr-2` } />
            <Text className="text-black text-md font-semibold">Kembali</Text>
        </TouchableOpacity>
        <Text className="text-black text-lg font-bold text-center">{text}</Text>
        <View className="w-12"/>
    </View>
  )
}

export default TopMenu