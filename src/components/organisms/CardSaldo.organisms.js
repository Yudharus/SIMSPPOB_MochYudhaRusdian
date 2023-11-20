import React from 'react'
import { ImageBackground } from 'react-native';
import Tailwind from '../../libs/tailwind/Tailwind.lib';
import Text from '../atoms/Text.atom';

const CardSaldo = ({amount}) => {
  return (
    <ImageBackground source={require('../../assets/BackgroundSaldo.png')} style={Tailwind`px-5 py-4 mt-8`} imageStyle={Tailwind`rounded-2xl`}>
        <Text className="text-white font-medium text-base">Saldo Anda</Text>
        <Text className="text-white font-bold text-3xl my-4">Rp {amount}</Text>  
    </ImageBackground>
  )
}

export default CardSaldo