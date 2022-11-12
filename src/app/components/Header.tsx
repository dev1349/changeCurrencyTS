import {AppBar, Box, Toolbar} from "@mui/material";
import {useAppSelector} from "../hooks";
import {getFirstCurrency, getFirstCurrencyRate,} from "../store/currencySlice";

const Header = ()=>{
    const firstCurrencyRate= useAppSelector(getFirstCurrencyRate)
    const firstCurrency= useAppSelector(getFirstCurrency)

    return(
        <Box>
            <AppBar>
                <Toolbar>
                    <div className='toolbar_item'>
                        {firstCurrency && `1 ${firstCurrency} = ${String(firstCurrencyRate)} uah`}
                    </div>

                    <div className='toolbar_item'>
                        Вітаємо
                    </div>
                </Toolbar>
            </AppBar>
        </Box>
    )
}
export default Header