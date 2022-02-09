import request from "axios";
import React from "react";
import {SHOW_LOAD, TOASTR_MESSAGE} from "../actions/Types";
import {MUH_URL} from "./MuhUrl";


export const GET = async (URL, grid, search, size) => {
  const response = await request({
    url: URL,
    method: 'GET',
    headers: MUH_URL.HEADER,
    params: {'search': search !== undefined ? search : null, 'size': size}
  });

  if (grid) {
    grid.setRowData([]);
    grid.updateRowData({add: response.data.data});
  }
  return response;
};

export const POST = async (URL, DATA, dispatch) => {
  dispatch({type: SHOW_LOAD, data: {loading: true}});

  const response = await request({
    url: URL,
    method: 'POST',
    headers: MUH_URL.HEADER,
    data: DATA
  }).then(function (response) {
    console.log("KAYIT!");
    const mesaj = <div>{response.data.message} <br/>{response.data.status}</div>;
    dispatch({type: SHOW_LOAD, data: {loading: false}});
    if (dispatch !== null) {
      dispatch({type: TOASTR_MESSAGE, data: {type: 'success', message: mesaj}});
    }
    return response.data;
  }).catch(function (error) {
    const mesaj = <div>HATA OLUŞTU <br/>{error.response.data.message} <br/>{error.response.data.details}</div>;
    dispatch({type: TOASTR_MESSAGE, data: {type: 'error', message: mesaj}});
    dispatch({type: SHOW_LOAD, data: {loading: false}});
  });

  return response;
};

export const PUT = async (URL, DATA, dispatch) => {
  dispatch({type: SHOW_LOAD, data: {loading: true}});

  const res = await request({
    url: URL,
    method: 'PUT',
    headers: MUH_URL.HEADER,
    data: DATA
  }).then(function (response) {
    console.log("GÜNCELLEME!");
    const mesaj = <div>{response.data.message} <br/>{response.data.status}</div>;
    dispatch({type: SHOW_LOAD, data: {loading: false}});
    dispatch({type: TOASTR_MESSAGE, data: {type: 'success', message: mesaj}});
    return null;
  }).catch(function (error) {
    const mesaj = <div>HATA OLUŞTU <br/>{error.response.data.message} <br/>{error.response.data.details}</div>;
    dispatch({type: TOASTR_MESSAGE, data: {type: 'error', message: mesaj}});
    dispatch({type: SHOW_LOAD, data: {loading: false}});
  });

  return res;
};

export const DELETE = async (URL, dispatch) => {
  dispatch({type: SHOW_LOAD, data: {loading: true}});

  const response = await request({
    url: URL,
    method: 'DELETE',
    headers: MUH_URL.HEADER
  }).then(function (response) {
    console.log("SİLME!");
    const mesaj = <div>{response.data.message} <br/>{response.data.status}</div>;
    dispatch({type: SHOW_LOAD, data: {loading: false}});
    dispatch({type: TOASTR_MESSAGE, data: {type: 'success', message: mesaj}});
    return null;
  }).catch(function (error) {
    const mesaj = <div>HATA OLUŞTU <br/>{error.response.data.message} <br/>{error.response.data.details}</div>;
    dispatch({type: TOASTR_MESSAGE, data: {type: 'error', message: mesaj}});
    dispatch({type: SHOW_LOAD, data: {loading: false}});
  });

  return response;
};

export const getKurum = async (URL) => {
  const array = [];
  return request({
    url: URL,
    method: 'GET',
    headers: MUH_URL.HEADER
  }).then(function (response) {
    response.data.map((dt) => {
      array.push({
        label: dt.tanim,
        value: dt.kurumId
      })
    });

    return array;
  }).catch(function (response) {
    console.log("Error: getKurum" + response);
  });
};

export const getIsYeri = async (URL) => {
  const array = [];
  return request({
    url: URL,
    method: 'GET',
    headers: MUH_URL.HEADER
  }).then(function (response) {
    response.data.map((dt) => {
      array.push({
        label: dt.tanim,
        value: dt.isYeriId,
        web: dt.webServisi
      })
    });

    return array;
  }).catch(function (response) {
    console.log("Error: getIsYeri" + response);
  });

};


export const getKod = async (URL) => {
  const array = [];
  return request({
    url: URL,
    method: 'GET',
    headers: MUH_URL.HEADER
  }).then(function (response) {
    response.data.data.map((dt) => {
      array.push({
        label: dt.tanim,
        value: dt.kodId,
      })
    });

    return array;
  }).catch(function (response) {
    console.log("Error: getKod" + response);
  });
};

export const getOran = async (URL) => {
  const array = [];
  return request({
    url: URL,
    method: 'GET',
    headers: MUH_URL.HEADER,
    params: {'search': null, 'size': 100}
  }).then(function (response) {
    response.data.data.map((dt) => {
      array.push({
        label: dt.tanim,
        value: dt.oranId
      })
    });

    return array;
  }).catch(function (response) {
    console.log("Error: getOran" + response);
  });
};


export const getBirimTree = (array) => {
  if (array.length > 0) {
    const data = [{}];
    array.map((d) => {
      data.push({
        ID: d.birimId,
        isYeri: d.isYeri ? d.isYeri.tanim : null,
        tanim: d.tanim,
        teskilat: d.teskilat ? d.teskilat.tanim : null,
        il: d.il ? d.il.tanim : null,
        ilce: d.ilce ? d.ilce.tanim : null,
        aktif: d.aktif,
        detsis: d.detsis,
        seviye: d.seviye,
        PARENTID: d.ustBirimId !== undefined ? d.ustBirimId : null
      });
    });

    const tree = function (data, root) {
      const t = {};
      data.forEach(o => {
        Object.assign(t[o.ID] = t[o.ID] || {}, o);
        t[o.PARENTID] = t[o.PARENTID] || {};
        t[o.PARENTID].children = t[o.PARENTID].children || [];
        t[o.PARENTID].children.push(t[o.ID]);
      });
      return t[root].children;
    }(data, null);

    return tree;
  } else
    return [];
};

export const RAPOR = async (raporTuru, ekran, raporAdi, params, dispatch) => {
  dispatch({type: SHOW_LOAD, data: {loading: true}});
  const response = await request({
    url: MUH_URL.RAPOR.SORGU,
    method: 'POST',
    headers: MUH_URL.HEADER,
    responseType: 'blob',
    params: {'turu': raporTuru, 'ekran': ekran, 'adi': raporAdi},
    data: params
  }).then(function (response) {

    dispatch({type: SHOW_LOAD, data: {loading: false}});
    if (raporTuru === 'PDF') {
      exportPDF(response.data, raporAdi, dispatch);
    } else if (raporTuru === 'WORD') {
      exportDOCX(response.data, raporAdi, dispatch);
    } else if (raporTuru === 'EXCEL') {
      exportXLSX(response.data, raporAdi, dispatch);
    }

    console.log("RAPOR!");
    return null;
  }).catch(function (error) {
    const mesaj = <div>HATA OLUŞTU <br/>{error.response.data.message} <br/>{error.response.data.details}</div>;
    dispatch({type: TOASTR_MESSAGE, data: {type: 'error', message: mesaj}});
    dispatch({type: SHOW_LOAD, data: {loading: false}});
    console.log(error.request)
  });

  return response;
};


export const exportPDF = async (data, name, dispatch) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute("download", name + ".pdf");
  document.body.appendChild(link);
  link.click();

  if (dispatch !== null) {
    dispatch({type: TOASTR_MESSAGE, data: {type: 'success', message: name + ' Raporu PDF Olarak Alındı!'}});
  }
};

export const exportDOCX = async (data, name, dispatch) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute("download", name + ".docx");
  document.body.appendChild(link);
  link.click();

  if (dispatch !== null) {
    dispatch({type: TOASTR_MESSAGE, data: {type: 'success', message: name + ' Raporu DOCX Olarak Alındı!'}});
  }
};

export const exportXLSX = async (data, name, dispatch) => {
  const url = window.URL.createObjectURL(new Blob([data]));
  const link = document.createElement('a');
  link.href = url;
  link.setAttribute("download", name + ".xlsx");
  document.body.appendChild(link);
  link.click();

  if (dispatch !== null) {
    dispatch({type: TOASTR_MESSAGE, data: {type: 'success', message: name + ' Raporu EXCEL Olarak Alındı!'}});
  }
};

