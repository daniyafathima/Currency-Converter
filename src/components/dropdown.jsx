import { HiOutlineStar } from "react-icons/hi2";

const CurrencyDropdown = ({
  currencies,
  currency,
  setCurrency,
  title = " ",
}) => {
  return (
    <div className="flex flex-col">
      <label
        htmlFor={title}
        className="text-sm font-semibold mb-2 tracking-wide text-gray-700"
      >
        {title}
      </label>

      <select
        value={currency}
        onChange={(e) => setCurrency(e.target.value)}
        className="px-4 py-3 rounded-xl bg-gray-50 border border-gray-300 focus:border-purple-500 focus:ring-2 focus:ring-purple-200 transition-all duration-300 shadow-sm hover:shadow-md cursor-pointer"
      >
        {currencies?.map((currency) => (
          <option key={currency} value={currency}>
            {currency}
          </option>
        ))}
      </select>
    </div>
  );
};

export default CurrencyDropdown;
