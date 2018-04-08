import React, { Component } from 'react'
import { connect } from 'react-redux';
import { browserHistory } from 'react-router';
import { signout } from '../store/auth/actions';

class Signout extends Component {
  componentWillMount() {
    this.props.dispatch(signout());
    browserHistory.push('/');
  }

  render() {
    return null;
  }
}

export default connect()(Signout)
