import React from "react";

import {
  Col,
  Row
} from "reactstrap";
import EasyInput from "./EasyInput";

class EasyForm extends React.Component {


  render() {
    let formContent = [];

    let model = this.props.model;

    for (let i = 0; i < model.length; i++) {
      formContent.push(
        <Col md={model[i].md ? model[i].md : '6'}>
          <EasyInput
            value={this.props.fieldHolder ? this.props.component.state[this.props.fieldHolder][model[i].field] : this.props.component.state[model[i].field]}
            label={model[i].headerName}
            fieldName={model[i].field}
            fieldHolder={this.props.fieldHolder}
            component={this.props.component}
            type={model[i].type}
            hidden={model[i].hidden}
            width={model[i].width}
            height={model[i].height}
            lefted={model[i].lefted}
            disabled={model[i].disabled}
            requred={model[i].requred}
          /></Col>
      )
    }
    return (
      <>
        <Row>
          {formContent}
        </Row>
      </>
    );
  }
}

export default EasyForm;
