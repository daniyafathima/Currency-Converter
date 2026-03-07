const CurrencyDropdown = ({
  currencies,
  setCurrency,
  currency,
  title = " ",
})=>{
  return(
    <div>
      <label htmlFor={title} > {title} </label>
      <select value={currency} onChange={(e)=>setCurrency(e.target.value)} >
        {currencies?.map((currency)=>(
          <option key={currency} value={currency} >{currency}</option>
        ))}
      </select>
    </div>
  )
}
export default CurrencyDropdown