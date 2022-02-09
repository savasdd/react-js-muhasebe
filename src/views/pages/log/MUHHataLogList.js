import React from "react";
import {Card, CardHeader, Col, Form} from "reactstrap";
import {AgGridReact} from "ag-grid-react";
import {GET_COLUMNS, GridDef} from "../../util/Util";
import {AG_GRID_LOCALE_TR} from "../modal/GridLocal";
import {connect} from "react-redux";
import request from "axios";
import {MUH_URL} from "../../service/MuhUrl";

class MUHHataLogList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  async componentDidMount() {
    const response = await request({
      url: MUH_URL.LOG.HATA,
      method: 'GET',
      headers: MUH_URL.HEADER,
    });
    this.state.gridApi.applyTransaction({add: response.data.data});
  }


  render() {
    const {} = this.state;
    const {} = this.props;

    const results = [
      {'header': 'ID', 'field': 'id', 'width': 100, 'flex': true},
      {'header': 'Kullanıcı Adı', 'field': 'kullaniciAdi', 'width': 250, 'flex': true},
      {'header': 'Hata', 'field': 'mesagge', 'width': 250, 'flex': true},
      {'header': 'Hata Detay', 'field': 'details', 'width': 250, 'flex': true},
      {'header': 'Status', 'field': 'status', 'width': 250, 'flex': true},
      {'header': 'Tarih', 'field': 'createDate', 'width': 250, 'flex': true},
    ];
    const columns = GET_COLUMNS(undefined, results);
    
    const onGridReady = async (param) => {
      this.setState({
        gridApi: param.api,
      });
    };


    return (
      <Col md={12}>
        <Card className="shadow mh-80vh">
          <CardHeader className="border-0" style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <div id="ana_div">
              <div className="div-header" id="div">
                <h3 className="mb-1">Hata Log Listesi </h3>
              </div>
            </div>
          </CardHeader>
          <div className="w-96 centered block"
               style={{backgroundColor: '#EBF5FB', backgroundSize: 'cover'}}>
            <Form>
              <div id="grid" className="ag-theme-alpine"
                   style={{height: '65vh', width: '100%', padding: '0.5rem'}}>
                <AgGridReact
                  columnDefs={columns}
                  defaultColDef={GridDef}
                  onGridReady={onGridReady}
                  pagination={true}
                  paginationPageSize={20}
                  rowSelection="single"
                  enableCellChangeFlash={true}
                  localeText={AG_GRID_LOCALE_TR}
                  overlayLoadingTemplate={'<div class="alert alert-info" role="alert"> <strong>Veri Bulunamadı</strong></div>'}
                />
              </div>
            </Form>
          </div>
        </Card>
      </Col>
    );
  }
};


function mapStateToProps(state) {
  return {
    state: state,
  }
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch: dispatch
  }
};
export default connect(mapStateToProps, mapDispatchToProps)(MUHHataLogList);
