import React, { useState } from 'react'
import View from '../components/atoms/View.atom'
import Text from '../components/atoms/Text.atom'
import { SafeAreaView, Dimensions, TextInput, FlatList, TouchableOpacity, ScrollView } from 'react-native';
import CardSaldo from '../components/organisms/CardSaldo.organisms'
import TopMenu from '../components/molecules/TopMenu.molecules';
import Tailwind from '../libs/tailwind/Tailwind.lib';;
import SecondModal from '../components/organisms/SecondModal.organism';
import ConfirmModal from '../components/organisms/ConfirmModal.organism';
import { WalletIcon } from "react-native-heroicons/outline"
import ButtonActive from '../components/molecules/ButtonActive.molecules';
import { amount } from '../constant/TopTup';
import { ToRupiah } from '../libs/helpers/NumberFormat.lib';
import ButtonNonActive from '../components/molecules/ButtonNonActive.molecules';
import BottomNavigation from '../components/organisms/BottomNavigation.organisms';
import { connect } from 'react-redux';
import { GetAmountSaldo, TopupSaldo } from '../libs/fetchings/AccountTransaction.lib';

const TopUp = ({ user, changeUser, navigation }) => {
    const [valueInput, setValueInput] = useState("")
    const [modalConfirm, setModalConfirm] = useState(false)
    const [modalSecond, setModalSecond] = useState(false)
    const [isSuccess, setIsSuccess] = useState(true)
    const [id, setId] = useState(0)
    const width = Dimensions.get('window').width;

    const renderItem1 = ({ item }) => {
        return (
            <TouchableOpacity style={Tailwind`border ${item.id == id ? "border-primary--red" : "border-grey"} w-24 py-3 items-center justify-center mt-6 rounded-md`} onPress={() => handleAmount(item)}>
                <Text className="text-black font-normal text-base">Rp{ToRupiah(item.amount)}</Text>
            </TouchableOpacity>
        )
    }

    const renderItem2 = ({ item }) => {
        return (
            <TouchableOpacity style={Tailwind`border ${item.id == id ? "border-primary--red" : "border-grey"} w-24 py-3 items-center justify-center mt-6 rounded-md`} onPress={() => handleAmount(item)}>
                <Text className="text-black font-normal text-base">Rp{ToRupiah(item.amount)}</Text>
            </TouchableOpacity>
        )
    }

    const handleTopup = async () => {
        const response = await TopupSaldo(valueInput)
        const getSaldo = await GetAmountSaldo()

        changeUser({ ...user, getSaldo })
    }

    const handleAmount = (v) => {
        setId(v.id)
        setValueInput(v.amount.toString())
    }

    function openConfirmModal() {
        setModalConfirm(true)
    }

    function openSecondModal() {
        handleTopup()
        setModalSecond(true)
        setModalConfirm(false)
    }

    function closeConfirmModal() {
        setModalConfirm(false)
    }

    function closeSecondModal() {
        setModalSecond(false)
        navigation.replace("Homepage")
    }

    function closeSecondModalStay() {
        setModalSecond(false)
    }
    return (
        <SafeAreaView>
            <ScrollView style={Tailwind`bg-white`}>
                <View className="px-6 py-6 bg-white flex-1">
                    <ConfirmModal
                        visible={modalConfirm}
                        onPress={openSecondModal}
                        closeModal={closeConfirmModal}
                        title="Anda yakin untuk Top Up sebesar"
                        amount={ToRupiah(valueInput)}
                        isTopUp={true}
                    />
                    <SecondModal
                        visible={modalSecond}
                        isSucces={isSuccess}
                        closeModal={closeSecondModal}
                        closeModal2={closeSecondModalStay}
                        title="Top Up sebesar"
                        amount={ToRupiah(valueInput)}
                    />
                    <TopMenu text="Top Up" onPress={() => navigation.replace("Homepage")} />
                    <CardSaldo amount={ToRupiah(user.getSaldo.balance)} />
                    <View className="mt-12">
                        <View>
                            <Text className="text-black text-base font-normal">Silahkan masukan</Text>
                            <Text className="text-black text-xl font-bold">nominal Top Up</Text>
                        </View>
                        <View className="w-full px-4 py-1 mt-12 flex-row items-center border border-grey rounded-md">
                            <WalletIcon size={16} style={Tailwind`text-black mr-2`} />
                            <TextInput style={Tailwind`h-12 w-${width * 0.18} text-black text-sm font-normal `} placeholder='masukan nominal Top Up' placeholderTextColor={"#BDBDBD"} inputMode='numeric' value={valueInput} onChangeText={value => setValueInput(value)} />
                        </View>
                        <FlatList
                            columnWrapperStyle={Tailwind`justify-between`}
                            data={amount.slice(0, 3)}
                            renderItem={renderItem1}
                            numColumns={3}
                        />
                        <FlatList
                            columnWrapperStyle={Tailwind`justify-between`}
                            data={amount.slice(3, 6)}
                            renderItem={renderItem2}
                            numColumns={3}
                        />
                        {

                            parseInt(valueInput) < 10000 || parseInt(valueInput) > 1000000 || valueInput == 0 ?
                                <ButtonNonActive text="Bayar" className="items-center justify-center px-4 py-4 bg-grey rounded-md mt-12" /> :
                                <ButtonActive text="Bayar" className={`items-center justify-center px-4 py-4 bg-primary--red rounded-md mt-12`} classNameText="text-white text-sm font-medium" onPress={openConfirmModal} />

                        }
                    </View>
                </View>
            </ScrollView>
            <BottomNavigation />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUser: (value) => dispatch({ type: 'CHANGE_USER', newValue: value }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(TopUp);