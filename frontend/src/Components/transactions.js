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

    const transactionItems = transactions.map((transaction, index) => {
        return <TransactionItem transaction={transaction} key={index}/>
    })

    return (
        <div className="p-5">
            <div className='d-flex justify-content-between align-items-center transaction-title'>
                
                   
                        <h3 className="col-auto mr-auto">Transaction</h3>
                        <Link to='/dashboard/portfolio' className="col-auto">Back To Portfolio</Link>
        
               
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