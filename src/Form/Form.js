import React, { Component } from 'react';

class Form extends Component {
  constructor(props) {
    super(props)
    this.state = {
      searchValue:""
    }
    
  }

 handleSearchMovies = (event) => {
   console.log(event)
    const { name, value } = event.target;
    this.setState({ [name]: value })
 }

//  handleOnChange = (props, event) => {
//   this.handleSearchMovies(event)
// }

render() {
  return (
    <form>
      <input placeholder='Search For A Movie Title Or Genre' 
      type="text" 
      onChange={ (event, props) => {
        this.handleSearchMovies(event)
        console.log(this.state.searchValue)
        this.props.filterMoviesByTitle(this.state.searchValue)
       }
      }
      name="searchValue"
      value={ this.state.searchValue }
      />
    </form>
    )
  }
}

export default Form;