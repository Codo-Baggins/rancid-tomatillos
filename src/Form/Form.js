import React, { Component } from 'react';

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
      >
        <input
          placeholder='Search For A Movie Title Or Genre'
          type="text"
          onChange={ this.handleSearchMovies }
          name="searchValue"
          value={ this.state.searchValue }
        />
      </form>
    )
  }
}

export default Form;