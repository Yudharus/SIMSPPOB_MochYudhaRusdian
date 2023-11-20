import React, { useState } from 'react'
import { Image as ImageRn, TextInput, Dimensions, TouchableOpacity, PermissionsAndroid} from 'react-native';
import Spacer from '../atoms/Spacer.atom';
import { PencilIcon, AtSymbolIcon, UserIcon } from "react-native-heroicons/outline"
import ButtonActive from '../molecules/ButtonActive.molecules';
import Tailwind from '../../libs/tailwind/Tailwind.lib';
import TopMenu from '../molecules/TopMenu.molecules';
import View from '../atoms/View.atom';
import Text from '../atoms/Text.atom';
import { ProfileFetching, UpdateImageProfile, UpdateProfile } from '../../libs/fetchings/Authentication.lib';
import { connect } from 'react-redux';
import { useNavigation } from '@react-navigation/native';
import { launchImageLibrary } from 'react-native-image-picker';
import { Image , getRealPath  } from 'react-native-compressor';
import ButtonNonActive from '../molecules/ButtonNonActive.molecules';

const EditAkun = ({fullname, email, valueFirstName, valueLastName, changeuser, changeIsEdit, image}) => {
    const [firstName, setFirstName] = useState(valueFirstName)
    const [lastName, setLastName] = useState(valueLastName)
    const height = Dimensions.get('window').height;
    const width = Dimensions.get('window').width;
    const navigation = useNavigation()

    const handleUpdate = async () => {
        const response = await UpdateProfile(firstName, lastName)
        const user = await ProfileFetching()
        changeuser(user)
        changeIsEdit(false)
    }

    const onPressBatal = () => {
        changeIsEdit(false)
    }

    const requestPermission = async () => {
        try {
          const granted = await PermissionsAndroid.requestMultiple(
            [PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
            PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE]
          )
          if (granted['android.permission.READ_EXTERNAL_STORAGE'] && granted['android.permission.WRITE_EXTERNAL_STORAGE']) {
            handlePickImage()
          } else {
            console.log("Camera permission denied");
          }
        } catch (error) {
          console.log('permission error', error)
        }
      }

    const handlePickImage = async () => {
        try {
            const options = {
                mediaType: "photo"
              };
            const result = await launchImageLibrary(options)

            if(!result.didCancel) {
                const resultCompress = await Image.compress(result.assets[0].uri, {
                  compressionMethod: 'manual',
                  maxWidth: 1000,
                  quality: 0.8,
                })

                let resultObj = [{
                  fileName: result.assets[0].fileName,
                  uri: resultCompress,
                  type: result.assets[0].type
                }]

              const response = await UpdateImageProfile([resultObj[0]])
              const user = await ProfileFetching()
              changeuser(user)
            }
        } catch (error) {
            console.log(error)   
        }
    }
  return (
    <View className="px-6 py-6 bg-white flex-1">
                <TopMenu text="Akun" onPress={() => navigation.replace("Homepage")}/>
                <View className="items-center justify-center mt-8">
                    <View className="w-30 h-30 rounded-full border border-grey">
                        <ImageRn source={image} style={Tailwind`w-full h-full rounded-full`}/>
                    </View>
                    <TouchableOpacity style={Tailwind`w-10 h-10 rounded-full border border-grey bg-white items-center justify-center absolute bottom-0 right-23`} onPress={() => requestPermission()}>
                        <PencilIcon size={ 16 } style={ Tailwind`text-black` } />
                    </TouchableOpacity>
                </View>
                <Text className="text-2xl text-black font-semibold text-center mt-4">{fullname}</Text>
                <View className="mt-8">
                    <Text className="text-base text-black font-semibold">Email</Text>
                    <View className={`flex-row items-center border border-grey3/50 rounded-md px-4 py-3.5 mt-4`}>
                        <AtSymbolIcon size={ 18 } style={ Tailwind`text-grey3 mr-1` } />
                        <Text className={`text-black font-normal text-sm w-${width * 0.18}`}>{email}</Text>
                    </View>
                </View>
                <View className="mt-8">
                    <Text className="text-base text-black font-semibold">Nama Depan</Text>
                    <View className={`flex-row items-center border border-grey3/50 rounded-md px-4 py-px mt-4`}>
                            <UserIcon size={ 18 } style={ Tailwind`text-grey3 ml--1 mr-1 mt-1` } />
                            <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='nama depan' placeholderTextColor="#BBBBBB" value={firstName} onChangeText={value => setFirstName(value)}/>
                    </View>
                </View>
                <View className="mt-8">
                    <Text className="text-base text-black font-semibold">Nama Belakang</Text>
                    <View className={`flex-row items-center border border-grey3/50 rounded-md px-4 py-px mt-4`}>
                        <UserIcon size={ 18 } style={ Tailwind`text-grey3 ml--1 mr-1 mt-1` } />
                        <TextInput style={Tailwind`h-${height * 0.012} w-${width * 0.175} text-black font-normal text-sm mt-2`} placeholder='nama belakang' placeholderTextColor="#BBBBBB" value={lastName} onChangeText={value => setLastName(value)}/>
                    </View>
                </View>
                {
                  firstName == "" || lastName == "" ? 
                  <ButtonNonActive text="Simpan" className="items-center justify-center px-4 py-4 bg-grey rounded-md mt-8" /> :
                  <ButtonActive className="items-center justify-center px-4 py-4 bg-primary--red rounded-md mt-8" classNameText="text-white text-sm font-medium" text="Simpan" onPress={handleUpdate}/>
                }
                <ButtonActive className="items-center justify-center px-4 py-4 border border-primary--red bg-whiite rounded-md mt-8" classNameText="text-primary--red text-sm font-medium" text="Batalkan" onPress={onPressBatal}/>
                <Spacer width={"full"} height={"20"} />
            </View>
  )
}

const mapStateToProps = state => {
    return {
      user: state.user,
      isEdit: state.isEdit,
      
    };
  };

  const mapDispatchToProps = (dispatch) => {
    return {
        changeuser : (value) => dispatch({type: 'CHANGE_USER', newValue: value}),
        changeIsEdit : (value) => dispatch({type: 'CHANGE_ISEDIT', newValue: value}),
    }
  }

  export default connect(mapStateToProps, mapDispatchToProps)(EditAkun);