import React, { Component, PropTypes } from 'react';

// Number of tasks left Component
export default class LeftItems extends Component {
  render() {
    return (
      <div className="left_count">
        <span className="label label-default">{this.props.value} task(s) to do</span>
      </div>
    )
  }
}
