import { useEffect, useState } from "react";

export default function App() {
  const [amount, setAmount] = useState(1);
  const [currToConvert, setCurrToConvert] = useState("AUD");
  const [currConverted, setCurrConverted] = useState("CNY");
  const [convertedAmount, setConvertedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

  function handleAmountChange(e) {
    setAmount(Number(e.target.value));
  }

  function handleCurrToConvert(value) {
    setCurrToConvert(value);
  }

  function handleCurrConverted(value) {
    setCurrConverted(value);
  }

  useEffect(
    function () {
      async function currencyConvert() {
        setIsLoading(true);

        const res = await fetch(
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currToConvert}&to=${currConverted}`
        );
        const data = await res.json();

        setConvertedAmount(data.rates[currConverted]);
        setIsLoading(false);
      }
      if (currConverted === currToConvert) return setConvertedAmount(amount);
      else {
        currencyConvert();
      }
    },
    [amount, currToConvert, currConverted]
  );

  return (
    <div>
      <Input
        amount={amount}
        currToConvert={currToConvert}
        currConverted={currConverted}
        onAmountChange={handleAmountChange}
        onSetCurrToConver={handleCurrToConvert}
        onSetCurrConverted={handleCurrConverted}
        isLoading={isLoading}
      />
      <Output
        currConverted={currConverted}
        convertedAmount={convertedAmount}
        isLoading={isLoading}
      />
    </div>
  );
}

function Input({
  amount,
  currToConvert,
  currConverted,
  onAmountChange,
  onSetCurrToConver,
  onSetCurrConverted,
  isLoading,
}) {
  return (
    <>
      <input
        type="text"
        value={amount}
        onChange={onAmountChange}
        disabled={isLoading}
      />
      <select
        value={currToConvert}
        onChange={(e) => onSetCurrToConver(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="CNY">CNY</option>
        <option value="SGD">SGD</option>
      </select>
      <select
        value={currConverted}
        onChange={(e) => onSetCurrConverted(e.target.value)}
        disabled={isLoading}
      >
        <option value="USD">USD</option>
        <option value="AUD">AUD</option>
        <option value="CNY">CNY</option>
        <option value="SGD">SGD</option>
      </select>
    </>
  );
}

function Output({ currConverted, convertedAmount, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <p>
      {convertedAmount} {currConverted}
    </p>
  );
}
