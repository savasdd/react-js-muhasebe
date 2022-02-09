import React from "react";
import {InputText} from "primereact/inputtext";
import {Calendar} from 'primereact/calendar';
import {Checkbox} from 'primereact/checkbox';
import {RadioButton} from 'primereact/radiobutton';
import {InputNumber} from 'primereact/inputnumber';

import {Card, Col} from "reactstrap";
import {InputTextarea} from "primereact/inputtextarea";
import {Dropdown} from "primereact/dropdown";
import {handleCheckox, handleInput} from "./inputHandlers";

class EasyInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      checked: false,
    }
  }

  getRequred = () => {
    return this.props.requred ? '#F5B7B1' : '';
  };


  render() {
    const {checked} = this.state;
    const {requred} = this.props;
    let component;

    switch (this.props.type) {
      case 'text':
        component = (<InputText
          disabled={this.props.disabled ? this.props.disabled : false}
          value={this.props.value ? this.props.value : ''}
          hidden={this.props.hidden}
          style={{borderColor: this.getRequred()}}
          onChange={(e) => {
            handleInput(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
          }}
        />);
        break;
      case 'number':
        component = (<InputNumber mode="decimal"
                                  disabled={this.props.disabled ? this.props.disabled : false}
                                  value={this.props.value ? this.props.value : null}
                                  hidden={this.props.hidden}
                                  style={{borderColor: this.getRequred()}}
                                  defaultValue={''}
                                  onChange={(e) => {
                                    handleInput(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
                                  }}
        />);
        break;
      case 'textarea':
        component = (<InputTextarea
          disabled={this.props.disabled ? this.props.disabled : false}
          value={this.props.value ? this.props.value : ''}
          style={{height: this.props.height, width: '100%'}}
          onChange={(e) => {
            handleInput(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
          }}
        />);
        break;
      case 'boolean':
        component = (
          <label>
            <Checkbox
              inputId="check"
              value={this.props.value ? this.props.value : false}
              onChange={(e) => {
                handleCheckox(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
              }}
              checked={this.props.value ? this.props.value : false}/>
          </label>
        );
        break;
      case 'radio':
        component = (
          <RadioButton
            inputId="check"
            value={this.props.value ? this.props.value : false}
            onChange={(e) => {
              handleCheckox(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
            }}
            checked={this.props.value ? this.props.value : false}/>
        );
        break;
      case 'date':
        component = (
          <Calendar style={{borderColor: this.getRequred()}}
                    value={this.props.value} dateFormat="dd.mm.yy" showIcon
                    disabled={this.props.disabled ? this.props.disabled : false}
                    onChange={(e) => {
                      handleInput(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
                    }}/>
        );
        break;

      case 'password':
        component = (<InputText type='password'
                                disabled={this.props.disabled ? this.props.disabled : false}
                                value={this.props.value ? this.props.value : ''}
                                hidden={this.props.hidden}
                                onChange={(e) => {
                                  handleInput(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
                                }}
        />);
        break;

      case 'combo':
        component = (

          <Col sm="13">
            <Card>
              <Dropdown value={this.props.value}
                        options={null}
                        onChange={(e) => {
                          handleInput(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
                        }}
                        optionLabel="name" filter showClear filterBy="name"
                // placeholder={this.props.label}
              />
            </Card>
          </Col>
        );
        break;
      default:
        component = (
          <InputText
            disabled={this.props.disabled ? this.props.disabled : false}
            value={this.props.value}
            style={{borderColor: this.getRequred()}}
            onChange={(e) => {
              handleInput(e, this.props.fieldName, this.props.component, this.props.fieldHolder)
            }}
          />
        );
        break;
    }

    let componentOuter = undefined;

    if (this.props.lefted) {
      componentOuter = (
        <div className="p-field p-col-12 p-md-2">
          <label hidden={this.props.hidden}
                 className="p-col-fixed"
                 style={{width: '150px', color: 'black'}}>{this.props.label}</label>
          {component}
        </div>
      )
    } else {
      componentOuter = (
        <div className="content-section implementation">
          <div className="p-fluid p-grid">
            <div className="p-field p-col-12 p-md-2">
                  <span className="p-float-label">
                    {component}
                    <label hidden={this.props.hidden}
                           style={{color: 'black', fontSize: '1rem'}}>{this.props.label}</label>
                  </span>
            </div>
          </div>
        </div>
      )
    }


    return (
      <>
      <span className='easy-input'>
           {componentOuter}
      </span>
      </>
    );
  }
}

export default EasyInput;
