"use strict"
import React, { Component } from 'react';
import { Image, Row, Col, Well, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as cartActions from '../store/cart/actions';

class BookItem extends Component {
  state = {
    isClicked: false
  }

  onReadMore = () => {
    this.setState({ isClicked: !this.state.isClicked })
  }

  handleCart = () => {
    const book = [...this.props.cart, {
      _id: this.props._id,
      title: this.props.title,
      description: this.props.description,
      images: this.props.images,
      price: this.props.price,
      quantity: 1
    }]

    if (this.props.cart.length) {
      let { _id } = this.props

      let cartIndex = this.props.cart.findIndex(cart => cart._id === _id)
      
      if (cartIndex === -1) {
        this.props.addToCart(book)
      } else {
        this.props.updateCart(_id, 1, this.props.cart)
      }

    } else {
      this.props.addToCart(book);
    }
  }

  render() {
    const { isClicked } = this.state
    const { images, title, description, price } = this.props
    return (
      <Well>
        <Row>
          <Col xs={12} sm={4}>
            <Image src={images} responsive />
          </Col>
          <Col xs={6} sm={8}>
            <h6>{title}</h6>
            <p>{description.length > 50 && !isClicked ?
              description.substring(0, 50) : description}
              <a className='link' onClick={this.onReadMore}>
                {!isClicked && description && description.length > 50 ? '...read more' 
                 : isClicked ? '...close' : ''}
              </a>
            </p>
            <h6>usd. {price}</h6>
            <Button onClick={this.handleCart} bsStyle='primary'>Buy now</Button>
          </Col>
        </Row>
      </Well>
    )
  }
}

function mapStatToProps(state) {
  return {
    cart: state.cart.cart
  }
}

export default connect(mapStatToProps, cartActions)(BookItem);