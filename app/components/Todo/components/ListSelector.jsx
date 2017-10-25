import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router';

// List Selector Component
export default class ListSelector extends Component {
  render() {
    return (
      <div className="btn-group" role="group">
        <Link to="/" className={this.props.active === "all" ? "btn btn-primary": "btn btn-default"}>All</Link>
        <Link to="/active" className={this.props.active === "active" ? "btn btn-primary": "btn btn-default"}>Active</Link>
        <Link to="/completed" className={this.props.active === "completed" ? "btn btn-primary": "btn btn-default"}>Completed</Link>
      </div>
    )
  }
}
