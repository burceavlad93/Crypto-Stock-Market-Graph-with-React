import React from 'react';
import Chart from 'chart.js/auto';
import { Line } from 'react-chartjs-2';
import { useState } from 'react';
import { useEffect } from 'react';


function CryptoChart(props) {
    //--------------------------------------------------------------Variables----------------------------------------------------------------------------------------
    console.log('----- RENDER Graph-----')
    const [cryptoStockPrices, setCryptoStockPrices] = useState([])
    const [cryptoCoin, setCryptoCoin] = useState('');
    const [exchangeRate, setExchangeRate] = useState('');
    //--------------------------------------------------------------GET API CALL DATA--------------------------------------------------------------------------------
    function getCryptopId() {
        props.crypto.map((coin) => {
            if (coin.name === props.cryptoCurrency && coin.id !== cryptoCoin) {
                setCryptoCoin(coin.id);
            }
        });
        console.log('found crypto ID--> ', cryptoCoin)
    }

    function getCurrencyId() {
        props.currencies.map((currency) => {
            if (currency.name === props.realWorldCurrency && currency.id.toLowerCase() !== exchangeRate) {
                setExchangeRate(currency.id.toLowerCase())
            }
        });
        console.log('found exchange ID --> ', exchangeRate)
    }

    //--------------------------------------------------------------CALL API-----------------------------------------------------------------------------------------
    getCryptopId();
    getCurrencyId();
    useEffect(() => {
        fetch(`https://api.coingecko.com/api/v3/coins/${cryptoCoin}/market_chart?vs_currency=${exchangeRate}&days=${props.timePeriod}&interval=daily`)
            .then((response) => response.json())
            .then((stockPrices) => setCryptoStockPrices(stockPrices.prices))

        console.log('!!!!!', cryptoCoin, exchangeRate, props.timePeriod)
    }, [props.timePeriod, props.cryptoCurrency, props.realWorldCurrency]);

    console.log(cryptoStockPrices)
    console.log(`****> Received from parent day: ${props.timePeriod}, coin: ${cryptoCoin}, exchange: ${exchangeRate}`)
    //--------------------------------------------------------------GENRATE CRYPTO GRAPH-----------------------------------------------------------------------------
    const options = {
        responsive: true,
        scales: {
            y: {
                grace: '25%',
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: `${props.cryptoCurrency} evolution in the last ${props.timePeriod} days`,
            },
        },
    };

    const dateFormat = { year: 'numeric', month: 'short', day: 'numeric' }
    const labels = cryptoStockPrices.map((date, index) => new Intl.DateTimeFormat('en-GB', dateFormat).format(cryptoStockPrices[index][0]));
    const data = {
        labels,
        datasets: [
            {
                fill: true,
                label: props.realWorldCurrency,
                data: cryptoStockPrices.map((value) => value[1].toFixed(2)),
                borderColor: 'rgb(53, 162, 235)',
                borderWidth: 1,
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    return <Line className='graph' options={options} data={data} />
};

export default CryptoChart;