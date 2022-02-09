import React from "react";
import {connect} from 'react-redux';
import {toast, ToastContainer} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {TOASTR_REFRESH} from "../actions/Types";

class Toastr extends React.Component {

  constructor(props) {
    super(props);
  }

  componentDidUpdate() {
    if (this.props.showToastr) {

      switch (this.props.type) {
        case 'warning':
          toast.warn(this.props.message);
          break;
        case 'error':
          toast.error(this.props.message);
          break;
        case 'success':
          toast.success(this.props.message);
          break;
        case 'info':
          toast.info(this.props.message);
          break;
      }
      this.props.dispatch({ type: TOASTR_REFRESH, data: {} })
    }
  };

  render() {
    return (
      <>
        <ToastContainer />
      </>
    );
  }


};

function mapStateToProps(state) {
  return {
    type: state.main.get('toastrType'),
    message: state.main.get('toastrMessage'),
    showToastr: state.main.get('showToastr')
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Toastr)
