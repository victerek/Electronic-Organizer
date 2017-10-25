import React from 'react';
import ReactDOM from 'react-dom';
import WikipediaViewer from './components/Wiki/WikipediaViewer.jsx';
import Calculator from './components/Calculator/Calculator.jsx';
import ToDoList from './components/Todo/containers/ToDoList.jsx';

document.addEventListener('DOMContentLoaded', () => {
  ReactDOM.render(
    <div>
      <ToDoList />
      <Calculator />
      <WikipediaViewer />
    </div>, 
    document.querySelector('#apps')
  );
});
