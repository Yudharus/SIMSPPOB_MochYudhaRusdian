import React, { useEffect, useState } from 'react'
import Tailwind from '../libs/tailwind/Tailwind.lib'
import { SafeAreaView, ScrollView } from 'react-native';
import BottomNavigation from '../components/organisms/BottomNavigation.organisms';
import { connect } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EditAkun from '../components/organisms/EditAkun.organisms';
import CardAkun from '../components/organisms/CardAkun.organisms';



const Akun = ({ user, navigation, changeToken, changeIsEdit, isEdit }) => {
    const [isImageNull, setIsImageNull] = useState(false)

    useEffect(() => {
        checkProfileImage()
    }, [])


    const handleLogout = async () => {
        changeToken(null)
        await AsyncStorage.removeItem("token")
        navigation.replace("Login")
    }

    const handleEdit = () => {
        changeIsEdit(true)
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


    return (
        <SafeAreaView style={Tailwind`w-full relative min-h-full bg-white`}>
            <ScrollView>
                {
                    isEdit == true ? (
                        <EditAkun
                            fullname={`${user.first_name} ${user.last_name}`}
                            email={user.email}
                            valueFirstName={user.first_name}
                            valueLastName={user.last_name}
                            image={isImageNull == true ? require('../assets/ProfilePhoto-1.png') : { uri: user.profile_image }}
                        />
                    ) : (
                        <CardAkun
                            email={user.email}
                            first_name={user.first_name}
                            last_name={user.last_name}
                            image={isImageNull == true ? require('../assets/ProfilePhoto-1.png') : { uri: user.profile_image }}
                            onPressEdit={handleEdit}
                            onPressLogout={handleLogout}
                        />
                    )

                }

            </ScrollView>
            <BottomNavigation />
        </SafeAreaView>
    )
}


const mapStateToProps = state => {
    return {
        user: state.user,
        token: state.token,
        isEdit: state.isEdit,
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        changeToken: (value) => dispatch({ type: 'CHANGE_TOKEN', newValue: value }),
        changeIsEdit: (value) => dispatch({ type: 'CHANGE_ISEDIT', newValue: value }),

    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Akun);