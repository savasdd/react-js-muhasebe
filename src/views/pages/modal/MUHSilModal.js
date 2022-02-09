import React, {useRef} from 'react';
import {Toast} from 'primereact/toast';
import {Button, Col, FormGroup, Row} from 'reactstrap';
import {DELETE} from "../../service/Service";

export const MUHSilModal = ({url, dispatch}) => {
  const toast = useRef(null);

  const show = () => {
    toast.current.show({
      severity: 'error', sticky: true, content: (
        <div className="p-flex p-flex-column" style={{flex: '1'}}>
          <div className="p-text-center">
            <i className="pi pi-exclamation-triangle" style={{fontSize: '3rem'}}></i>
            <h2>Kayıt Silinecek?</h2>
            <p>Onaylıyor musunuz?</p>
          </div>
          <div className="p-grid p-fluid">
            <Row form>
              <Col md={3}>
                <FormGroup>
                  <Button color="primary" onClick={sil} style={{width: '5rem'}}>Evet</Button>
                </FormGroup>
              </Col>
              <Col md={3}>
                <FormGroup>
                  <Button color="secondary" onClick={cansel}>Vazgeç</Button>
                </FormGroup>
              </Col>
            </Row>
          </div>

        </div>
      )
    });
  };

  const sil = () => {
    const response = DELETE(url, dispatch);
    console.log(response);
    cansel();
  };

  const cansel = () => {
    toast.current.clear();
  };


  return (
    <div>
      <Toast ref={toast} position="top-center" style={{marginTop: '50px;'}}/>
      <div className="kaydet_kapat">
        <i className="fa fa-trash" title="Sil"
           onClick={show}></i>
      </div>
    </div>
  );

};
