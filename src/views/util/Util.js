import posed from "react-pose";
import React from "react";

export const GridDef = {
  sortable: true,
  editable: false,
  filter: true,
  //floatingFilter: true,
  enableCellChangeFlash: true,
};

export const ANIMATION = posed.div({
  visible: {opacity: 1, applyAtStart: {display: "block"}},
  hidden: {opacity: 0, applyAtEnd: {display: "none"}}
});

export const bg_url = "url(../avatars/bg.jpg)";

export const FullPageLoader = () => {
  return (
    <div className="fp-container">
      <img src="../avatars/spinner.gif" className="fp-loader" alt="loading"/>
    </div>
  )
};

export const GET_COLUMNS = (getById, results, detayById, icon) => {
  const columns = [];

  results.forEach(m => {
    if (m.aktif) {
      columns.push({
        width: m.width,
        headerName: m.header,
        field: m.field,
        flex: m.flex ? 1 : '',
        hide: false,
        resizable: true,
        floatingFilter: true,
        cellRendererFramework: (param) =>
          <div>{param.data.aktif ? <i className="fa fa-check" style={{color: "#3333ff"}}></i> : ''}</div>
      });
    } else if (m.date) {
      columns.push({
        width: m.width,
        headerName: m.header,
        field: m.field,
        flex: m.flex ? 1 : '',
        hide: false,
        resizable: true,
        floatingFilter: true,
        cellRenderer: (data) => {
          return data.value ? (new Date(data.value)).toLocaleDateString() : '';
        }
      });
    } else {
      columns.push({
        width: m.width,
        headerName: m.header,
        field: m.field,
        flex: m.flex ? 1 : '',
        hide: false,
        resizable: true,
        floatingFilter: true,
      });
    }
  });

  //Düzenle
  if (getById !== undefined) {
    columns.push({
      width: 60,
      headerName: '',
      field: "",
      cellRendererFramework: (param) =>
        <div>
          <i className="fa fa-pencil"
             style={{color: "#3333ff", fontSize: "1.1rem", cursor: "pointer"}} title="Düzenle"
             onClick={() => getById(param)}></i>
        </div>,
    });
  }

  //Detay Ekle
  if (detayById !== undefined) {
    columns.push({
      width: 60,
      headerName: '',
      field: "",
      cellRendererFramework: (param) =>
        <div>
          <i className={icon}
             style={{color: "#3333ff", fontSize: "1.1rem", cursor: "pointer"}} title="Detay Ekle"
             onClick={() => detayById(param)}></i>
        </div>,
    });
  }

  return columns;
};
