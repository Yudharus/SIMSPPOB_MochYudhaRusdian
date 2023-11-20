import { Modal as ModalRn } from "react-native";
import { XMarkIcon } from "react-native-heroicons/solid";
import { Pressable } from "react-native";
import Tailwind from "../../libs/tailwind/Tailwind.lib";
import View from "../atoms/View.atom";


function ModalTop({ children, visible, closeModal, className,animationType = "slide" }) {
    return (
        <ModalRn visible={visible} animationType={animationType} transparent>
        <Pressable
            style={Tailwind`flex-1 bg-grey4/70 relative opacity-70`}
            onPress={closeModal}></Pressable>
        <View className="absolute top-[11%] right-[7%] z-10">
            <Pressable onPress={closeModal}>
            <XMarkIcon size={ 24 } style={ Tailwind`${className}` }/>
            </Pressable>
        </View>
        <View className="absolute w-[90%] top-[25%] left-5 right-5">
            <View className="bg-white p-5 pt-8 rounded-xl">{children}</View>
        </View>
        </ModalRn>
    );
}

export default ModalTop;