import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StockItem from './stockItem';
import {apiKey} from '../Constants/index'
import {currencyFormatter} from '../Constants/helper'

const Portfolio = (props) => {
  const [ticker, setTicker] = useState('');
  const [qty, setQty] = useState('');
  const [ stocks, setStocks ] = useState([]);
  const [stockPrices, setStockPrices] = useState({})

  useEffect(()=> {fetchPortfolio()}, []); 
  
  const getStockInfoAPI = () => {
    return fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${apiKey}`)
      .then(response => response.json()).then(res => {
        return { 
          companyName: res.companyName,
          latestPrice: res.latestPrice,
        }
      })
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

  const handleChange = (e) => {
    setTicker(e.target.value.toUpperCase());
  }

  const handleSetQty = (e) => {
    setQty(Number(e.target.value));
  };

  const totalPortfolio = stocks.length > 0 ? stocks.reduce((acc, {ticker, share}) => {
      return acc + (stockPrices[ticker] * share)}, 0)
    : 0
  // const totalValue = (stock) => stock.amount * stock.latestPrice;

  const stockItems = stocks.map((stock, idx) =>  
      <StockItem stock={stock} key={idx} price={stockPrices[stock.ticker]}/>
    ) 
  
  console.log('stockPrices:',stockPrices)
  return (
    <div className="container">
      <h1 className="row">
        Portfolio ${currencyFormatter(totalPortfolio)}
      </h1>
      <div className="row">
        <div className="col">
          {stockItems}
        </div>
        <div className="col">
          <div className="row">
            Cash - $XXXXX
            Cost - $xxxx
          </div>
          <div>
            {/* <form onSubmit={handleSubmit}>
              <input className="row" type='text' value={ticker} onChange={handleChange} placeholder='Ticker'/>
              <input className="row" type='number' value={qty} onChange={handleSetQty} placeholder='QTY'/>
              <button className="row">Buy</button>
            </form> */}
          </div>
        </div>
      </div>
      <div className='left-container'>
        <div></div>
        <Link to='/dashboard/transactions'>Transaction</Link>
        
      </div>

     
    </div>
  )
}

export default Portfolio;

