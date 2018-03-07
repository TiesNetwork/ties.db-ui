import PropTypes from 'prop-types';
import { Component } from 'react';
import { connect } from 'react-redux';

class TableDataFetcher extends Component {
  componentDidMount() {
    const { fetchData, isEmpty } = this.props;
    isEmpty && fetchData();
  }

  render() {
    return null;
  }
}

TableDataFetcher.propTypes = {
  hash: PropTypes.string,
  isEmpty: PropTypes.bool,
  onFetch: PropTypes.func,
  tableHash: PropTypes.string,
}

const mapDispatchToProps = (dispatch, { hash, isEmpty, onFetch, tableHash }) => ({
  fetchData: () => dispatch(onFetch(tableHash, hash))
});

export default connect(null, mapDispatchToProps)(TableDataFetcher);
