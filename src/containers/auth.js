import React, { Component } from 'react'
import { connect } from 'react-redux'
import { MenuItem,
         InputGroup,
         DropdownButton,
         Col,
         Row,
         Panel,
         FormGroup,
         Well,
         ControlLabel,
         Button,
         FormControl } from 'react-bootstrap';
import Spinner from '../components/Spinner'
import { signup, signin, removeErrorMessage } from '../store/auth/actions'; 

class Auth extends Component {
  state = {
    isSignup: false,
    email: '',
    password: '',
    confirmPassword: '',
    formErrorMessage: '',
    submit: false,
    formElements: [
      { label: 'Email Address', placeholder: 'Email', type: 'email', id: 'email'},
      { label: 'Password', placeholder: 'Password', type: 'password', id: 'password'},
      { label: 'Confirm Password', placeholder: 'Confirm Password', type: 'password', id: 'confirmPassword'}
    ]
  }

  emailValidateHandler = () => {
    const { email, submit } = this.state
    const pattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;

    if (email && pattern.test(email)) return 'success';
    else if (email && submit) return 'error';
    return null;
  }

  passwordValidateHandler = () => {
    const { password, submit } = this.state

    if (password && password.length >= 6) return 'success';
    else if (password && submit) return 'error';
    return null;
  }

  confirmPasswordValidateHandler = () => {
    const { confirmPassword, password, submit } = this.state

    if (confirmPassword && confirmPassword.length >= 6 && confirmPassword === password) return 'success';
    else if (password && submit) return 'error';
    return null;
  }

  switchAuthModeHandler = () => {
    this.setState(prevState => {
      return {
        isSignup: !prevState.isSignup,
        submit: false,
        email: '',
        password: '',
        confirmPassword: '',
        formErrorMessage: ''
      }
    }, this.props.dispatch(removeErrorMessage()))    
  }

  formValidateHandler = () => {
    let formIsValid = true

    this.state.formElements.forEach(input => {
      if (this[input.id]) {
        formIsValid = this[input.id].context.$bs_formGroup.validationState === 'success' && formIsValid
      }
    })
    return formIsValid
  }

  
  handleChange = (e, type) => {
    this.setState({
      [type]: e.target.value,
      formErrorMessage: ''
    })
  }
  
  handleSubmit = () => {
    const { email, password, isSignup } = this.state
    this.setState({ submit: true })
    
    const params = {
      email,
      password
    }
    
    if (!this.formValidateHandler()) {
      return this.setState({formErrorMessage: 'Form Is Not Valid'})
    }

    if (isSignup) {
      this.props.dispatch(signup(params))
    } else {
      this.props.dispatch(signin(params))
    }
  }
  
  renderAlert = (errorMessage) => {
    if (this.props.errorMessage || errorMessage) {
      return (
        <div className="alert alert-danger">
          <strong>Oops!</strong> {this.props.errorMessage || errorMessage}
        </div>
      );
    }
  }

  render() {
    let { formElements, isSignup, formErrorMessage } = this.state

    if (!isSignup) {
      formElements = formElements.filter(el => el.id !== 'confirmPassword')
    }

    let form = (
      <Panel>
        {formElements.map(({ id, label, type, placeholder }) => {
          return (
            <FormGroup
              key={id}
              controlId={id}
              validationState={this[`${id}ValidateHandler`]()}>
              <ControlLabel>{label}</ControlLabel>
              <FormControl
                type={type}
                value={this.state[id]}
                placeholder={placeholder}
                ref={(ref) => { this[id] = ref; }}
                onChange={(e) => this.handleChange(e, id)} />
              <FormControl.Feedback />
            </FormGroup>
          )
        })}
        {this.renderAlert(formErrorMessage)}
        <Button
          onClick={this.handleSubmit}
          bsStyle={!this.props.style ? 'primary' : this.props.style}>
          {isSignup ? 'SIGNUP' : 'SIGNIN'}
        </Button>
        <Button
          bsStyle='danger'
          style={{ float: 'right' }}
          onClick={this.switchAuthModeHandler}>SWITCH TO {isSignup ? 'SIGNIN' : 'SIGNUP'}</Button>
      </Panel>
    )

    if (this.props.isLoading) {
      form = <Spinner />
    }

    return (
      <Well>
        <Row style={{display: 'flex', justifyContent: 'center'}}>
          <Col xs={8} lg={6}>
            {form}
          </Col>
        </Row>
      </Well>
    );
  }
}

const mapStateToProps = state => ({
  errorMessage: state.auth.error,
  isLoading: state.auth.isLoading
})

export default connect(mapStateToProps)(Auth);