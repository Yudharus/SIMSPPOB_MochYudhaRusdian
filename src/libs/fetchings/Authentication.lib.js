import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../../configs/axios/Axios.configs";
import {ToastAndroid} from 'react-native';

const LoginFetching = async (email = "" , password = "") => {
  try {
    const response = await Axios.post('/login',
     {
        email,
        password
     },
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });


    await AsyncStorage.setItem(
      'token',
      JSON.stringify(response.data.data.token)
    );

    ToastAndroid.show(`${response.data.message}`, 2000);
    return response.data
  } catch (error) {

    return error.response.data;
  }
};

const RegisterAccount = async (email = "", first_name = "", last_name = "", password = "") => {
  try {
    const response = await Axios.post('/registration',
     {
        email,
        first_name,
        last_name,
        password
     },
    {
      headers: {
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });

    ToastAndroid.show(`${response.data.message}`, 2000);
    return response.data
  } catch (error) {
    ToastAndroid.show(`${error.response.data.message}`, 2000);

    return error.response.data;
  }
};

const ProfileFetching = async () => {
  try {

    const token = await AsyncStorage.getItem('token');
    const response = await Axios.get('/profile', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data.data
  } catch (error) {
    return false;
  }
};

const UpdateProfile = async (first_name = "", last_name = "") => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await Axios.put('/profile/update',
     {
        first_name,
        last_name,
     },
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });

    ToastAndroid.show(`${response.data.message}`, 2000);
    return response.data
  } catch (error) {

    ToastAndroid.show(`${error.response.data.message}`, 2000);

    return error.response.data;
  }
};

const UpdateImageProfile = async (file = "") => {
  let data = new FormData();

  file.forEach(item => {
    data.append('file', {
      uri: item.uri,
      name: item.fileName,
      type: item.type,
    });
  });

  try {
    const token = await AsyncStorage.getItem('token');
    const response = await Axios.put('/profile/image', data,
    {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
        'Content-Type': 'multipart/form-data',
      },
    });

    ToastAndroid.show(`${response.data.message}`, 2000);
    return response.data
  } catch (error) {

    ToastAndroid.show(`${error.response.data.message}`, 2000);

    return error.response.data;
  }
};

export {
  LoginFetching,
  RegisterAccount,
  ProfileFetching,
  UpdateProfile,
  UpdateImageProfile
};
