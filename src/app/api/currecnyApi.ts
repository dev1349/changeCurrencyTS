

export const getCurrencyRate = (currency:string)=>
    fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode='+currency+'&json')