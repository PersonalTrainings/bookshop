"use strict"
import React, { Component } from 'react';
import { MenuItem, InputGroup, DropdownButton, Image, Col, Row, Panel, FormGroup, Well, ControlLabel, Button, FormControl } from 'react-bootstrap';
import { connect } from 'react-redux';
import * as booksActions from '../../store/books/actions';
import axios from 'axios';

class BooksForm extends Component {
  constructor() {
    super()
    this.state = {
      images: [{}],
      img: ''
    }
    
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  componentDidMount = () => {
    this.props.getBooks();
    axios.get('/api/images/')
      .then(response => this.setState({ images: response.data }))
      .catch(err => this.setState({ images: 'error loading files from the server', img: '' }))
  }

  handleSubmit = () => {
    const book = [{
      title: this.title.value,
      description: this.description.value,
      images: this.images.value,
      price: this.price.value
    }]
    this.props.postBooks(book)
  }

  handleSelect = name => {
    this.setState({img: `/images/${name}`})
  }

  resetForm = () => {
    this.props.resetButton()
    this.title.value = '',
    this.description.value = '',
    this.price.value = '',
    this.setState({img: ''})
  }

  onDelete = () => {
    let bookId = this.delete.value

    this.props.deleteBooks(bookId);
  }

  render() {
    return (
      <Well>
        <Row>
          <Col xs={12} sm={6}>
            <Panel>
              <InputGroup>
                <FormControl type='text' inputRef={ref => this.images = ref} value={this.state.img} />
                <DropdownButton
                  componentClass={InputGroup.Button}
                  id='input-dropdown-addon'
                  title='Select an image'
                  bsStyle='primary'>
                  {this.state.images.map((image, i) => (
                    <MenuItem 
                      onClick={() => this.handleSelect(image.name)}
                      key={i} 
                      eventKey={image.name}>
                      {image.name}
                    </MenuItem>))
                  }
                </DropdownButton>
              </InputGroup>
              <Image src={this.state.img} responsive />
            </Panel>
          </Col>
          <Col xs={12} sm={6}>
            <Panel>
              <FormGroup controlId='title' validationState={this.props.validation}>
                <ControlLabel>Title</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter Title'
                  inputRef={ref => this.title = ref} />
                  <FormControl.Feedback />
              </FormGroup>
              <FormGroup controlId='description' validationState={this.props.validation}>
                <ControlLabel>Description</ControlLabel>
                <FormControl
                  type='text'
                  placeholder='Enter Description'
                  inputRef={ref => this.description = ref} />
                  <FormControl.Feedback/>
              </FormGroup>
              <FormGroup controlId='price' validationState={this.props.validation}>
                <ControlLabel>Price</ControlLabel>
                <FormControl
                  type='number'
                  placeholder='Enter Price'
                  inputRef={ref => this.price = ref} />
                  <FormControl.Feedback />
              </FormGroup>
              <Button
                onClick={!this.props.msg ? this.handleSubmit : this.resetForm}
                bsStyle={!this.props.style ? 'primary' : this.props.style}>
                {!this.props.msg ? 'Save book' : this.props.msg}
              </Button>
            </Panel>
            <Panel style={{ marginTop: '25px' }}>
              <FormGroup controlId='formControlsSelect'>
                <ControlLabel>Select a book to delete</ControlLabel>
                <FormControl inputRef={ref => this.delete = ref} componentClass='select' placeholder='select'>
                  <option>select</option>
                  {this.props.books.map(book => {
                    return (
                      <option key={book._id} value={book._id}>{book.title}</option>
                    )
                  })}
                </FormControl>
              </FormGroup>
              <Button onClick={this.onDelete} bsStyle='danger' >Delete Book</Button>
            </Panel>
          </Col>
        </Row>        
      </Well>
    )
  }
}

function mapStateToProps(state) {
  return {
    books: state.books.books,
    msg: state.books.msg,
    style: state.books.style,
    validation: state.books.validation
  }
}

export default connect(mapStateToProps, booksActions)(BooksForm);