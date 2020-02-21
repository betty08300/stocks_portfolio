import React,{ useState } from 'react';

const Portfolio = (props) => {
  const [tradePrice, changePrice] = useState('');
  const [company, changeCompany] = useState('');
  const [ticker, changeSymbol] = useState('');
  const [qty, changeQty] = useState('');
  
  const fetchApi= (symbol) => {
      return fetch(`https://cloud.iexapis.com/stable/stock/${symbol}/quote?token=pk_c622cbf9ade1471e93a7dd24a2906b13`)
        .then(response => response.json()).then(resp => {
          console.log(resp); 
        });
    };

  const handleSubmit = async(e) => {
    e.preventDefault();
    fetchApi(e.target.value)
  }

  const handleChange = () => {

  }

  const handChangeQty = () => {
    
  }

  return (
    <div>
      <div className='left-container'>
        <div>Cash</div>
        <div>
          <form onSubmit={handleSubmit}>
            <input type='text' value={ticker} onChange={handleChange}/>
            <input type='number' value={qty} onChange={handChangeQty}/>
            <button>Buy</button>
          </form>
        </div>
      </div>

      <div className='company'>
        {resp.companyName}
      </div>
    </div>
  )
}

export default Portfolio;

