import React, {useEffect, useState} from 'react';
import './App.css';
import CurrencyRow from './CurrencyRow';

//const BASE_URL = 'https://api.apilayer.com/exchangerates_data/latest'

var myHeaders = new Headers();
myHeaders.append("apikey", "i4vGhhFtdE9Vnma8dxNrIliO4jovBkfX");

var requestOptions = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};


function App() {

  const [currencyOptions, setCurrencyOptions] = useState([])
  const [fromCurrency, setFromCurrency] = useState()
  const [toCurrency, setToCurrency] = useState()
  const [conversionRate, setConversionRate] = useState()
  const [number, setNumber] = useState(1)
  const [numberInFromCurrency, setNumberInFromCurrency] = useState(true)

  let toNumber, fromNumber

  if(numberInFromCurrency) {
    fromNumber = number
    toNumber = number * conversionRate
  } else {
    toNumber = number
    fromNumber = number / conversionRate
  }

  console.log(currencyOptions)

  useEffect(() => {
  fetch("https://api.apilayer.com/exchangerates_data/latest", requestOptions)
  .then(response => response.json())
  .then(data => {
    const firstCurrency = Object.keys(data.rates)[0]
    setCurrencyOptions([data.base, ...Object.keys(data.rates)])
    setFromCurrency(data.base)
    setToCurrency(firstCurrency)
    setConversionRate(data.rates[firstCurrency])
  })
  .catch(error => console.log('error', error));
  }, [])

  useEffect(() => {
    if(fromCurrency != null && toCurrency != null) {
    fetch(`https://api.apilayer.com/exchangerates_data/latest?symbols=${toCurrency}&base=${fromCurrency}`, requestOptions)
    .then(response => response.json())
    .then(data => setConversionRate(data.rates[toCurrency]))
    }
  }, [fromCurrency, toCurrency])

  function handleFromNumberChange(e) {
    setNumber(e.target.value)
    setNumberInFromCurrency(true)
  }

  function handleToNumberChange(e) {
    setNumber(e.target.value)
    setNumberInFromCurrency(false)
  }

  return (
    <>
    <div class="wrapper">
    <h1>Live Currency Rates</h1>
    <CurrencyRow
    currencyOptions={currencyOptions}
    selectedCurrency = {fromCurrency}
    onChangeCurrency = {e => setFromCurrency(e.target.value)}
    number = {fromNumber}
    onChangeNumber = {handleFromNumberChange}
    />
    <div className="equals">=</div>
    <CurrencyRow 
    currencyOptions={currencyOptions}
    selectedCurrency = {toCurrency}
    onChangeCurrency = {e => setToCurrency(e.target.value)}
    number = {toNumber}
    onChangeNumber = {handleToNumberChange}
    />
    </div>
    
    </>
    
  );
}

export default App;
