import React, { useState } from 'react';

import classnames from 'classnames';

import { format } from 'date-fns';

import './Main.css';

const COLORS = [
  'color1',
  'color2',
  'color3',
  'color4',
  'color5'
]

const formatDate = (date) => format(date, 'MM/DD/YY');

const [defaultColor] = COLORS;

const itemFormInitialValues = {
  name: '',
  description: '',
  color: defaultColor,
};
 
const Header = () => (<h1 className="header">My beauty Faves</h1>);
 
const Item = ({ item }) => (
  <div className={`item color-${item.color}`}>
    <span className="item-date">{formatDate(item.date)}</span>
    <span className="item-title">{item.description}</span>
  </div>
);
 
const ItemList = ({ items }) => (
  <div className="item-list-container">
    <h2>Product List</h2>
    <div className="item-list">
      {items.map(item => (<Item key={item.id} item={item} />))}
    </div>
  </div>
);
 

const Color = ({
  color,
  onColorSelect,
  selected
}) => {
  const handleOnClick = () => {
    onColorSelect(color);
  };
 
  return (
    <div
      onClick={handleOnClick}
      className={classnames('color', `color-${color}`, selected ? 'selected' : null)}
    />
  );
};
 
const ItemForm = ({ onItemCreate }) => {
  const [name, setName] = useState(itemFormInitialValues.name);
  const [color, setColor] = useState(itemFormInitialValues.color);
  const [description, setDescription] = useState(itemFormInitialValues.description);
 
  const onChangeName = ({ target }) => {
    setName(target.value);
  };
 
  const onChangeDescription = ({ target }) => {
    setDescription(target.value);
  };
 
  const onColorSelect = (selectedColor) => {
    setColor(selectedColor);
  };
 
  const onSave = () => {
    onItemCreate({
      name,
      description,
      color,
    });
  };
 
  const onClear = () => {
    setName(itemFormInitialValues.name);
    setDescription(itemFormInitialValues.description);
    setColor(itemFormInitialValues.color);
  };
 
  return (
    <div className="item-form-container">
      <h2>Beauty Product</h2>
      <div>
        <input type="text" value={name} onChange={onChangeName} />
        <input type="text" value={description} onChange={onChangeDescription} />
        <div className="colors">
        {
          COLORS.map(colour => (
            <Color
              selected={color === colour}
              onColorSelect={onColorSelect}
              key={colour}
              color={colour}
            />
          ))
        }
        </div>
        <button className="save-btn" onClick={onSave}>SAVE</button>
        <a href="#" onClick={onClear}>Delete</a>
      </div>
    </div>
  );
}

const Main = () => {
  const [items, setItems] = useState([]);
  const onItemCreate = item => setItems(
    items.concat({
      ...item,
      id: items.length + 1,
      date: new Date(),
    }),
  );
 
  return (
    <div className="layout">
      <Header/>
      <main>
        <ItemList items={items} />
        <ItemForm
            onItemCreate={onItemCreate}
        />
      </main>
    </div>
  )
}
 
export default Main;