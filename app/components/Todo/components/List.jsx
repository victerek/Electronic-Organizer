import React, { Component, PropTypes } from 'react';

import Item from './Item';
import { Filter } from '../utils/Filter';

// Main List Component
export default class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      items: Filter(this.props.items, this.props.type)
    }
  }

  render() {
    return (
      <ul className="list-group items_list">
        {this.state.items.length > 0 ? this.state.items.map((item, index) =>
          <Item value={item.value}
            key={item.id} id={item.id}
            checked={item.checked}
            checkItem={this.props.checkItem}
            deleteItem={this.props.deleteItem}
            editItem={this.props.editItem}
            context={this.props.context} />
        ) : <div className="alert alert-danger searchNoResult">
        Enter the text and press <b>"Enter"</b> or <b>"+"</b> to add a new task.
      </div>}
    </ul>
  )
}
}
