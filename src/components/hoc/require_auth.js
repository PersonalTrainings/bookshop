import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';

const requireAuth = (ComposedComponent) => {
  class Authentication extends Component {
    static contextTypes = {
      router: PropTypes.object
    }

    componentWillMount() {
      if (!this.props.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    componentWillUpdate(nextProps) {
      if (!nextProps.isAuthenticated) {
        this.context.router.push('/');
      }
    }

    render() {
      return <ComposedComponent {...this.props} />
    }
  }

  function mapStateToProps(state) {
    return { isAuthenticated: state.auth.isAuthenticated };
  }

  return connect(mapStateToProps)(Authentication);
}

export default requireAuth