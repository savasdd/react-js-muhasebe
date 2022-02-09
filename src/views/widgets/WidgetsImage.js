import React from 'react';
import {CCol, CImg, CRow} from "@coreui/react";

const WidgetsImage = () => {

  return (
    <div style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
      <CRow>
        <CCol sm="5" lg="3"> </CCol>
        <CCol sm="5" lg="6">
          <CImg
            height="100%"
            width="100%"
            className="my-2"
            src={'../avatars/logo.jpeg'}
            style={{
              background: 'white',
              borderRadius: '25vh',
              //boxShadow: '0px 6px 23px -5px rgba(0, 0, 0, 0.49)',
              backgroundSize: '90% !important'
            }}
          />
        </CCol>
      </CRow>
    </div>
  )

};
export default WidgetsImage;
