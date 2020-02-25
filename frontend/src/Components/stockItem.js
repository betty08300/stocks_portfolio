import React from 'react';
import {currencyFormatter} from '../Constants/helper';


const StockItem = ({stock, price}) => {
    const {ticker, company, share} = stock;
    console.log('stock:', stock);
    

    return (

        <tr>
            <td>{ticker}
                <div>
                    {company}
                </div>
            </td>
            <td> {share}</td>
            <td>${currencyFormatter(price)}
            </td>
            <td> ${currencyFormatter((price * share).toFixed(2))}</td>
            
        </tr>
        
    )
}

export default StockItem; 