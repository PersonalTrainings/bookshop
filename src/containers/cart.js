"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Panel, Col, Row, Well, Button, ButtonGroup, Label, Modal } from 'react-bootstrap';
import * as cartActions from '../store/cart/actions';

class Cart extends Component {
  state = {
    showModal: false
  }

  componentDidMount = () => {
    this.props.getCart()
  }

  showModal = () => {
    this.setState({ showModal: true })
  }

  closeModal = () => {
    this.setState({ showModal: false })
  }

  onDelete = _id => {
    const currentBookToDelete = this.props.cart
    const indexToDelete = currentBookToDelete.findIndex(cart => cart._id === _id)
    let cartAfterDelete = [...currentBookToDelete.slice(0, indexToDelete),
      ...currentBookToDelete.slice(indexToDelete + 1)]

    this.props.deleteCartItem(cartAfterDelete)
  }

  onIncrement(_id) {
    this.props.updateCart(_id, 1, this.props.cart)
  }

  onDecrement(_id, quantity) {
    if (quantity > 1) {
      this.props.updateCart(_id, -1, this.props.cart)
    }
  }

  renderCart = () => {
    const cartItemsList = this.props.cart.map(item => {
      return (
        <Panel key={item._id}>
          <Row>
            <Col xs={12} sm={4}>
              <h6>{item.title}</h6><span>    </span>
            </Col>
            <Col xs={12} sm={2}>
              <h6>usd. {item.price}</h6>
            </Col>
            <Col xs={12} sm={2}>
              <h6>qty. <Label bsStyle='success' >{item.quantity}</Label></h6>
            </Col>
            <Col xs={6} sm={4}>
              <ButtonGroup style={{minWidth: '300px'}}>
                <Button onClick={() => this.onDecrement(item._id, item.quantity)} bsStyle='default' bsSize='small' >-</Button>
                <Button onClick={() => this.onIncrement(item._id)} bsStyle='default' bsSize='small' >+</Button>
                <span>     </span>
                <Button onClick={() => this.onDelete(item._id)} bsStyle='danger' bsSize='small' >DELETE</Button>
              </ButtonGroup>
            </Col>
          </Row>
        </Panel>
      )
    })
    return (
      <Panel header='Cart' bsStyle='primary'>        
        {cartItemsList}
        <Row>
          <Col xs={12}>
            <h6>Total amount: {this.props.totalQty}</h6>
            <Button onClick={this.showModal} bsStyle='success' bsSize='small' >
              PROCEED TO CHECKOUT
            </Button>
          </Col>
        </Row>
        <Modal show={this.state.showModal} onHide={this.closeModal}>
          <Modal.Header closeButton>
            <Modal.Title>Thank you!</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h6>Your order has been saved</h6>
            <p>You will receive an email confirmation</p>
          </Modal.Body>
          <Modal.Footer>
            <Col xs={6}>
              <h6>total $: {this.props.totalAmount}</h6>
            </Col>
            <Button onClick={this.closeModal}>Close</Button>
          </Modal.Footer>
        </Modal>
      </Panel>
    )
  }

  renderEmpty = () => {
    return (
      <div></div>
    )
  }

  render() {
    if (this.props.cart[0]) {
      return this.renderCart();
    } else {
      return this.renderEmpty();
    }
  }
}

function mapStateToProps(state) {
  return {
    cart: state.cart.cart,
    totalAmount: state.cart.totalAmount,
    totalQty: state.cart.totalQty
  }
}

export default connect(mapStateToProps, cartActions)(Cart);