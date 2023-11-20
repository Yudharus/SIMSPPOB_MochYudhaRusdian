import React from "react";
import { TouchableOpacity } from "react-native";
import ModalTop from "./ModalTop.organism";
import View from "../atoms/View.atom";
import Text from "../atoms/Text.atom";
import { WalletIcon } from "react-native-heroicons/outline"
import Tailwind from "../../libs/tailwind/Tailwind.lib";

const ConfirmModal = ({visible, closeModal, title, amount, isTopUp, onPress}) => {

  return (
    <ModalTop visible={visible} closeModal={closeModal} >
        <View className="items-center justify-center">
            <View className="w-20 h-20 items-center justify-center bg-primary--red rounded-full">
                <WalletIcon size={ 30 } style={ Tailwind`text-white` } />
            </View>
            <Text className="text-black text-base font-normal mt-4">{title}</Text>
            <Text className="text-black font-bold text-3xl mt-2">Rp {amount}</Text>  
            <TouchableOpacity onPress={onPress}>
                <Text className="text-primary--red text-base font-bold mt-4">Ya, lanjutkan {isTopUp == true ? "Top Up": "Bayar"}</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={closeModal}>
                <Text className="text-grey text-base font-bold mt-4">Batalkan</Text>
            </TouchableOpacity>
        </View>
    </ModalTop>
  )
}

export default ConfirmModal

