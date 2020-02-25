import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StockItem from './stockItem';
import {apiKey} from '../Constants/index'
import {currencyFormatter} from '../Constants/helper'

const Portfolio = (props) => {
  const [ticker, setTicker] = useState('');
  const [share, setShare] = useState('');
  const [ stocks, setStocks ] = useState([]);
  const [stockPrices, setStockPrices] = useState({})

  useEffect(()=> {fetchPortfolio()}, []); 
  
  const getStockInfoAPI = async(ticker) => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${apiKey}`)
    const stock = await res.json()
    return { 
      companyName: stock.companyName,
      price: stock.latestPrice,
    }
  }

  const getStocksInfoAPI = (tickers) => {
    return fetch(`https://cloud.iexapis.com/v1/stock/market/batch?types=quote&symbols=${tickers}&range=5y%20&token=${apiKey}`)
      .then(response => response.json()).then(res => {
        const stockLatestPrices = {};

        for(const key in res){
          stockLatestPrices[key] = res[key].quote.latestPrice;
        }

        return stockLatestPrices;
      })
  }
  

  const fetchPortfolio = async() => {
    const res = await fetch('/dashboard/portfolio', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        },
    })
    const portfolio = await res.json();
    const portfolioStocks = portfolio.stocks;
    const portfolioTickers = portfolioStocks.map(({ticker}) => ticker);
    const prices = await getStocksInfoAPI(portfolioTickers.join(','));
    
    setStocks(portfolioStocks);
    setStockPrices(prices);
  }

  const handleSubmit = async(e) => {
    e.preventDefault();
    const stockInfo = await getStockInfoAPI(ticker);
    const order = { ticker, share, ...stockInfo }; 
    const response = await fetch('/dashboard/portfolio', {
      method: 'POST',
      headers: {
          'Content-Type': 'application/json'
      },
     
      body: JSON.stringify({ order })
    })
    console.log(await response.json()); 
    
  }

  const handleChange = (e) => {
    setTicker(e.target.value.toUpperCase());
  }

  const handleSetShare = (e) => {
    setShare(Number(e.target.value));
  };

  const totalPortfolio = stocks.length > 0 ? stocks.reduce((acc, {ticker, share}) => {
      return acc + (stockPrices[ticker] * share)}, 0)
    : 0
  
  const stockItems = stocks.map((stock, idx) =>  
      <StockItem stock={stock} key={idx} price={stockPrices[stock.ticker]}/>
    ) 
  
  console.log('stockPrices:',stockPrices)
  return (
    <div>
      <h1>
        Portfolio ${currencyFormatter(totalPortfolio.toFixed(2))}
      </h1>

      <div>

      <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Ticker</th>
                    <th scope='col'>Shares</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Total Value</th>

                </tr>
            </thead>
            <tbody>
              {stockItems}
            </tbody>
            </table>


        <div>
          <div>
            Cash - $XXXXX
            Cost - $xxxx
          </div>
          <div>



            <form onSubmit={handleSubmit}>
              <input className="row" type='text' value={ticker} onChange={handleChange} placeholder='Ticker'/>
              <input className="row" type='number' value={share} onChange={handleSetShare} placeholder='Share'/>
              <button className="row">Buy</button>
            </form>
          </div>
        </div>
      </div>
      <div>
        <div></div>
        <Link to='/dashboard/transactions'>Transaction</Link>
        
      </div>

     
    </div>
  )
}

export default Portfolio;

