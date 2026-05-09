import React, { useEffect, useId, useMemo, useRef, useState } from 'react';

function InputBox({
    label,
    amount,
    onAmountChange,
    onCurrencyChange,
    currencyOptions = [],
    selectedCurrency = "usd",
    amountDisabled = false,
    currencyDisabled = false,
    className = "",
}) {
    const amountInputId = useId();
    const [searchTerm, setSearchTerm] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const pickerRef = useRef(null);
    const openUpward = label?.toLowerCase() === 'from';

    const filteredCurrencies = useMemo(() => {
        const term = searchTerm.trim().toLowerCase();
        if (!term) return currencyOptions;

        return currencyOptions.filter((currency) =>
            currency.toLowerCase().includes(term)
        );
    }, [currencyOptions, searchTerm, selectedCurrency]);

    const hasSearchTerm = searchTerm.trim().length > 0;

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (pickerRef.current && !pickerRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    const handleCurrencySelect = (currency) => {
        onCurrencyChange && onCurrencyChange(currency);
        setSearchTerm('');
        setIsOpen(false);
    };

    return (
        <div className={`bg-white/10 p-4 rounded-2xl flex items-center justify-between shadow-inner border border-white/10 transition-all hover:bg-white/20 ${className}`}>
            
            {/* Left Side: Label and Number Input */}
            <div className="w-1/2 pr-4">
                <label htmlFor={amountInputId} className="text-white/70 mb-2 inline-block font-medium text-sm">
                    {label}
                </label>
                <input 
                    id={amountInputId}
                    className="outline-none w-full bg-transparent py-1.5 text-cyan-100 font-bold text-3xl placeholder-cyan-100/35 disabled:text-cyan-200"
                    type="number"
                    placeholder="0"
                    disabled={amountDisabled}
                    value={amount}
                    onChange={(e) => {
                        const val = e.target.value;
                        // If the box is cleared, pass an empty string. Otherwise, convert to a number.
                        onAmountChange && onAmountChange(val === "" ? "" : Number(val));
                    }}
                />
            </div>

            {/* Right Side: Currency Dropdown */}
            <div className="w-1/2 flex flex-col justify-end items-end text-right">
                <p className="text-white/70 mb-2 w-full font-medium text-sm">Currency</p>
                <div className="mb-2 flex w-full items-center justify-between gap-2">
                    <span className="inline-flex items-center gap-2 rounded-full border border-amber-300/25 bg-amber-400/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-amber-100 shadow-[0_0_18px_rgba(251,191,36,0.12)] whitespace-nowrap">
                        <span className="h-1.5 w-1.5 rounded-full bg-amber-300" />
                        Selected {selectedCurrency}
                    </span>
                    <button
                        type="button"
                        onClick={() => {
                            setSearchTerm('');
                            setIsOpen(true);
                        }}
                        className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-[10px] font-medium text-white/70 transition hover:bg-white/10 hover:text-white"
                        disabled={currencyDisabled}
                    >
                        Clear
                    </button>
                </div>
                <div ref={pickerRef} className="relative w-full">
                    <input
                        type="text"
                        value={searchTerm}
                        onFocus={() => !currencyDisabled && setIsOpen(true)}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setIsOpen(true);
                        }}
                        placeholder={`Search currency (${selectedCurrency})`}
                        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-sm font-medium text-white placeholder-white/45 shadow-sm outline-none transition hover:bg-white/20 focus:border-cyan-300 focus:ring-2 focus:ring-cyan-400/40 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={currencyDisabled}
                    />
                    <p className="mt-2 text-[11px] text-white/50">Type to search currencies</p>

                    {isOpen && !currencyDisabled && (
                        <div className={`absolute right-0 z-50 w-full overflow-hidden rounded-2xl border border-white/15 bg-slate-950/90 shadow-2xl backdrop-blur-xl ${openUpward ? 'bottom-full mb-2' : 'mt-2'}`}>
                            <div className="flex items-center justify-between border-b border-white/10 px-3 py-2 text-[11px] text-white/50">
                                <span>{hasSearchTerm ? `${filteredCurrencies.length} result${filteredCurrencies.length === 1 ? '' : 's'}` : 'Browse all currencies'}</span>
                                <span className="rounded-full border border-amber-300/25 bg-amber-400/15 px-2 py-0.5 text-amber-100 whitespace-nowrap">{selectedCurrency.toUpperCase()}</span>
                            </div>

                            <div className="max-h-56 overflow-y-auto p-2">
                                {filteredCurrencies.length > 0 ? (
                                    filteredCurrencies.map((currency) => {
                                        const isActive = currency === selectedCurrency;
                                        return (
                                            <button
                                                key={currency}
                                                type="button"
                                                onClick={() => handleCurrencySelect(currency)}
                                                className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${isActive ? 'bg-amber-500/20 text-amber-100' : 'text-white hover:bg-white/10'}`}
                                            >
                                                <span className="font-medium uppercase tracking-wide">{currency}</span>
                                                {isActive && <span className="text-amber-200">Selected</span>}
                                            </button>
                                        );
                                    })
                                ) : (
                                    <div className="rounded-xl border border-dashed border-white/15 px-3 py-6 text-center text-sm text-white/50">
                                        No currencies found
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );    
}

export default InputBox;