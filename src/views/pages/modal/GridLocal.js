export const AG_MODEL_LOCAL =
  {
    // for filter panel
    page: 'Sayfa',
    more: 'Devamı',
    to: '-',
    of: '/',
    next: 'İleri',
    previous: 'Sonraki',
    loadingOoo: 'Yükleniyor...',

    // for set filter
    selectAll: 'Tümünü seç',
    searchOoo: 'Ara...',
    blanks: 'Boş',

    // for number filter and text filter
    filterOoo: 'Süz...',
    applyFilter: 'Süzme...',
    equals: 'Eşittir',
    notEquals: 'Eşit değilse',
    notEqual: 'Eşit Değil',

    lessThan: 'Küçüktür',
    greaterThan: 'Büyüktür',
    lessThanOrEqual: 'Küçük eşit',
    greaterThanOrEqual: 'Büyük eşit',
    inRange: 'Aralık',

    // for text filter
    contains: 'İçeriyorsa',
    notContains: 'İçermiyorsa',
    startsWith: 'Başlıyorsa',
    endsWith: 'Bitiyorsa',

    // the header of the default group column
    group: 'Grup',

    // tool panel
    columns: 'Sütunlar',
    filters: 'Süzme',
    rowGroupColumns: 'Pivot Sütun',
    rowGroupColumnsEmptyMessage: ' sütunları gruba sürükle',
    valueColumns: 'Sütun Değeri',
    pivotMode: 'Pivot-Modu',
    groups: 'Gruplar',
    values: 'Değerler',
    pivots: 'Pivotlar',
    valueColumnsEmptyMessage: ' toplamak için sütunları sürükleyin',
    pivotColumnsEmptyMessage: ' pivot için buraya sürükleyin',
    toolPanelButton: 'Araç çubuğu',

    // other
    noRowsToShow: ' Veri Bulunamadı.',

    // enterprise menu
    pinColumn: 'Stünu sabitle',
    valueAggregation: 'Değer',
    autosizeThiscolumn: 'Sığdır',
    autosizeAllColumns: 'Sütunları tomatik boyutlandır',
    groupBy: 'Grupla',
    ungroupBy: 'Gruplama',
    resetColumns: 'Sütunları sıfırla',
    expandAll: 'Hepsini aç',
    collapseAll: 'Hepsini kapat',
    toolPanel: 'Araç paneli',
    export: 'Çıkart',
    csvExport: 'CSV ye çıkar',
    excelExport: 'Excel e aktar',

    // enterprise menu pinning
    pinLeft: 'Sola yasla <<',
    pinRight: 'Sağa yasla >>',
    noPin: 'Yaslama <>',

    // enterprise menu aggregation and status panel
    sum: 'Sum',
    min: 'En az',
    max: 'En çok',
    first: 'İlk',
    last: 'Son',
    none: 'Yok',
    count: 'Say',
    verage: 'Ortalama',

    // standard menu
    copy: 'Kopyala',
    copyWithHeaders: 'Başlığı kopyala',
    ctrlC: 'ctrl C',
    paste: 'Yapıştır',
    ctrlV: 'ctrl C'
  };

export var AG_GRID_LOCALE_TR = {};

Object.keys(AG_MODEL_LOCAL).forEach(function (key) {
  AG_GRID_LOCALE_TR[key] = AG_MODEL_LOCAL[key];
});
