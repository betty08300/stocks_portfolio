import React, { useState } from 'react';

const TransactionsItem = (props) => {
    const {ticker, company, transactionTime, status, share, price} = props.transaction

    

    return (
        <div>
            <div>Status</div>
            {status}
            <div>Company</div>
            {company}
            <div>Ticker</div>
            {ticker}
            <div>Shares</div>
            {share}
            <div>Price</div>
            ${price.toFixed(2)}
            <div>Time</div>
            {transactionTime}
        </div>
    )
}

export default TransactionsItem; 