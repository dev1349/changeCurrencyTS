import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

const initialState={
    input1:'',
    input2:''
}

export const inputsSlice = createSlice({
    name: 'inputs',
    initialState,
    reducers: {
        setInput1:(state,action)=>{
            state.input1=action.payload
        },
        setInput2:(state,action)=>{
            state.input2=action.payload
        },
    },

})

export const {setInput1,setInput2} = inputsSlice.actions

export const getInput1Value = (state:RootState)=>state.inputs.input1
export const getInput2Value = (state:RootState)=>state.inputs.input2