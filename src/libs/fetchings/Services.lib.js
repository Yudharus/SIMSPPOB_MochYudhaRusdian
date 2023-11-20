import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../../configs/axios/Axios.configs";
import {ToastAndroid} from 'react-native';

const GetBanner = async () => {
  try {

    const token = await AsyncStorage.getItem('token');
    const response = await Axios.get('/banner', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data.data
  } catch (error) {
  
    return false;
  }
};

const GetServices = async () => {
  try {

    const token = await AsyncStorage.getItem('token');
    const response = await Axios.get('/services', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data.data
  } catch (error) {
    
    return false;
  }
};

export {
    GetBanner,
    GetServices
};
