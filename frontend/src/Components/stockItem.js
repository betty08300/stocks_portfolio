import React from 'react';
import {currencyFormatter} from '../Constants/helper';


const StockItem = ({stock, stockInfos}) => {
    console.log(stockInfos)
    const {ticker, company, share} = stock;
    const {changePercentage, color, latestPrice} = stockInfos
    console.log('stock:', stock);

    return (
      <tr>
        <td style={{color}}>{ticker + ' (' + changePercentage + ')'}</td>
        <td>{company}</td>
        <td> {share}</td>
        <td style={{color}}>${currencyFormatter(latestPrice)}
        </td>
        <td> ${currencyFormatter((latestPrice * share).toFixed(2))}</td>
      </tr>
    )
}

export default StockItem; 