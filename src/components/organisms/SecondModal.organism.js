import React from "react";
import {  Dimensions, TouchableOpacity } from "react-native";
import ModalTop from "./ModalTop.organism";
import View from "../atoms/View.atom";
import Text from "../atoms/Text.atom";
import { CheckIcon, XMarkIcon } from "react-native-heroicons/outline"
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const SecondModal = ({visible, closeModal, closeModal2, isSucces, title, amount}) => {

  return (
    <ModalTop visible={visible} closeModal={closeModal2} >
        <View className="items-center justify-center">
            {
                isSucces == true ? 
                (
                    <View className="w-20 h-20 items-center justify-center bg-primary--green rounded-full">
                        <CheckIcon size={ 30 } style={ Tailwind`text-white` } />
                    </View>
                ) : <View className="w-20 h-20 items-center justify-center bg-primary--red rounded-full">
                        <XMarkIcon size={ 30 } style={ Tailwind`text-white` } />
                    </View>
            }
            <Text className="text-black text-base font-normal mt-4">{title}</Text>
            <Text className="text-black font-bold text-3xl mt-2">Rp {amount}</Text>  
            {
                isSucces == true ? <Text className="text-black text-base font-normal mt-2">berhasil!</Text> : <Text className="text-black text-base font-normal mt-2">gagal</Text>
            }
            <TouchableOpacity onPress={closeModal}>
                <Text className="text-primary--red text-base font-bold mt-4">Kembali ke Beranda</Text>
            </TouchableOpacity>
        </View>
    </ModalTop>
  )
}

export default SecondModal

