import React, { useState } from 'react';

const Portfolio = (props) => {
  // const [tradePrice, changePrice] = useState('');
  // const [company, changeCompany] = useState('');
  const [ticker, changeTicker] = useState('');
  const [qty, changeQty] = useState('');
  
  const getStockInfoAPI= () => {
    return fetch(`https://cloud.iexapis.com/stable/stock/${ticker}/quote?token=pk_c622cbf9ade1471e93a7dd24a2906b13`)
      .then(response => response.json()).then(resp => {
        return { 
          companyName: resp.companyName,
          latestPrice: resp.latestPrice,
        }
      })
  }
    
    const handleSubmit = async(e) => {
      e.preventDefault();
      const {companyName, latestPrice} = await getStockInfoAPI()
      console.log(companyName, latestPrice, ticker, qty)
      // get latestPrice by doing resp.latestPrice
      // pass latestPrice and qty to backend, so backend can calculate user's current amount vs spending amount the amount spent as well as how many stocks were bought
      // spending amount is the amount the user just submitted
  }

  const handleChange = (e) => {
    changeTicker(e.target.value)
  }

  const handChangeQty = (e) => {
    changeQty(e.target.value)
  }

  return (
    <div className="container banana">
      <h1 className="row">
        Portfolio ($XXXXXX)
      </h1>
      <div className="row">
        <div className="col">
          Portfolio Part
        </div>
        <div className="col">
          <div className="row">
            Cash - $XXXXX
          </div>
          <div>
            <form onSubmit={handleSubmit}>
              <input className="row" type='text' value={ticker} onChange={handleChange} placeholder='Ticker'/>
              <input className="row" type='number' value={qty} onChange={handChangeQty} placeholder='QTY'/>
              <button className="row">Buy</button>
            </form>
          </div>
        </div>
      </div>
      <div className='left-container'>
        <div></div>
        
      </div>

      <div className='company'>
  
      </div>
    </div>
  )
}

export default Portfolio;

