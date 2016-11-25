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
    listPedidos: [],
    total: 0,
    cantidad: 0,

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
        var listPlatos = [], total = 0, cantidad = 0;
        this.set('listPedidos', []);

        for (var i = 0; i < this.listPlatos.length; ++i) {
            if (this.listPlatos[i].details.Id == itemPlato.details.Id) {
                this.listPlatos[i].cantidad += 1;
            }
            if (this.listPlatos[i].cantidad > 0) {
                this.listPedidos.push(this.listPlatos[i]);
            }
            cantidad += this.listPlatos[i].cantidad;
            total += parseFloat(this.listPlatos[i].precio) * this.listPlatos[i].cantidad;

            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
        this.set('cantidad', cantidad);
        this.set('total', total);
    },
    disminuirCantidad: function (itemPlato) {
        var listPlatos = [];
        for (var i = 0; i < this.listPlatos.length; ++i) {
            this.listPlatos[i].details.Id == itemPlato.details.Id && this.listPlatos[i].cantidad > 0 ? this.listPlatos[i].cantidad -= 1 : '';
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
    },
    limpiarPedidos: function () {
        var listPlatos = [];
        for (var i = 0; i < this.listPlatos.length; ++i) {
            this.listPlatos[i].cantidad = 0;
            listPlatos.push(this.listPlatos[i]);
        }
        this.set('listPlatos', listPlatos);
        this.set('listPedidos', []);
        this.set('total', 0);
        this.set('cantidad', 0);
    },
});

// START_CUSTOM_CODE_categorias
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_categorias
module.exports = ViewModel;


