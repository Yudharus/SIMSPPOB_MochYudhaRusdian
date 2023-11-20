import React, { useState } from 'react'
import { Image, TextInput, Dimensions, TouchableOpacity } from 'react-native';
import { EyeIcon, EyeSlashIcon, AtSymbolIcon, LockClosedIcon } from "react-native-heroicons/outline"
import View from '../components/atoms/View.atom'
import Text from '../components/atoms/Text.atom'
import Tailwind from '../libs/tailwind/Tailwind.lib';
import ButtonActive from '../components/molecules/ButtonActive.molecules';
import { LoginFetching } from '../libs/fetchings/Authentication.lib';
import ButtonNonActive from '../components/molecules/ButtonNonActive.molecules';
import { connect } from 'react-redux';
import { ProfileFetching } from '../libs/fetchings/Authentication.lib';
import { GetBanner, GetServices } from '../libs/fetchings/Services.lib';


const Login = ({ navigation, changeToken, changeUser, changeBanner, changeService }) => {
    const [isHide, setIsHide] = useState(true)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [errorPassword, setErrorPassword] = useState(false)
    const [errorText, setErrorText] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const handleLogin = async () => {
        setIsLoading(true)
        const response = await LoginFetching(email, password)
        if (response.status == 103 || response.status == 102) {
            if (response.status == 103) {
                setErrorPassword(true)
            }
            setIsLoading(false)
            setErrorText(response.message)
        } else {
            const user = await ProfileFetching()
            const service = await GetServices()
            const banner = await GetBanner()
            changeToken(response.data.token)
            changeUser(user)
            changeBanner(banner)
            changeService(service)
            navigation.replace("Homepage")
            setErrorText("")
            setErrorPassword(false)
            setIsLoading(false)
        }
    }


    return (
        <View className="flex-1 items-center justify-center px-4">
            <View className="flex-row items-center">
                <Image source={require('../assets/logo.png')} style={Tailwind`w-8 h-8 mr-2`} />
                <Text className="text-black font-bold text-lg">SIMS PPOB</Text>
            </View>
            <View className="mt-8">
                <Text className="text-black font-bold text-3xl text-center">Masuk atau buat akun untuk memulai</Text>
                <View className="mt-10">
                    <View className={`flex-row items-center border border-grey3 rounded-md px-4`}>
                        <AtSymbolIcon size={18} style={Tailwind`text-grey3 ml--1 mr-1 mt-1`} />
                        <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='masukan email anda' placeholderTextColor="#BBBBBB" value={email} onChangeText={value => setEmail(value)} />
                    </View>
                    <View className={`flex-row items-center border ${errorPassword == true ? "border-primary--red" : "border-grey3"} rounded-md px-4 mt-6`}>
                        <LockClosedIcon size={18} style={Tailwind`text-grey3 ml--1 mr-1 mt-1`} />
                        <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='masukan password anda' placeholderTextColor="#BBBBBB" secureTextEntry={isHide} value={password} onChangeText={value => setPassword(value)} />
                        <TouchableOpacity onPress={() => setIsHide(!isHide)}>
                            {
                                isHide ?
                                    <EyeSlashIcon size={18} style={Tailwind`text-grey3`} /> :
                                    <EyeIcon size={18} style={Tailwind`text-grey3`} />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
                {
                    email == "" || password == "" ? (
                        <ButtonNonActive text="Masuk" className="items-center justify-center px-4 py-4 bg-grey rounded-md mt-12" />
                    ) : (
                        <ButtonActive className="items-center justify-center px-4 py-4 bg-primary--red rounded-md mt-12 flex-row" classNameText="text-white text-sm font-medium" text="Masuk" isLoading={isLoading} onPress={handleLogin} />
                    )
                }
                <View className="mt-6 flex-row items-center justify-center">
                    <Text className="text-grey4 text-xs font-normal">belum punya akun? registrasi </Text>
                    <TouchableOpacity onPress={() => navigation.push("Register")}>
                        <Text className="text-primary--red text-xs font-bold">di sini</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {
                errorText !== "" ? (
                    <TouchableOpacity style={Tailwind`w-full px-4 py-2 items-center justify-between flex-row bg-secondary--red absolute bottom-10`} onPress={() => setErrorText("")}>
                        <Text className="text-tertiary--red text-xs font-normal">{errorText}</Text>
                        <Text className="text-tertiary--red text-xs font-normal">X</Text>
                    </TouchableOpacity>
                ) : null
            }
        </View>
    )
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeToken: (value) => dispatch({ type: 'CHANGE_TOKEN', newValue: value }),
        changeUser: (value) => dispatch({ type: 'CHANGE_USER', newValue: value }),
        changeService: (value) => dispatch({ type: 'CHANGE_SERVICE', newValue: value }),
        changeBanner: (value) => dispatch({ type: 'CHANGE_BANNER', newValue: value }),
    }
}

export default connect(null, mapDispatchToProps)(Login);