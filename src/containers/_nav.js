import React from "react";
import CIcon from '@coreui/icons-react';

const _nav= [
  {
    _tag: 'CSidebarNavItem',
    name: 'Ana Sayfa',
    to: '/dashboard',
    // icon: <CIcon name="cil-speedometer" customClasses="c-sidebar-nav-icon"/>,
    icon: 'cil-speedometer',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Personel Özlük',
    route: '/pages',
    icon: 'cil-user',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Özlük Bilgileri',
        to: '/IKMSclPersonel',
      },
    ],
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Genel Tanımlamalar',
    route: '/pages',
    icon: 'cil-star',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Kod Listesi',
        to: '/IKMGnlKod',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Kurum Bilgileri',
        to: '/IKMGnlKurum',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Genel Parametreler',
        to: '/IKMGnlParametre',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'İl-İlçe Tanımlama',
        to: '/IKMGnlil',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Öğrenim Bilgileri',
        to: '/IKMGnlOkul',
      },

      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'İlçe Tanımlama',
      //   to: '/IKMGnlilce',
      // },
      {
        _tag: 'CSidebarNavItem',
        name: 'İş Yeri Tanımlama',
        to: '/IKMGnlisYeri',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Konum Bilgisi',
        to: '/IKMGnlKonum',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Birim Bilgisi',
        to: '/IKMGnlBirim',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Personel Türü',
        to: '/IKMGnlPersonelTuru',
      },
      // {
      //   _tag: 'CSidebarNavItem',
      //   name: 'İkonlar',
      //   to: '/IKMIkon',
      // },
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
        to: '/IKMUserLog',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Hata Log İzleme',
        to: '/IKMHataLog',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'İşlem Log İzleme',
        to: '/IKMIslemLog',
      },
    ],
  },
  {
    _tag: 'CSidebarNavItem',
    name: 'Dinamik Web Servisi',
    to: '/IKMGnlWebService',
    icon: 'cil-layers',
  },
  {
    _tag: 'CSidebarNavDropdown',
    name: 'Sistem Ekranları',
    route: '/pages',
    icon: 'cil-settings',
    _children: [
      {
        _tag: 'CSidebarNavItem',
        name: 'Rol Tanımlama',
        to: '/IKMGnlRol',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Rol Grupları',
        to: '/IKMGnlRolGrup',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Kullanıcı Bilgileri',
        to: '/IKMGnlKullanici',
      },
      {
        _tag: 'CSidebarNavItem',
        name: 'Sistem Parametreleri',
        to: '/IKMSysParametre',
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


export default _nav;
