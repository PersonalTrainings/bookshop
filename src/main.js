"use strict"
import React, { Component } from 'react';
import Menu from './components/menu'
import Footer from './components/footer';
import { connect } from 'react-redux';
import * as cartActions from './store/cart/actions';

class Main extends Component {
  componentDidMount () {
    this.props.getCart();
  }

  render() {
    return (
      <div>
        <Menu
          isAuthenticated={this.props.isAuthenticated}
          cartItemsNumber={this.props.totalQty} />
          {this.props.children}
        <Footer />
      </div>
    )
  }
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  totalQty: state.cart.totalQty
})

export default connect(mapStateToProps, cartActions)(Main);
