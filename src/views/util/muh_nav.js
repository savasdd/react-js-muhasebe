import React from "react";

const muh_nav = [
  {
    _tag: 'CSidebarNavItem',
    name: 'Ana Sayfa',
    to: '/dashboard',
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Kullanıcı Bilgileri',
    route: '/pages',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Kullanıcı Listesi',
        to: '/MUHKullanici',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Hesap Planları',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Hesap Bilgisi',
        to: '/MUHHesap',
      },
    ],
  },

  {
    _tag: 'CSidebarNavDropdown',
    name: 'Bedel Girişleri',
    route: '/pages',
    icon: 'cil-layers',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Kiracı Listesi',
        to: '/MUHKiraBedel',
      }
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Tanımlamalar',
    route: '/pages',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Kod Tanımlama',
        to: '/MUHKod',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Rol Tanımlama',
        to: '/MUHRol',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Oran Tanımlama',
        to: '/MUHOran',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Log Ekranları',
    route: '/pages',
    icon: 'cil-laptop',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Kullanıcı Log İzleme',
        to: '/MUHKullaniciLogList',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Hata Log İzleme',
        to: '/MUHHataLogList',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'İşlem Log İzleme',
        to: '/MUHIslemLogList',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Çıkış Yap',
    to: '/Login',
    icon: 'cil-lock-locked',
  },
];

export default muh_nav;
