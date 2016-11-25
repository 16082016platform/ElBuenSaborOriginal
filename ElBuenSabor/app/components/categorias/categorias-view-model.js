'use strict';
var ViewModel,
    Observable = require('data/observable').Observable;
// additional requires

ViewModel = new Observable({

    pageTitle: 'Categorías',

    isLoading: false,
    listItems: [],
    // additional properties
    listPlatos: [],
    isLinearActive: true,

    cambiarCategoria: function (idCategoria) {
        var listItems = [];
        for (var i = 0; i < this.listItems.length; ++i) {
            this.listItems[i].details.Id == idCategoria ? this.listItems[i].isActivo = true : this.listItems[i].isActivo = false;
            listItems.push(this.listItems[i]);
        }

        this.set('listItems', listItems);
        this.cambiarListaPlatos(idCategoria);

    },
    cambiarListaPlatos: function (idCategoria) {
        var listPlatos = [];
        for (var i = 0; i < this.listPlatos.length; ++i) {
            this.listPlatos[i].categoria == idCategoria ? this.listPlatos[i].isVisible = true : this.listPlatos[i].isVisible = false;
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
    },
    aumentarCantidad: function (itemPlato) {
        var listPlatos = [];
        for (var i = 0; i < this.listPlatos.length; ++i) {
            this.listPlatos[i].details.Id == itemPlato.details.Id ? this.listPlatos[i].cantidad += 1 : '';
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
    },
    disminuirCantidad: function (itemPlato) {
        var listPlatos = [];
        for (var i = 0; i < this.listPlatos.length; ++i) {
            this.listPlatos[i].details.Id == itemPlato.details.Id && this.listPlatos[i].cantidad>0 ? this.listPlatos[i].cantidad -= 1 : '';
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
    },
});

// START_CUSTOM_CODE_categorias
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_categorias
module.exports = ViewModel;