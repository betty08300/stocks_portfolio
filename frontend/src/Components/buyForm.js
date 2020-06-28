import React, { useState, useEffect } from 'react';
import { css } from "@emotion/core";
import { apiKey } from '../Constants/index'
import { currencyFormatter } from '../Constants/helper'
import ScaleLoader from "react-spinners/ScaleLoader";

const spinner = css`
  position: absolute;
  top: 30%;
  left: 30%;
`


const BuyForm = ({ funds, fetchPortfolio }) => {
  const [allTickers, setAllTickers] = useState([]);
  const [allTickersObj, setAllTickersObj] = useState({});
  const [stockInfo, setStockInfo] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [share, setShare] = useState(1);
  const [ticker, setTicker] = useState('');
  const [isLoadingCost, setIsLoadingCost] = useState(false);
  const [clicked, setClicked] = useState(false);
  const [fundError, setFundError] = useState('');
  const [companies, setCompanies] = useState({});


  useEffect(() => {
    fetchAllTickers()
  }, [])

  const getStockInfoAPI = async (ticker) => {
    const res = await fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=${apiKey}`)
    const stock = await res.json()
    return {
      company: stock.companyName,
      price: stock.latestPrice
    }
  }

  const getAllTickers = async () => {
    const res = await fetch(`https://cloud.iexapis.com/beta/ref-data/symbols?token=${apiKey}`)
    const stocks = await res.json();
    const tickersObj = {}
    const allCompanies = {}
    const tickers = stocks.map(stock => {
      tickersObj[stock.symbol] = true
      allCompanies[stock.name] = stock.symbol
      return stock.symbol
    })

    setCompanies(allCompanies);

    return { tickers, tickersObj };
  }

  const fetchAllTickers = async () => {
    const { tickers, tickersObj } = await getAllTickers()
    setAllTickers(tickers)
    setAllTickersObj(tickersObj)
    setTimeout(() => setIsLoading(false), 1000)
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (funds - stockInfo.price * share < 0) {
      setFundError('Not enough funds')
    } else {
      if (fundError) setFundError('');
      const order = { ticker, share, ...stockInfo };
      if (!allTickers.includes(ticker)) return;

      await fetch('/dashboard/portfolio', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ order })
      });
      fetchPortfolio();
    }
  }

  const matches = () => {
    if (ticker.length < 1) {
      return null;
    }

    const matchingTickers = allTickers.filter(symbol => symbol.startsWith(ticker));
    const matchingCompanies = Object.keys(companies)
      .filter((companyName) => companyName.toLowerCase().startsWith(ticker.toLowerCase()))
      .map((companyName) => companies[companyName]);

    let possibleMatches = [...matchingTickers, ...matchingCompanies]
    if (possibleMatches.length === 0) {
      possibleMatches = ['No such ticker'];
    }

    return possibleMatches.slice(0, 5);
  }

  const handleClick = async (ticker) => {
    setIsLoadingCost(true);
    setClicked(true);
    setTicker(ticker);
    setStockInfo(await getStockInfoAPI(ticker));
    setIsLoadingCost(false);
  }

  const handleChange = async (e) => {
    if (clicked) {
      setClicked(false);
    }

    const ticker = e.target.value.toUpperCase()

    if (allTickersObj[ticker]) {
      setIsLoadingCost(true);
      setTicker(ticker);
      setStockInfo(await getStockInfoAPI(ticker));
      setIsLoadingCost(false);
    } else {
      setTicker(ticker)
    }
  }

  const handleSetShare = (e) => {
    setShare(Number(e.target.value));
  };

  let possibleMatches = matches()
    ? matches().map((ticker, idx) => {
      return (
        <div className="mb-3 search-hover text-dark" key={idx} onClick={() => { handleClick(ticker) }} style={{ paddingLeft: '10px' }}>
          {ticker}
        </div>
      )
    })
    : null;

  return (
    <div className='position-relative d-flex align-items-center' style={{ minWidth: '200px', minHeight: '100px' }}>
      {isLoading
        ? <ScaleLoader css={spinner} size={150} color="#36D7B7" loading={isLoading} />
        : (
          <div className="d-flex flex-column align-items-between">
            <div className="d-flex mb-2">
              <h4 className="mr-4">
                Cash - ${currencyFormatter(funds.toFixed(2))}
              </h4>
              <h4 className="position-relative">
                Cost -
                {isLoadingCost ? <span>loading...</span>
                  : (
                    <span>
                      ${currencyFormatter(((stockInfo.price || 0) * share).toFixed(2))}
                    </span>
                  )}
              </h4>
            </div>
            <div>
              <form className="position-relative d-flex" onSubmit={handleSubmit}>
                <input className="pl-2 pr-2 buyInput" type='text' value={ticker} onChange={handleChange} placeholder='Ticker' required />
                <div className={ticker && !clicked ? 'position-absolute bg-white pt-2' : 'd-none'} style={{ top: '29px', width: '183px', marginLeft:"5px" }}> {possibleMatches} </div>
                <input className="pl-2 pr-2 buyInput" type='number' min='1' value={share} onChange={handleSetShare} placeholder='Share' required />
                <button className='btn btn-dark buyBtn' >Buy</button>
              </form>
              {fundError && (
                <div className='text-danger'>
                  {fundError}
                </div>
              )}
            </div>
          </div>
        )
      }
    </div>
  )
}

export default BuyForm;