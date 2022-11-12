import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCurrencyRate} from "../api/currecnyApi";
import {RootState} from "./store";
export type currencyType = 'usd'|'uah'|'eur'|'gbp'|'czk'|'try'
interface currencyState {
    firstCurrency:currencyType,
    secondCurrency:currencyType,
    firstCurrencyRate: null|number,
    secondCurrencyRate:null|number,
    kof:null|number
}
const initialState:currencyState = {
    firstCurrency: 'usd',
    secondCurrency: 'uah',
    firstCurrencyRate:null,
    secondCurrencyRate:null,
    kof:null
}

export const fetchCurrencyRate = createAsyncThunk(
    'currency/currencyFetch',
    async function ({currency,first}:{currency:string,first:boolean}){
        if(currency==='uah')
            return {data:1,first:first}
        const res= await getCurrencyRate(currency)
        const data = await res.json()
        return {data:data[0].rate,first:first}
    }
)

export const currencySlice = createSlice({
    name: 'currency',
    initialState,
    reducers: {
        setCurrency1:(state,action)=>{
            state.firstCurrency= action.payload
        },
        setCurrency2:(state,action)=>{
            state.secondCurrency= action.payload
        },
        setKof:(state,action)=>{
            state.kof= Number(action.payload)
        },
    },
    extraReducers:(builder)=>{

        builder
            .addCase(fetchCurrencyRate.fulfilled,(state,action)=>{
                if(action.payload.first)
                    state.firstCurrencyRate=Number(action.payload.data)
                else
                    state.secondCurrencyRate=Number(action.payload.data)
        })


    }
})
export const {setCurrency1,setCurrency2,setKof}=currencySlice.actions

export const getFirstCurrency=(state:RootState)=>state.currency.firstCurrency
export const getSecondCurrency=(state:RootState)=>state.currency.secondCurrency
export const getFirstCurrencyRate=(state:RootState)=>state.currency.firstCurrencyRate
export const getSecondCurrencyRate=(state:RootState)=>state.currency.secondCurrencyRate
export const getKof=(state:RootState)=>state.currency.kof

