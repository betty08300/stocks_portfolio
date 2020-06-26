import { css } from "@emotion/core";
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import ScaleLoader from "react-spinners/ScaleLoader";
import StockItem from './stockItem';
import { apiKey } from '../Constants/index'
import { currencyFormatter } from '../Constants/helper'
import BuyForm from './buyForm'

const spinner = css`
  position: absolute;
  top: 50%;
  left: 50%;
`

const Portfolio = (props) => {
  const [stocks, setStocks] = useState([]);
  const [funds, setFunds] = useState(null);
  const [stockInfos, setStockInfos] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchPortfolio();
  }, []);

  const getStocksInfoAPI = async (tickers) => {
    const res = await fetch(`https://cloud.iexapis.com/v1/stock/market/batch?types=quote&symbols=${tickers}&range=5y%20&token=${apiKey}`);
    const stocks = await res.json()
    const stockLatestPrices = {};
    for (const key in stocks) {
      const open = stocks[key].quote.open === null ? stocks[key].quote.previousClose : stocks[key].quote.open;
      const latestPrice = stocks[key].quote.latestPrice;
      const change = (latestPrice - open) / open
      let color;

      if (change < 0) {
        color = '#ff000091';
      } else if (change === 0) {
        color = 'grey';
      } else {
        color = '#096324';
      }

      stockLatestPrices[key] = {
        changePercentage: (change * 100).toFixed(2) + '%',
        color,
        latestPrice,
      };
    }
    return stockLatestPrices;
  }


  const fetchPortfolio = async () => {
    const res = await fetch('/dashboard/portfolio', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
    })
    const portfolio = await res.json();
    const portfolioStocks = portfolio.stocks;

    if (portfolioStocks.length) {
      const portfolioTickers = portfolioStocks.map(({ ticker }) => ticker);
      const prices = await getStocksInfoAPI(portfolioTickers.join(','));
      setStockInfos(prices);
      setStocks(portfolioStocks);
    }

    setFunds(portfolio.funds)
    setIsLoading(false);
  }

  const totalPortfolio = stocks.reduce((sum, { ticker, share }) => {
    console.log(ticker);
    return sum + (stockInfos[ticker].latestPrice * share);
  }, 0)


  const stockItems = stocks.map((stock, idx) =>
    <StockItem stock={stock} key={idx} stockInfos={stockInfos[stock.ticker]} />
  )

  return isLoading ?
    <ScaleLoader css={spinner} size={150} color="#36D7B7" loading={isLoading} />
    : (
      <div className="p-5">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex flex-column">
            <div>
              <Link to='/dashboard/transactions'>Go To Transaction</Link>
            </div>
            <h1>
              Portfolio ${currencyFormatter(totalPortfolio.toFixed(2))}
            </h1>
          </div>
          <BuyForm funds={funds} fetchPortfolio={fetchPortfolio} />
        </div>
        <div>
          <table className='table'>
            <thead>
              <tr>
                <th scope='col'>Ticker</th>
                <th scope='col'>Company</th>
                <th scope='col'>Shares</th>
                <th scope='col'>Price</th>
                <th scope='col'>Total Value</th>
              </tr>
            </thead>
            <tbody>
              {stockItems}
            </tbody>
          </table>
        </div>

      </div>
    )
}

export default Portfolio;

