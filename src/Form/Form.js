import React, { Component } from 'react';
import './Form.scss'

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue: ""
    }

  }

  handleSearchMovies = (props) => {
    const { value } = props.target;
    this.setState({ searchValue: value });
    this.props.filterMovies(value);
  }

   handleSubmit = (props) => {
     props.preventDefault()
   }

  render() {
    return (
      <form
      onSubmit={ this.handleSubmit }
      className="form__group field"
      >
        <input
          className="form__field"
          placeholder='Search For A Movie Title Or Genre'
          type="text"
          onChange={ this.handleSearchMovies }
          name="searchValue"
          value={ this.state.searchValue }
        />
        <label className="form__label" htmlFor="searchValue">
          Search For A Movie Title Or Genre
        </label>
      </form>
    )
  }
}

export default Form;