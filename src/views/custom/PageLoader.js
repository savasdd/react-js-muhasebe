import React from "react";
import {connect} from 'react-redux';
import "react-toastify/dist/ReactToastify.css";
import {FullPageLoader} from "../util/Util";

class PageLoader extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: '',
    };
  }

  componentDidUpdate() {
  };

  render() {
    return [this.props.loading ? <FullPageLoader/> : null,]
  }

};

function mapStateToProps(state) {
  return {
    loading: state.main.get('loading'),
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(PageLoader)
