import React from "react";
import MUHKullaniciList from "./MUHKullaniciList";
import MUHKullaniciEdit from "./MUHKullaniciEdit";

class MUHKullanici extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <>
        <MUHKullaniciList/>
        {/*<MUHKullaniciEdit/>*/}
      </>
    );
  }

};
export default MUHKullanici;
