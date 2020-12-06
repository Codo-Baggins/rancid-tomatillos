import React, { Component } from 'react';

class Form extends Component {
  constructor() {
    super()
    this.state = {
      searchValue:""
    }
    
  }

 handleSearchMovies = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value })
 }
  
  render() {
    return (
    <form>
      <input placeholder='Search For A Movie Title Or Genre' 
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