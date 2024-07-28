import {useState, useEffect} from "react";
import axios from 'axios';
import "./index.css"


export const TransactionTable = () =>{
 
    const [data, setData] = useState([])

    useEffect(()=>{
        axios.get('http://localhost:10000')
        .then(function (response) {
            // handle success
            console.log(response);
            setData([...data, ...response.data])
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
    }, [])

    
    return(
       <div className='table-con'> 
        <table className="finance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Description</th>
            <th>Type</th>
            <th>Amount</th>
            <th>Remaining Balance</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.date}</td>
              <td>{item.description}</td>
              <td>{item.type}</td>
              <td>{item.amount}</td>
              <td>{item.running_balance}</td>
            </tr>
          ))}
        </tbody>
      </table>
      </div>
    )


}

