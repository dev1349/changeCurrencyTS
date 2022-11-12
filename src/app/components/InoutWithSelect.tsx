import {Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent, TextField} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../hooks";
import {
    currencyType,
    fetchCurrencyRate,
    getFirstCurrency, getFirstCurrencyRate, getKof, getSecondCurrency, getSecondCurrencyRate,
    setCurrency1,
    setCurrency2,
    setKof
} from "../store/currencySlice";
import {getInput1Value, getInput2Value, setInput1, setInput2} from "../store/inputsSlice";
import {useEffect} from "react";
type isFirstType= {
    first:boolean,
    currency:currencyType
}

const InputWithSelect= ({first}:isFirstType)=>{
    const dispatch =useAppDispatch()
    const input1Value= useAppSelector(getInput1Value)
    const input2Value= useAppSelector(getInput2Value)
    const firstCurrency = useAppSelector(getFirstCurrency)
    const secondCurrency = useAppSelector(getSecondCurrency)
    const secondCurrencyRate= useAppSelector(getSecondCurrencyRate)
    const firstCurrencyRate=useAppSelector(getFirstCurrencyRate)
    const kof=useAppSelector(getKof)

    useEffect(()=>{
        if(firstCurrencyRate && secondCurrencyRate)
            dispatch(setKof(firstCurrencyRate/secondCurrencyRate))
    },[firstCurrencyRate,secondCurrencyRate])
    const handleChangeSelect = (event:SelectChangeEvent) =>{
        if(first) {
            dispatch(setCurrency1(event.target.value))
            dispatch(fetchCurrencyRate({currency:event.target.value,first:true}))
        }
        else {
            dispatch(setCurrency2(event.target.value))
            dispatch(fetchCurrencyRate({currency:event.target.value,first:false}))
        }
    }
    const handleChangeInput=(event:React.ChangeEvent<HTMLInputElement>)=>{
        if(first) {
            dispatch(setInput1(event.target.value))
            kof && dispatch(setInput2(Number(event.target.value)*kof))


        }
        else {
            dispatch(setInput2(event.target.value))
            kof && dispatch(setInput1(Number(event.target.value)/kof))
        }
    }

    return (
        <Box sx={{marginTop:'100px'}}>
            <TextField
                sx={{display:'inline'}}
                value={first? input1Value: input2Value}
                onChange={handleChangeInput}


            />
            <FormControl sx={{display:'inline',width:'400px'}}>
                <InputLabel id="demo-simple-select-label">Валюта</InputLabel>
                <Select sx={{
                    display:'inline-block',
                    fontSize:'30px',
                    marginLeft:'40px',
                    height:'55px',
                }}
                        onChange={handleChangeSelect}
                        value={first?firstCurrency:secondCurrency}


                >
                    <MenuItem value={'uah'}>Гривна</MenuItem>
                    <MenuItem value={'eur'}>Euro</MenuItem>
                    <MenuItem value={'usd'}>Dollar</MenuItem>
                    <MenuItem value={'gbp'}>Фунт Стерлинг</MenuItem>
                    <MenuItem value={'try'}>Турецкая лира</MenuItem>
                    <MenuItem value={'czk'}>Чешская крона</MenuItem>

                </Select>
            </FormControl>
        </Box>
    )
}
export default InputWithSelect