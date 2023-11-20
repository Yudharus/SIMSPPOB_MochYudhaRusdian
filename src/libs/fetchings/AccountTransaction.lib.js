import AsyncStorage from '@react-native-async-storage/async-storage';
import Axios from "../../configs/axios/Axios.configs";
import {ToastAndroid} from 'react-native';

const GetAmountSaldo = async () => {
  try {

    const token = await AsyncStorage.getItem('token');
    const response = await Axios.get('/balance', {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data.data
  } catch (error) {
    return false;
  }
};

const GetHistoryTransaction = async (offset) => {
  try {

    const token = await AsyncStorage.getItem('token');
    const response = await Axios.get(`/transaction/history?offset=${offset}&limit=5`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(token)}`,
      },
    });
    return response.data.data
  } catch (error) {
  
    return false;
  }
};

const TopupSaldo = async (top_up_amount = 0) => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await Axios.post('/topup',
     {
      top_up_amount,
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

    return error.response.data;
  }
};

const TransactionService = async (service_code = "") => {
  try {
    const token = await AsyncStorage.getItem('token');
    const response = await Axios.post('/transaction',
     {
      service_code,
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

    return error.response.data;
  }
};


export {
    GetAmountSaldo,
    GetHistoryTransaction,
    TopupSaldo,
    TransactionService
};
