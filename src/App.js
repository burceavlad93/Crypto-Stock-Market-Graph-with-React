import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import NavBar from './components/NavBar';
import CryptoChart from './components/CryptoChart';
import { useState } from 'react';
import currencies from './components/currencies/currencies.json';
import cryptoCurrencies from './components/currencies/cryptoCurrencies.json';

function App() {
  console.log('----- RENDER App -----')
  //--------------------------------------------------------------Variables--------------------------------------------------------------------------------------
  const [timePeriod, setTimePeriod] = useState(7);
  const [cryptoCurrency, setCryptoCurrency] = useState('Bitcoin');
  const [realWorldCurrency, setRealWorldCurrency] = useState('US Dollar');
  const currency = currencies.data;
  const crypto = cryptoCurrencies;
  //--------------------------------------------------------------Getting Data-----------------------------------------------------------------------------------
  function getCryptoRequest(period, coinName, currencyName) {
    setTimePeriod(period);
    setCryptoCurrency(coinName);
    setRealWorldCurrency(currencyName);
  }

  console.log(`Sending to child day: ${timePeriod}, coin: ${cryptoCurrency}, exchange: ${realWorldCurrency}`);

  return (
    <div className="App">
      <NavBar
        sendDataToParent={getCryptoRequest}
        currencies={currency}
        crypto={crypto}
      />
      <div>
        <CryptoChart className="graph"
          currencies={currency}
          crypto={crypto}
          timePeriod={timePeriod}
          cryptoCurrency={cryptoCurrency}
          realWorldCurrency={realWorldCurrency}
        />
      </div>
    </div>
  );
}

export default App;
