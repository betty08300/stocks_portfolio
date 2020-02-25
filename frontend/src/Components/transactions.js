import React, { useState, useEffect} from 'react';
import TransactionItem from './transactionItem';
import { Link } from 'react-router-dom';


const Transactions = (props) => {
    const [transactions, setTransactions ] = useState([]);
    useEffect(()=> {
        fetchTransactions()
    }, []); 

    const fetchTransactions = async() => {
        const res = await fetch('/dashboard/transactions', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
        })
        const data = await res.json();
        setTransactions(data.transactions); 
    }

    console.log(transactions);

    const transactionItems = transactions.map((transaction, index) => {
        return <TransactionItem transaction={transaction} key={index}/>
    })

    return (
        <div>
            <div className='container'>
                <div className='row'>
                    <div className='col'>
                        <h3>Transaction</h3>
                    </div>
                    <div className='col'>
                        <Link to='/dashboard/portfolio'>Portfolio</Link>
                    </div>
                </div>
            </div>
            
            <table className='table'>
            <thead>
                <tr>
                    <th scope='col'>Status</th>
                    <th scope='col'>Ticker</th>
                    <th scope='col'>Shares</th>
                    <th scope='col'>Price</th>
                    <th scope='col'>Date/Time</th>
                </tr>
            </thead>
            <tbody>
                {transactionItems}
            </tbody>
            </table>
        </div>
    )
}

export default Transactions; 