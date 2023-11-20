import React, { useState, useEffect } from 'react'
import View from '../components/atoms/View.atom'
import Text from '../components/atoms/Text.atom'
import { SafeAreaView, Image, ImageBackground, Dimensions, TouchableOpacity, ScrollView, FlatList } from 'react-native';
import Tailwind from '../libs/tailwind/Tailwind.lib';
import { EyeIcon, EyeSlashIcon } from "react-native-heroicons/outline"
import BottomNavigation from '../components/organisms/BottomNavigation.organisms';
import { connect } from 'react-redux';
import { GetAmountSaldo } from '../libs/fetchings/AccountTransaction.lib';
import { ToRupiah } from '../libs/helpers/NumberFormat.lib';


const Homepage = ({ navigation, user, changeUser, service, banner }) => {
    const [isHide, setIsHide] = useState(true)
    const [isImageNull, setIsImageNull] = useState(false)
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    useEffect(() => {
        initData()
        checkProfileImage()
    }, [])

    const initData = async () => {
        try {
            const getSaldo = await GetAmountSaldo()

            changeUser({ ...user, getSaldo })
        } catch (error) {

        }
    }

    const checkProfileImage = () => {
        let url = user.profile_image

        let stringToCheck = "null";

        if (url.endsWith(stringToCheck)) {
            setIsImageNull(true)
        } else {
            setIsImageNull(false)
        }
    }


    const renderItem1 = ({ item }) => {
        return (
            <TouchableOpacity style={Tailwind`mt-6 items-center`} onPress={() => handleSelectMenu(item)}>
                <Image source={{ uri: item.service_icon }} style={Tailwind`h-11 w-11`} resizeMethod='resize' resizeMode='contain' />
                <Text className="text-black font-normal text-[8px] w-16 mt-2 text-center">{item.service_name}</Text>
            </TouchableOpacity>
        )
    }

    const renderItem2 = ({ item }) => {
        return (
            <TouchableOpacity style={Tailwind`mt-6 items-center`} onPress={() => handleSelectMenu(item)}>
                <Image source={{ uri: item.service_icon }} style={Tailwind`h-11 w-11`} resizeMethod='resize' resizeMode='contain' />
                <Text className="text-black font-normal text-[8px] w-15 mt-2 text-center">{item.service_name}</Text>
            </TouchableOpacity>
        )
    }

    const renderBanner = ({ item }) => {
        return (
            <TouchableOpacity style={Tailwind`mt-6 items-center w-${width * 0.19} h-${height * 0.05} rounded-2xl mr-4`}>
                <Image source={{ uri: item.banner_image }} style={Tailwind`w-full h-full`} resizeMethod='resize' resizeMode='contain' />
            </TouchableOpacity>
        )
    }

    const handleSelectMenu = (item) => {
        navigation.push("Pembayaran", {
            image: item.service_icon,
            name: item.service_name,
            amount: item.service_tariff,
            serviceCode: item.service_code
        })
    }
    return (
        <SafeAreaView>
            <ScrollView style={Tailwind`bg-white`}>
                <View className="px-4 py-6">
                    <View className="flex-row items-center justify-between">
                        <View className="flex-row items-center">
                            <Image source={require('../assets/logo.png')} style={Tailwind`w-5 h-5 mr-2`} />
                            <Text className="text-black font-bold text-sm">SIMS PPOB</Text>
                        </View>
                        <Image source={isImageNull == true ? require('../assets/ProfilePhoto-1.png') : { uri: user.profile_image }} style={Tailwind`w-9 h-9 rounded-full`} resizeMethod='resize' resizeMode='contain' />
                    </View>
                    <View className="mt-8">
                        <Text className="text-black font-normal text-lg">Selamat datang,</Text>
                        <Text className="text-black font-bold text-xl">{user.first_name} {user.last_name}</Text>
                        <View className="mt-6">
                            <ImageBackground source={require('../assets/BackgroundSaldo.png')} style={Tailwind`px-5 py-5`} imageStyle={Tailwind`rounded-2xl`}>
                                <Text className="text-white font-medium text-base">Saldo Anda</Text>
                                <Text className="text-white font-bold text-3xl my-4">Rp
                                    {
                                        isHide ? (
                                            <Text className="text-white font-bold text-lg"> {'\u2B24'} {'\u2B24'} {'\u2B24'} {'\u2B24'} {'\u2B24'} {'\u2B24'} {'\u2B24'}</Text>
                                        ) : (
                                            <Text className="text-white font-bold text-xl"> {ToRupiah(user.getSaldo.balance)}</Text>
                                        )
                                    }
                                </Text>
                                <TouchableOpacity onPress={() => setIsHide(!isHide)}>
                                    <View className="flex-row items-center">
                                        <Text className="text-white font-medium text-xs">Lihat Saldo</Text>
                                        {
                                            isHide ?
                                                <EyeSlashIcon size={16} style={Tailwind`text-grey3 ml-2`} /> :
                                                <EyeIcon size={16} style={Tailwind`text-grey3 ml-2`} />
                                        }
                                    </View>
                                </TouchableOpacity>
                            </ImageBackground>
                        </View>
                        <View>
                            <FlatList
                                columnWrapperStyle={Tailwind`justify-evenly`}
                                data={service.slice(0, 6)}
                                renderItem={renderItem1}
                                numColumns={6}
                            />

                            <FlatList
                                columnWrapperStyle={Tailwind`justify-evenly`}
                                data={service.slice(6, 12)}
                                renderItem={renderItem2}
                                numColumns={6}
                            />
                        </View>
                        <View>
                            <FlatList
                                snapToAlignment={"center"}
                                decelerationRate="fast"
                                pagingEnabled={true}
                                horizontal
                                data={banner}
                                renderItem={renderBanner}
                            />
                        </View>
                    </View>
                </View>
            </ScrollView>
            <BottomNavigation />
        </SafeAreaView>
    )
}

const mapStateToProps = state => {
    return {
        token: state.token,
        user: state.user,
        service: state.service,
        banner: state.banner
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeUser: (value) => dispatch({ type: 'CHANGE_USER', newValue: value }),
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Homepage);