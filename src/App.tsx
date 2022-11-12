import React, {useEffect} from 'react';

import './App.css';
import {useAppDispatch, useAppSelector} from "./app/hooks";
import Header from "./app/components/Header";
import InputWithSelect from "./app/components/InoutWithSelect";
import {fetchCurrencyRate} from "./app/store/currencySlice";


function App() {
    const dispatch= useAppDispatch()
    const firstCurrency = useAppSelector(state=>state.currency.firstCurrency)
    const secondCurrency = useAppSelector(state=>state.currency.secondCurrency)
    useEffect(()=>{
        dispatch(fetchCurrencyRate({currency:firstCurrency,first:true}))
        dispatch(fetchCurrencyRate({currency:secondCurrency,first:false}))

    },[])

  return (
    <div className="App">
      <Header/>
      <InputWithSelect first={true}  currency={firstCurrency}/>
      <InputWithSelect first={false} currency={secondCurrency}/>
    </div>
  );
}

export default App;
