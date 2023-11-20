import React, { useState } from 'react'
import View from '../components/atoms/View.atom'
import Text from '../components/atoms/Text.atom'
import { Dimensions, Image } from 'react-native';
import CardSaldo from '../components/organisms/CardSaldo.organisms'
import TopMenu from '../components/molecules/TopMenu.molecules';
import Tailwind from '../libs/tailwind/Tailwind.lib';
import { CurrencyDollarIcon } from "react-native-heroicons/outline"
import ButtonActive from '../components/molecules/ButtonActive.molecules';
import SecondModal from '../components/organisms/SecondModal.organism';
import ConfirmModal from '../components/organisms/ConfirmModal.organism';
import { connect } from 'react-redux';
import { ToRupiah } from '../libs/helpers/NumberFormat.lib';
import { GetAmountSaldo, TransactionService } from '../libs/fetchings/AccountTransaction.lib';




const Pembayaran = ({ route, user, changeUser, navigation }) => {
    const [modalConfirm, setModalConfirm] = useState(false)
    const [modalSecond, setModalSecond] = useState(false)
    const [isSuccess, setIsSuccess] = useState(true)
    const height = Dimensions.get('window').height;
    const item = route.params

    function openConfirmModal() {
        setModalConfirm(true)
    }

    function openSecondModal() {
        handleTransaction()
        setModalSecond(true)
        setModalConfirm(false)
    }

    function closeConfirmModal() {
        setModalConfirm(false)
    }

    function closeSecondModal() {
        setModalSecond(false)
        navigation.goBack()
    }

    function closeSecondModalStay() {
        setModalSecond(false)
    }

    const handleTransaction = async () => {
        const response = await TransactionService(item.serviceCode)
        const getSaldo = await GetAmountSaldo()

        changeUser({ ...user, getSaldo })
    }
    return (
        <View className="px-6 py-6 bg-white flex-1">
            <ConfirmModal
                visible={modalConfirm}
                onPress={openSecondModal}
                closeModal={closeConfirmModal}
                title={`Pembayaran ${item.name} sebesar`}
                amount={ToRupiah(item.amount)}
                isTopUp={false}
            />
            <SecondModal
                visible={modalSecond}
                isSucces={isSuccess}
                closeModal={closeSecondModal}
                title={`Pembayaran ${item.name} sebesar`}
                amount={ToRupiah(item.amount)}
                closeModal2={closeSecondModalStay}
            />
            <TopMenu text="PemBayaran" onPress={() => navigation.goBack()} />
            <CardSaldo amount={ToRupiah(user.getSaldo.balance)} />
            <View className="mt-12">
                <Text className="text-black text-base font-normal">PemBayaran</Text>
                <View className="flex-row items-center mt-3">
                    <Image source={{ uri: item.image }} style={Tailwind`w-8 h-8`} resizeMethod='resize' resizeMode='contain' />
                    <Text className="text-black text-lg font-bold ml-2">{item.name}</Text>
                </View>
                <View className="w-full px-4 py-3 mt-6 flex-row items-center border border-grey rounded-md">
                    <CurrencyDollarIcon size={16} style={Tailwind`text-black mr-2`} />
                    <Text className="text-black text-base font-medium">{ToRupiah(item.amount)}</Text>
                </View>
                <ButtonActive text="Bayar" className={`items-center justify-center px-4 py-4 bg-primary--red rounded-md mt-${height * 0.04}`} classNameText="text-white text-sm font-medium" onPress={openConfirmModal} />
            </View>
        </View>
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

export default connect(mapStateToProps, mapDispatchToProps)(Pembayaran);