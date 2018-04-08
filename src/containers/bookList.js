"use strict"
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as booksActions from '../store/books/actions';
import { Carousel, Grid, Col, Row, Button } from 'react-bootstrap';

import BookItem from './bookItem';
import BookForm from './booksForm';
import Cart from './cart';

class BookList extends Component {
  componentDidMount () {
    this.props.getBooks();
  }

  renderBooks = (book) => {
    return (
      <Col xs={12} sm={6} md={4} key={book._id}>
        <BookItem 
          _id={book._id}
          title={book.title}
          description={book.description}
          images={book.images}
          price={book.price} />
      </Col>
    )
  }

  render() {
    const { books } = this.props

    return (
        <Grid>
          <Row>
            <Carousel>
              <Carousel.Item>
                <img width={900} height={.00} alt='900x300' src='/images/home3.jpg' />
                <Carousel.Caption>
                  <h3>First slide label</h3>
                  <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                </Carousel.Caption>
              </Carousel.Item>
              <Carousel.Item>
                <img width={900} height={300} alt='900x300' src='/images/home4.jpeg' />
                <Carousel.Caption>
                  <h3>Second slide label</h3>
                  <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                </Carousel.Caption>
              </Carousel.Item>         
            </Carousel>
          </Row>
          <Row>
            <Cart />
          </Row>
          <Row style={{marginTop: '15px'}} >           
            {books.map(this.renderBooks)}
          </Row>
        </Grid>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books
  }
}

export default connect(mapStateToProps, booksActions)(BookList);