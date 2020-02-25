import React from 'react';
import {currencyFormatter} from '../Constants/helper'

const StockItem = ({stock, price}) => {
    const {ticker, company, share} = stock;
    console.log(stock, price)
    return (
        <div>
            <div>Company</div>
            {company}
            <div>Ticker</div>
            {ticker}
            <div>Shares</div>
            {share}
            <div>Price</div>
            ${currencyFormatter(price)}
            <div>Total Value</div>
            ${currencyFormatter(price * share)}
        </div>
    )
}

export default StockItem; 