import React, { useState } from 'react';

const StockItem = (props) => {
    const {ticker, company, share} = props.stock;

    

    return (
        <div>
            <div>Company</div>
            {company}
            <div>Ticker</div>
            {ticker}
            <div>Shares</div>
            {share}
        </div>
    )
}

export default StockItem; 