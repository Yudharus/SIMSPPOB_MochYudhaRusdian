import React, { useEffect } from 'react'
import Tailwind from '../libs/tailwind/Tailwind.lib';
import View from '../components/atoms/View.atom';
import Text from '../components/atoms/Text.atom';
import { Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ProfileFetching } from '../libs/fetchings/Authentication.lib';
import { connect } from 'react-redux';
import { GetBanner, GetServices } from '../libs/fetchings/Services.lib';
import RNRestart from "react-native-restart"



const Splash = ({ changeToken, changeUser, changeBanner, changeService }) => {
    const navigation = useNavigation();

    useEffect(() => {
        async function initData() {
            try {
                const token = await AsyncStorage.getItem("token")
                const user = await ProfileFetching()
                const service = await GetServices()
                const banner = await GetBanner()
                if (token) {
                    changeToken(JSON.parse(token))
                    changeUser(user)
                    changeService(service)
                    changeBanner(banner)
                    navigation.replace("Homepage")
                } else {
                    navigation.replace("Login")
                }
            } catch (error) {
                await AsyncStorage.removeItem("token")

                RNRestart.Restart()
            }
        }

        const timeout = setTimeout(() => {
            initData()
            clearTimeout(timeout)
        }, 2000);
    }, [])

    return (
        <View className="bg-white flex-1 items-center justify-center">
            <Image source={require('../assets/logo.png')} />
            <Text className="text-black font-bold text-3xl mt-4">SIMS PPOB</Text>
            <Text className="text-grey font-semibold text-base mt-4">Moch Yudha Rusdian</Text>
        </View>
    );
};


const mapDispatchToProps = (dispatch) => {
    return {
        changeToken: (value) => dispatch({ type: 'CHANGE_TOKEN', newValue: value }),
        changeUser: (value) => dispatch({ type: 'CHANGE_USER', newValue: value }),
        changeService: (value) => dispatch({ type: 'CHANGE_SERVICE', newValue: value }),
        changeBanner: (value) => dispatch({ type: 'CHANGE_BANNER', newValue: value }),
    }
}

export default connect(null, mapDispatchToProps)(Splash);
