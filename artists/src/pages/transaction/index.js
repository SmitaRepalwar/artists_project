import React, { useState } from 'react';
import {useNavigate} from "react-router-dom"
import './index.css';
import axios from 'axios';

const Transaction = () => {

  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    description: '',
    type: 'debit',
    amount: 0,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value)
    setFormData({
      ...formData,
      [name]: value,
    });
  };


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData)

    const id = null
    const date = new Date()
    const data = {
      ...formData,
       date,
       id
    }
   
    axios.post('http://localhost:4000/add', data)
    .then(function (response) {
      console.log(response);
    })
    .catch(function (error) {
      console.log(error);
    });

    setFormData({
      description: '',
      type: '',
      amount: 0,
    });
    
    navigate("/")
  };

  return (
    <form className="finance-form" onSubmit={handleSubmit}>
    <div className="form-group">
      <label className="form-label">Type:</label>
      <select className="form-input" name="type" value={formData.type} onChange={handleChange} required>
        <option className="form-input"  name="type" value="debit">Debit</option>
        <option className="form-input"  name="type" value="credit">Credit</option>
      </select>
    </div>
    <div className="form-group">
      <label className="form-label">Amount:</label>
      <input className="form-input" type="number" name="amount" value={formData.amount} onChange={handleChange} required />
    </div>
    <div className="form-group">
      <label className="form-label">Description:</label>
      <input className="form-input" type="text" name="description" value={formData.description} onChange={handleChange} required />
    </div>
    <button className="form-button" type="submit">Add Entry</button>
  </form>
  );
};

export default Transaction;
