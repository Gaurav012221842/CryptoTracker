import CoinInfo from "./CoinInfo";
import { useQuery } from "react-query";

import {fetchCoinHistoricData} from '../../services/fetchCoinHistoricData'
import { useState } from "react";
import Alert from "../Alert/Alert";
import store from "../../state/store";
import { Facebook } from "react-content-loader";
function CoinInfoCointainer({coinId}){
    const {currency}=store();
    const [days,setDays]=useState(7);
    const [interval, setCoinInterval]=useState('');
    const { data:historicData, isLoading, isError } = useQuery(
        ['coinHistoricData',coinId,currency,days,interval],
        () => fetchCoinHistoricData(coinId,interval,days,currency),{
            cacheTime: 1000 * 60 * 2,
            staleTime: 1000 * 60 * 2,
            
        } 
    );
    if(isLoading){
        return <Facebook/>
    }
    if(isError){
        return <Alert/>
    }
    return (
        <CoinInfo  historicData={historicData} setDays={setDays} setCoinInterval={setCoinInterval} days={days} currency={currency}/>
    )
}
export default CoinInfoCointainer;