import React from 'react'

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions =[],
    selectedCurrency = "usd",
    amountDisabled = false,
    currencyDisabled = false,

    className = "",

   
}) {
    return (

    <div className={`bg-white/10 p-4 rounded-2xl flex items-center justify-between shadow-inner border border-white/10 transition-all hover:bg-white/20 ${className}`}>
        
        {/* Left Side: Label and Number Input */}
        <div className="w-1/2 pr-4">
            <label className="text-white/70 mb-2 inline-block font-medium text-sm">
                {label}
            </label>
            <input 
                className="outline-none w-full bg-transparent py-1.5 text-white font-bold text-3xl placeholder-white/40 disabled:opacity-50"
                type="number"
                placeholder="0"
                disabled={amountDisabled}
                value={amount}
                // e.target.value is a string, so we wrap it in Number() just like the video!
                onChange={(e) => onAmountChange && onAmountChange(Number(e.target.value))}
            />
        </div>

        {/* Right Side: Currency Dropdown */}
        <div className="w-1/2 flex flex-col justify-end items-end text-right">
            <p className="text-white/70 mb-2 w-full font-medium text-sm">Currency</p>
            <select 
                className="rounded-lg px-3 py-2 bg-white/10 text-white cursor-pointer outline-none hover:bg-white/20 transition-colors border border-white/20 backdrop-blur-sm focus:ring-2 focus:ring-blue-400 disabled:opacity-50"
                value={selectedCurrency}
                disabled={currencyDisabled}
                onChange={(e) => onCurrencyChange && onCurrencyChange(e.target.value)}
            >
                {/* Looping through your currencyOptions array */}
                {currencyOptions.map((currency) => (
                    <option key={currency} value={currency} className="text-black">
                        {currency}
                    </option>
                ))}
            </select>
        </div>
    </div>
)    
}

export default InputBox;