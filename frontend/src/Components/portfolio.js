import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import StockItem from './stockItem'; 

const Portfolio = (props) => {
  const [ticker, changeTicker] = useState('');
  const [qty, changeQty] = useState('');
  const [ stocks, setStocks ] = useState([]);

  useEffect(()=> {fetchPortfolio()}, []); 
  
  const getStockInfoAPI= () => {
    return fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_c622cbf9ade1471e93a7dd24a2906b13`)
      .then(response => response.json()).then(resp => {
        return { 
          companyName: resp.companyName,
          latestPrice: resp.latestPrice,
        }
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
    console.log(portfolio)
    setStocks(portfolio.stocks);
}

    
  

  const handleChange = (e) => {
    changeTicker(e.target.value.toUpperCase());
  }

  const handChangeQty = (e) => {
    changeQty(Number(e.target.value));
  };

  // const totalValue = (stock) => stock.amount * stock.latestPrice;

  const stockItems = stocks.map((stock, idx) => {
    return <StockItem stock={stock} key={idx}/>
  }) 
  

  return (
    <div className="container banana">
      <h1 className="row">
        Portfolio ($XXXXXX)
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
              <input className="row" type='number' value={qty} onChange={handChangeQty} placeholder='QTY'/>
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

