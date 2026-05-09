import { useState, useEffect } from 'react';
import './App.css';
import InputBox from './components/InputBox';
import usecurrencyinfo from './custom hooks/UsecurrencyConverter';
import backgroundImg from './assets/BackgroundImage.jpg';

function App() {
  const [fromCurrency, setFromCurrency] = useState('usd');
  const [toCurrency, setToCurrency] = useState('inr');
  const [amount, setAmount] = useState("");
  const [convertedAmount, setConvertedAmount] = useState("");
  const [rotation, setRotation] = useState(0);
  const [history, setHistory] = useState([]);
  const [exchangeRate, setExchangeRate] = useState(0);

  const fromCurrencyInfo = usecurrencyinfo(fromCurrency);
  const currencyOptions = Object.keys(fromCurrencyInfo);

  const swapCurrency = () => {
    setFromCurrency(toCurrency);
    setToCurrency(fromCurrency);
    setConvertedAmount(amount);
    setAmount(convertedAmount);
    setRotation((prev) => prev + 180);
  };

  const convertCurrency = () => {
    if (fromCurrencyInfo && fromCurrencyInfo[toCurrency]) {
      const rate = fromCurrencyInfo[toCurrency];
      const result = Number((amount * rate).toFixed(2));
      setConvertedAmount(result);
      setExchangeRate(rate);
      
      if (amount && amount > 0) {
        const newEntry = {
          id: Date.now(),
          from: fromCurrency.toUpperCase(),
          to: toCurrency.toUpperCase(),
          amount: amount,
          result: result,
          rate: rate
        };
        setHistory([newEntry, ...history.slice(0, 4)]);
      }
    }
  };

  useEffect(() => {
    if (amount && fromCurrencyInfo && fromCurrencyInfo[toCurrency]) {
      convertCurrency();
    } else if (!amount) {
      setConvertedAmount("");
      setExchangeRate(0);
    }
  }, [amount, fromCurrency, toCurrency, fromCurrencyInfo]);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert('Copied to clipboard!');
  };

  return (
    <div 
      className="w-full min-h-screen flex flex-col lg:flex-row gap-6 justify-center items-start lg:items-center p-4 sm:p-6 bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="w-full max-w-md mx-auto lg:mx-0 border border-white/30 rounded-3xl p-6 sm:p-8 backdrop-blur-xl bg-white/10 shadow-2xl glow-card">
        <h1 className="text-3xl font-bold text-white text-center mb-6 tracking-wide drop-shadow-md">
          Currency Converter
        </h1>

        <div>
          <div className="w-full mb-3 glow-input">
            <InputBox
              label="From"
              amount={amount}
              currencyOptions={currencyOptions}
              onCurrencyChange={(currency) => setFromCurrency(currency)}
              selectedCurrency={fromCurrency}
              onAmountChange={(newAmount) => setAmount(newAmount)}
            />
          </div>

          <div className="relative w-full h-1 my-3">
            <button
              className="absolute left-1/2 top-1/2 border-4 border-slate-800 rounded-full bg-blue-500 text-white p-2 shadow-lg hover:bg-blue-600 transition-all duration-300 cursor-pointer glow-button hover:shadow-cyan-500/50"
              style={{ transform: `translate(-50%, -50%) rotate(${rotation}deg)` }}
              onClick={swapCurrency}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 7.5L7.5 3m0 0L12 7.5M7.5 3v13.5m13.5 0L16.5 21m0 0L12 16.5m4.5 4.5V7.5"
                />
              </svg>
            </button>
          </div>

          <div className="w-full mt-3 mb-6 glow-input">
            <InputBox
              label="To"
              amount={convertedAmount}
              currencyOptions={currencyOptions}
              onCurrencyChange={(currency) => setToCurrency(currency)}
              selectedCurrency={toCurrency}
              amountDisabled={true}
            />
          </div>

          {exchangeRate > 0 && amount && (
            <div className="mb-4 p-3 bg-white/10 rounded-xl border border-white/20 text-white text-center text-sm backdrop-blur-sm glow-rate">
              <p className="text-white/70 text-xs">Exchange Rate</p>
              <p className="text-lg font-bold text-cyan-300">1 {fromCurrency.toUpperCase()} = {exchangeRate.toFixed(2)} {toCurrency.toUpperCase()}</p>
            </div>
          )}

          {convertedAmount && (
            <button
              onClick={() => copyToClipboard(convertedAmount)}
              className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-indigo-600 text-white px-4 py-3 rounded-2xl font-semibold text-sm tracking-wide hover:scale-[1.02] hover:from-cyan-300 hover:via-blue-500 hover:to-indigo-700 transition-all duration-300 shadow-[0_10px_30px_rgba(6,182,212,0.35)] border border-white/20 glow-button"
            >
              <span className="text-base">📋</span>
              <span>Copy Result: {convertedAmount}</span>
            </button>
          )}
        </div>
      </div>

      {history.length > 0 && (
        <div className="w-full lg:w-64 max-h-96 overflow-y-auto border border-white/20 rounded-2xl p-4 backdrop-blur-xl bg-white/5 shadow-lg glow-history">
          <h2 className="text-white font-bold text-lg mb-4 text-center">History</h2>
          <div className="space-y-2">
            {history.map((entry) => (
              <div 
                key={entry.id}
                onClick={() => copyToClipboard(entry.result)}
                className="p-3 bg-white/10 rounded-lg border border-white/10 text-white text-xs cursor-pointer hover:bg-white/20 transition-all hover:border-cyan-300/50"
              >
                <p className="font-semibold text-cyan-300">{entry.amount} {entry.from}</p>
                <p className="text-white/70">→ {entry.result} {entry.to}</p>
                <p className="text-white/50 text-xs mt-1">@{entry.rate.toFixed(2)}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
