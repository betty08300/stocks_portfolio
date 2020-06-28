import React from 'react';

const TransactionsItem = (props) => {
    const {ticker, company, transactionTime, status, share, price} = props.transaction
    const date = transactionTime.split('T')[0];
    const time = transactionTime.split('T')[1].split('.')[0];
    

    return (

        <tr>
            <td>{status}</td>
            <td>{ticker} 
            <div>{company}</div>
            </td>
            <td>{share}</td>
            <td>${price.toFixed(2)}</td>
            <td>{date}
            <div>{time}</div>
            </td>
        </tr>
           
    )
}

export default TransactionsItem; 