import React from 'react';
import MUHKod from "./views/pages/kod/MUHKod";
import MUHRol from "./views/pages/rol/MUHRol";
import MUHOran from "./views/pages/oran/MUHOran";
import MUHKullanici from "./views/pages/kullanici/MUHKullanici";
import MUHHesap from "./views/pages/hesap/MUHHesap";
import MUHKiraBedel from "./views/pages/kirabedel/MUHKiraBedel";
import MUHKullaniciLogList from "./views/pages/log/MUHKullaniciLogList";
import MUHHataLogList from "./views/pages/log/MUHHataLogList";
import MUHIslemLogList from "./views/pages/log/MUHIslemLogList";


const Dashboard = React.lazy(() => import('./views/dashboard/Dashboard'));
const Login = React.lazy(() => import('./views/pages/login/Login'));

const routes = [
  {path: '/', exact: true, name: 'Ana Sayfa'},
  // {path: '/', exact: true, name: 'Login', component: Login},
  {path: '/dashboard', name: '', component: Dashboard},
  {path: '/MUHKod', exact: true, name: 'Kod Listesi', component: MUHKod},
  {path: '/MUHRol', exact: true, name: 'Rol Listesi', component: MUHRol},
  {path: '/MUHOran', exact: true, name: 'Oran Listesi', component: MUHOran},
  {path: '/MUHKullanici', exact: true, name: 'Kullanıcı Listesi', component: MUHKullanici},
  {path: '/MUHHesap', exact: true, name: 'Hesap Listesi', component: MUHHesap},
  {path: '/MUHKiraBedel', exact: true, name: 'Kira Bedelleri', component: MUHKiraBedel},
  {path: '/MUHKullaniciLogList', exact: true, name: 'Kullanıcı Log Listesi', component: MUHKullaniciLogList},
  {path: '/MUHHataLogList', exact: true, name: 'Hata Log Listesi', component: MUHHataLogList},
  {path: '/MUHIslemLogList', exact: true, name: 'İşlem Log Listesi', component: MUHIslemLogList},
];

export default routes;
