import React, { Component } from 'react';
import { Router, Route, hashHistory, browserHistory } from 'react-router';

import New from '../components/New';
import List from '../components/List';
import LeftItems from '../components/LeftItems';
import ListSelector from '../components/ListSelector';
import GlobalAction from '../components/GlobalAction';
import Alert from '../components/Alert';
import { storeGet, storeSave } from '../utils/Store';
import { Search } from '../utils/Search';
import { isBlank, removeSpaces } from '../utils/IsBlank';

// Generate key for Router
let reloadCounter = 0;

// Type of Router. Returnes the main component
const routeComponent = function (type, context) {
  return (
    <div className="panel panel-default">
      <div className="panel-body">
        <List type={type}
          items={Search(context.state.items, context.state.search)}
          checkItem={context.checkItem}
          deleteItem={context.deleteItem}
          editItem={context.editItem} />

        <Alert value={context.state.alert.value}
          visible={context.state.alert.visible}
          hide={() => context.alert("", false, "")}
          type={context.state.alert.type} />
      </div>

      <div className="panel-footer">
        <LeftItems value={context.state.leftCount} />
        <ListSelector active={type} />

        <GlobalAction
          deleteCompleted={context.deleteCompleted}
          checkAll={context.checkAll} />
      </div>
    </div>
  )
}

// Web App To Do List
class ToDoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: '',
      items: storeGet() === null ? [] : storeGet(),
      leftCount: this.countLeft(storeGet()),
      alert: {
        value: '',
        visible: false,
        type: "error"
      }
    }

    // Context binding
    this.checkItem = this.checkItem.bind(this);
    this.deleteItem = this.deleteItem.bind(this);
    this.editItem = this.editItem.bind(this);
    this.handleSearch = this.handleSearch.bind(this);
    this.handleAdd = this.handleAdd.bind(this);
    this.deleteCompleted = this.deleteCompleted.bind(this);
    this.checkAll = this.checkAll.bind(this);
  }

  // Returns the counter of active tasks
  countLeft(items) {
    let count = 0;

    if (items === undefined || items === null) {
      count = 0;
    } else {
      for (let i = 0; i < items.length; i++) {
        if (!items[i].checked) {
          count++;
        }
      }
    }
    return count;
  }

  // Add task function
  handleAdd(item) {
    function listItem(num, text) {
      return {
        id: num,
        value: removeSpaces(text),
        checked: false
      }
    }

    if (!isBlank(item)) {
      this.setState({ search: '' });
      this.alert("Cannot add the empty task! Enter task name", true, "error");
    } else {
      let newId = 0;
      let itemsList = this.state.items;

      if (itemsList[itemsList.length - 1] !== undefined) {
        newId = itemsList[itemsList.length - 1].id + 1
      } else {
        newId = 1;
      }

      let newItem = new listItem(newId, item);
      itemsList.push(newItem);

      this.setState({ items: itemsList });
      this.setState(({ leftCount: this.countLeft(itemsList) }));
      this.setState({ search: '' });
      storeSave(this.state.items);
      reloadCounter++;
    }
  }

  // Search through tasks function
  handleSearch(text) {
    this.setState({ search: text });
    reloadCounter++;
  }

  // Check item function
  checkItem(id) {
    let itemsList = this.state.items;
    for (let i = 0; i < itemsList.length; i++) {
      if (itemsList[i].id === id) {
        itemsList[i].checked = !itemsList[i].checked;
      }
    }
    this.setState({ search: this.state.search });
    this.setState({ items: itemsList });
    this.setState(({ leftCount: this.countLeft(this.state.items) }));
    storeSave(this.state.items);
    reloadCounter++;
  }

  // Delete task function
  deleteItem(id) {
    let itemsList = this.state.items;

    for (let i = 0; i < itemsList.length; i++) {
      if (itemsList[i].id === id) {
        itemsList.splice(i, 1);
      }
    }

    this.setState({ search: this.state.search });
    this.setState({ items: itemsList });
    this.setState(({ leftCount: this.countLeft(this.state.items) }));
    this.alert("The task was deleted!", true, "success");
    storeSave(this.state.items);
    reloadCounter++;
  }

  // Rename task function
  editItem(id, value) {
    if (value.length === 0) {
      this.alert("It is impossible to add an empty task. Enter the name", true, "error");
    } else {
      let itemsList = this.state.items;

      for (let i = 0; i < itemsList.length; i++) {
        if (itemsList[i].id === id) {
          itemsList[i].value = value;
        }
      }

      this.setState({ search: this.state.search });
      this.setState({ items: itemsList });
      storeSave(this.state.items);
      reloadCounter++;
    }
  }

  // Alert for the user
  alert(value, visible, type) {
    this.setState({ alert: { value: value, visible: visible, type: type } });
    let context = this;

    // Hide alert for 1.5 seconds
    function hideAlert() {
      reloadCounter++;
      context.setState({ alert: { value: "", visible: false, type: "type" } });
      reloadCounter++;
    }
    setTimeout(function () {
      hideAlert();
    }, 1500);

    reloadCounter++;
  }

  // Delete completed tasks function
  deleteCompleted() {
    let itemsList = this.state.items;

    for (let i = 0; i < itemsList.length; i++) {
      if (itemsList[i].checked) {
        itemsList.splice(i, 1);
        i -= 1;
      }
    }

    this.setState({ items: itemsList });
    this.setState(({ leftCount: this.countLeft(itemsList) }));
    this.setState({ search: '' });
    storeSave(this.state.items);
    this.alert("Completed tasks were successfully deleted!", true, "success");
    reloadCounter++;
  }

  // Check all tasks function
  checkAll() {
    let itemsList = this.state.items;

    for (let i = 0; i < itemsList.length; i++) {
      itemsList[i].checked = true;
    }

    this.setState({ items: itemsList });
    this.setState(({ leftCount: this.countLeft(itemsList) }));
    this.setState({ search: '' });
    this.alert("All tasks were completed", true, "success");
    storeSave(this.state.items);
    reloadCounter++;
  }

  render() {
    return (
      <div className="todo-wrapper flexing">
        <div id="todo">
          <h2 className="app-title">To do List</h2>
          <p>Productive work is impossible without structure</p>
          <New value={this.state.search}
            handleAdd={this.handleAdd}
            handleSearch={this.handleSearch} />
          <Router history={browserHistory} key={reloadCounter}>
            <Route path="/" component={() => routeComponent("all", this)} />
            <Route path="/active" component={() => routeComponent("active", this)} />
            <Route path="/completed" component={() => routeComponent("completed", this)} />
          </Router>

        </div>
      </div>
    )
  }
}

export default ToDoList;
