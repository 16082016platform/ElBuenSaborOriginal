'use strict';
var menuItems,
    observable = require('data/observable'),
    navigationViewModel = new observable.Observable();

menuItems = [{
    "title": "Home View",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue0dd"
}, {
    "title": "Categorías",
    "moduleName": "components/categorias/categorias",
    "icon": "\ue204"
}, {
    "title": "Perfil",
    "moduleName": "components/users/users",
    "icon": "\ue0e4"
}, {
    "title": "Salir",
    "moduleName": "components/homeView/homeView",
    "icon": "\ue1ff",
    "context": {
        "logout": true
    }
}];

navigationViewModel.set('menuItems', menuItems);
navigationViewModel.set('backButtonHidden', true);

module.exports = navigationViewModel;