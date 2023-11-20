import React, { useEffect, useState } from 'react'
import Tailwind from '../libs/tailwind/Tailwind.lib'
import TopMenu from '../components/molecules/TopMenu.molecules'
import CardSaldo from '../components/organisms/CardSaldo.organisms'
import { SafeAreaView, FlatList, ScrollView, Dimensions, TouchableOpacity, ActivityIndicator } from 'react-native';
import View from '../components/atoms/View.atom';
import Text from '../components/atoms/Text.atom';
import BottomNavigation from '../components/organisms/BottomNavigation.organisms';
import { ToRupiah } from '../libs/helpers/NumberFormat.lib';
import Spacer from '../components/atoms/Spacer.atom';
import { GetHistoryTransaction } from '../libs/fetchings/AccountTransaction.lib';
import moment from 'moment';
import { connect } from 'react-redux';


const Transaction = ({ user, navigation }) => {
    const [history, setHistory] = useState([])
    const [offset, setOffset] = useState(0)
    const [loading, setLoading] = useState(false)
    const height = Dimensions.get('window').height;


    useEffect(() => {
        initData()
    }, [])

    const initData = async () => {
        setLoading(true)
        try {
            const response = await GetHistoryTransaction(offset)

            setHistory(response.records)
            setLoading(false)
        } catch (error) {
            setLoading(false)
        }
    }

    const handleLoadmore = async () => {
        setOffset(prev => prev + 5)
        const response = await GetHistoryTransaction(offset + 5)
        setHistory(prev => [...prev, ...response.records])
    }

    const renderItem = ({ item }) => {
        return (
            <View className="px-4 py-2 border border-grey2 flex-row justify-between rounded-md mt-6">
                <View>
                    <Text className={`text-xl font-bold ${item.transaction_type == "PAYMENT" ? "text-primary--red" : "text-primary--green"}`}>{item.transaction_type == "PAYMENT" ? "-" : "+"} Rp.{ToRupiah(item.total_amount)}</Text>
                    <Text className="text-xs font-medium text-grey5 mt-2">{moment(item.created_on).format('LLL')}</Text>
                </View>
                <Text className="text-xs font-medium text-black mt-2">{item.description}</Text>
            </View>
        )
    }

    const renderEmptyItem = () => {
        return (
            <View className="items-center justify-center">
                <Text className={`text-xs font-medium text-grey mt-${height * 0.05}`}>Maaf tidak ada histori transaksi saat ini</Text>
            </View>
        )
    }

    return (
        <SafeAreaView style={Tailwind`w-full relative min-h-full bg-white`}>
            <ScrollView>
                <View className="px-6 py-6 bg-white flex-1">
                    <TopMenu text="Transaksi" onPress={() => navigation.replace("Homepage")} />
                    <CardSaldo amount={ToRupiah(user.getSaldo && user.getSaldo.balance)} />
                    <View className="mt-10">
                        <Text className="text-black font-bold text-lg">Transaksi</Text>
                        {
                            loading ? <ActivityIndicator color={"#F3281C"} style={Tailwind`mt-8`} /> : (
                                <FlatList
                                    data={history}
                                    renderItem={renderItem}
                                    ListEmptyComponent={renderEmptyItem}
                                />
                            )
                        }
                        {
                            history.length > 0 ? (
                                <TouchableOpacity onPress={handleLoadmore}>
                                    <Text className="text-primary--red font-semibold text-sm text-center mt-8">Show more</Text>
                                </TouchableOpacity>
                            ) : null
                        }
                        <Spacer width={"full"} height={"30"} />
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
export default connect(mapStateToProps, null)(Transaction);