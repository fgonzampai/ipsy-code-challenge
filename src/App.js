import React, { useState } from 'react';
import logo from './logo.svg';
import './App.css';


const COLORS = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5'
]

const ItemList = ({items}) => (
  <div>
    <h2>Product List</h2>
    {items.map((item, i) => (
        <div key={i} className="item">
          <div className="item-date">{item.date}</div>
          <div className="item-name">{item.name}</div>
        </div>
    ))}
  </div>
)

const Error = props => (
  <div className="error">{props.errorMessage}</div>
)

const Color = ({color}) => (
  <div className={`color-${color}`}></div>
)

const ItemForm = ({name, description, onSave, onDelete}) => {
  
  return (
  <div className="item-form">
    <h2>Beauty Product</h2>
    <div>
      <input type="text" value={name} onChange={onChangeName}/>
      <input type="text" value={description} onChange/>
      <div>
      {
        COLORS.map(color => (<Color key={color} color={color}/>))
      }
      </div>
      <button className="save-btn" onClick={onSave}>SAVE</button>
      <a href="#" onClick={onDelete}>Delete</a>
      
    </div>
  </div>
)

function App(props) {
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [products, setProducts] = useState([]);

  const addItem = (item) => {
    products.push(item);
  }

  return (
    <div className="main">
      <h1>My Beauty Faves</h1>
      <ItemList items={products} onAddItem={addItem}/>
      <ItemFom name={name} description={description}/>
    </div>
  );
}

export default App;
