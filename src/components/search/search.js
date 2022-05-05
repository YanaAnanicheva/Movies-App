import './search.css';

import React from 'react';
import PropTypes from 'prop-types';
import { debounce } from 'lodash';

import MoviesApiService from '../../services/moviesApiService';

class Search extends React.Component {
  moviesApiService = new MoviesApiService();

  state = {
    value: '',
  };

  static defaultProps = {
    changeMovies: () => {},
    currentPage: 1,
  };

  static propTypes = {
    changeMovies: PropTypes.func,
    currentPage: PropTypes.number,
  };

  componentDidUpdate(prevProp, prevState) {
    const { currentPage } = this.props;
    const { value } = this.state;
    const { changeMovies } = this.props;

    if ((prevState.value !== value || prevProp.currentPage !== currentPage) && value !== '') {
      changeMovies(value, currentPage);
    }
  }

  changedInput = (inpValue) => {
    this.setState({ value: inpValue.target.value });
  };

  render() {
    return (
      <input
        type="text"
        placeholder="Type to search..."
        className="search"
        onChange={debounce((event) => {
          this.changedInput(event);
        }, 1000)}
      />
    );
  }
}

export default Search;