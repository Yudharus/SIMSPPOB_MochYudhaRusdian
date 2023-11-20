import React, { useState } from 'react'
import View from '../components/atoms/View.atom'
import Text from '../components/atoms/Text.atom'
import { Image, TextInput, Dimensions, TouchableOpacity, ScrollView } from 'react-native';
import Tailwind from '../libs/tailwind/Tailwind.lib';
import { EyeIcon, EyeSlashIcon, AtSymbolIcon, LockClosedIcon, UserIcon } from "react-native-heroicons/outline"
import ButtonActive from '../components/molecules/ButtonActive.molecules';
import ButtonNonActive from '../components/molecules/ButtonNonActive.molecules';
import { RegisterAccount } from '../libs/fetchings/Authentication.lib';




const Register = ({ navigation }) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [firstName, FirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [isHide, setIsHide] = useState(true)
    const [isHideConfirm, setIsHideConfirm] = useState(true)
    const [isPasswordSame, setIsPasswordSame] = useState(true)
    const [isLoading, setIsLoading] = useState(false)
    const width = Dimensions.get('window').width;
    const height = Dimensions.get('window').height;

    const handleRegister = async () => {
        if (password !== confirmPassword) {
            setIsPasswordSame(false)
        } else {
            const response = await RegisterAccount(email, firstName, lastName, password)

            if (response.status !== 102) {
                navigation.replace("Login")
                setIsPasswordSame(true)
            }

        }
    }

    return (
        <ScrollView>
            <View className="flex-1 items-center justify-center mt-12">
                <View className="flex-row items-center">
                    <Image source={require('../assets/logo.png')} style={Tailwind`w-8 h-8 mr-2`} />
                    <Text className="text-black font-bold text-lg">SIMS PPOB</Text>
                </View>
                <View className="mt-8">
                    <Text className="text-black font-bold text-3xl text-center">Lengkapi data untuk mebuat akun</Text>
                    <View className="mt-10">
                        <View className={`flex-row items-center border border-grey3 rounded-md px-4`}>
                            <AtSymbolIcon size={18} style={Tailwind`text-grey3 ml--1 mr-1 mt-1`} />
                            <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='masukan email anda' placeholderTextColor="#BBBBBB" value={email} onChangeText={value => setEmail(value)} />
                        </View>
                        <View className={`flex-row items-center border border-grey3 rounded-md px-4 mt-6`}>
                            <UserIcon size={18} style={Tailwind`text-grey3 ml--1 mr-1 mt-1`} />
                            <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='nama depan' placeholderTextColor="#BBBBBB" value={firstName} onChangeText={value => FirstName(value)} />
                        </View>
                        <View className={`flex-row items-center border border-grey3 rounded-md px-4 mt-6`}>
                            <UserIcon size={18} style={Tailwind`text-grey3 ml--1 mr-1 mt-1`} />
                            <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='nama belakang' placeholderTextColor="#BBBBBB" value={lastName} onChangeText={value => setLastName(value)} />
                        </View>
                        <View className={`flex-row items-center border border-grey3 rounded-md px-4 mt-6`}>
                            <LockClosedIcon size={18} style={Tailwind`text-grey3 ml--1 mr-1 mt-1`} />
                            <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='buat password' placeholderTextColor="#BBBBBB" secureTextEntry={isHide} value={password} onChangeText={value => setPassword(value)} />
                            <TouchableOpacity onPress={() => setIsHide(!isHide)}>
                                {
                                    isHide ?
                                        <EyeSlashIcon size={18} style={Tailwind`text-grey3`} /> :
                                        <EyeIcon size={18} style={Tailwind`text-grey3`} />
                                }
                            </TouchableOpacity>
                        </View>
                        <View className={`flex-row items-center border ${isPasswordSame == false ? "border-primary--red" : "border-grey"} rounded-md px-4 mt-6`}>
                            <LockClosedIcon size={18} style={Tailwind`text-grey3 ml--1 mr-1 mt-1`} />
                            <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='konfirmasi passsword' placeholderTextColor="#BBBBBB" secureTextEntry={isHideConfirm} value={confirmPassword} onChangeText={value => setConfirmPassword(value)} />
                            <TouchableOpacity onPress={() => setIsHideConfirm(!isHideConfirm)}>
                                {
                                    isHideConfirm ?
                                        <EyeSlashIcon size={18} style={Tailwind`text-grey3`} /> :
                                        <EyeIcon size={18} style={Tailwind`text-grey3`} />
                                }
                            </TouchableOpacity>
                        </View>
                        {
                            isPasswordSame == false ? <Text className="text-primary--red text-xs font-normal text-right mt-2">password tidak sama</Text> : null
                        }
                        {
                            email == "" || lastName == "" || lastName == "" || password.length < 8 || confirmPassword.length < 8 ? (
                                <ButtonNonActive text="Registrasi" className="items-center justify-center px-4 py-4 bg-grey rounded-md mt-12" />
                            ) : (
                                <ButtonActive className="items-center justify-center px-4 py-4 bg-primary--red rounded-md mt-12 flex-row" classNameText="text-white text-sm font-medium" text="Registrasi" isLoading={isLoading} onPress={handleRegister} />
                            )
                        }
                        <View className="mt-6 flex-row items-center justify-center">
                            <Text className="text-grey4 text-xs font-normal">sudah punya akun? login </Text>
                            <TouchableOpacity onPress={() => navigation.replace("Login")}>
                                <Text className="text-primary--red text-xs font-bold">di sini</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        </ScrollView>
    )
}

export default Register