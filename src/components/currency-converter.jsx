import { useEffect, useState } from "react";
import CurrencyDropdown from "./dropdown";
import { HiArrowsRightLeft } from "react-icons/hi2";
const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [amount, setAmount] = useState(1);
  const [fromCurrency, setfromCurrency] = useState("USD");
  const [toCurrency, settoCurrency] = useState("INR");
  const [convertedAmount, setconvertedAmount] = useState(null);
  const [converting, setConverting] = useState(false);

  const fetchCurrencies = async () => {
    try {
      const res = await fetch("https://api.frankfurter.app/currencies");
      const data = await res.json();
      setCurrencies(Object.keys(data));
    } catch (error) {
      console.log("Error fetching", error);
    }
  };

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const convertCurrency = async () => {
    if (!amount) return;

    setConverting(true);
    try {
      const res = await fetch(
        `https://api.frankfurter.app/latest?amount=${amount}&from=${fromCurrency}&to=${toCurrency}`
      );
      const data = await res.json();
      setconvertedAmount(`${data.rates[toCurrency]} ${toCurrency}`);
    } catch (error) {
      console.log("Error fetching", error);
    } finally {
      setConverting(false);
    }
  };

  const swapCurrencies = () => {
    const temp = fromCurrency;
    setfromCurrency(toCurrency);
    settoCurrency(temp);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb] px-4">
      <div className="w-full max-w-lg bg-white rounded-3xl p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-100">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800">
          Currency Converter
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 items-end">
          <CurrencyDropdown
            currencies={currencies}
            setCurrency={setfromCurrency}
            currency={fromCurrency}
            title="From"
          />
          <div className="flex justify-center">
            <button
              onClick={swapCurrencies}
              className="p-3 bg-purple-100 text-purple-600 rounded-full hover:bg-purple-200 transition-all duration-300 hover:rotate-180 shadow-sm"
            >
              <HiArrowsRightLeft className="text-xl" />
            </button>
          </div>
          <CurrencyDropdown
            currencies={currencies}
            setCurrency={settoCurrency}
            currency={toCurrency}
            title="To"
          />
        </div>
        <div className="mt-10">
          <label className="block text-sm font-semibold mb-2 text-gray-700">
            Amount
          </label>
          <input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            type="number"
            className="w-full px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 shadow-sm hover:shadow-md"
          />
          <div className="flex justify-end mt-8">
            <button
              onClick={convertCurrency}
              className={`px-6 py-3 rounded-xl font-semibold bg-purple-600 text-white hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg ${converting ? "animate-pulse" : ""
                }`}
            >
              {converting ? "Converting..." : "Convert"}
            </button>
          </div>
        </div>
        {convertedAmount && (
          <div className="mt-10 text-center text-xl font-semibold text-purple-700 bg-purple-50 py-4 rounded-xl shadow-inner">
            {amount} {fromCurrency} = {convertedAmount}
          </div>
        )}
      </div>
    </div>
  );
};

export default CurrencyConverter;

