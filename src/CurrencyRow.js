import React from 'react';

export default function CurrencyRow(props) {

    const {
        currencyOptions,
        selectedCurrency,
        onChangeCurrency,
        number,
        onChangeNumber
    } = props

    
    return (
        <div>
            <input type="number" className="input" value={number} onChange = {onChangeNumber}/>
            <select value={selectedCurrency} onChange = {onChangeCurrency}>
                {currencyOptions.map(option => (
                    <option key = {option} value={option}>{option}</option>
                ))}
                <option value="USD">USD</option>
            </select>
        </div>
    )
    
}