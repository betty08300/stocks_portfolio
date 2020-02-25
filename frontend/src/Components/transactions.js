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
            <h3>Transaction</h3>
            {transactionItems}
            <Link to='/dashboard/portfolio'>Portfolio</Link>
        </div>
    )
}

export default Transactions; 