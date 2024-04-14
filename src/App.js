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
          `https://api.frankfurter.app/latest?amount=${amount}&from=${currToConvert}&to=${currConverted}`,
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
    [amount, currToConvert, currConverted],
  );

  return (
    <>
      <div class="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <div class="relative bg-white px-6 pb-8 pt-10 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div class="divide-y divide-gray-300/50">
            <Header />

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
        </div>
      </div>
    </>
  );
}

function Header() {
  return (
    <>
      <header class="py-8 text-center text-2xl font-bold">
        Currency Converter
      </header>
    </>
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
    <div class="space-y-6 py-8 text-center text-lg leading-7 text-gray-600">
      <div className="flex items-center justify-center space-x-4">
        <input
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          type="text"
          value={amount}
          onChange={onAmountChange}
          disabled={isLoading}
        />
        <select
          className=" rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
          className="rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={currConverted}
          onChange={(e) => onSetCurrConverted(e.target.value)}
          disabled={isLoading}
        >
          <option value="USD">USD</option>
          <option value="AUD">AUD</option>
          <option value="CNY">CNY</option>
          <option value="SGD">SGD</option>
        </select>
      </div>
    </div>
  );
}

function Output({ currConverted, convertedAmount, isLoading }) {
  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <div class="pt-10 text-center text-xl font-semibold leading-7">
      <p class="text-sky-500 hover:text-sky-600">
        {convertedAmount} {currConverted}
      </p>
    </div>
  );
}
