import React from 'react';
import {currencyFormatter} from '../Constants/helper';


const StockItem = ({stock, stockInfos}) => {
    const {ticker, company, share} = stock;
    const {changePercentage, color, latestPrice} = stockInfos

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