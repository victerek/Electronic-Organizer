import React, { Component, PropTypes } from 'react';

// Alert Component
export default class Alert extends Component {
  render() {
    return (
      <div>
        {this.props.visible ?
          <div
            className={this.props.type === "error" ? "alert alert-danger" :
            "alert alert-success"} role="alert"
            onClick={this.props.hide}
          >
            {this.props.value}
          </div>
        : ""}
      </div>
    )
  }
}
