'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
    dataService = require('../../dataProviders/elBuenSabor'),
    servicePedidos = require('./pedidos-service'),
    // additional requires
    viewModel = require('../categorias/categorias-view-model');

// additional functions
function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    var context = page.navigationContext;

    // additional pageLoaded

    // Create the parallax background effect by scaling the background image
    // page.getViewById("pedidosParallax").animate({
    //     scale: { x: 1.2, y: 1.2 },
    //     duration: 8000
    // });

    if (isInit) {
        isInit = false;

        // additional pageInit

    }
}

// START_CUSTOM_CODE_pedidos
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_pedidos
exports.pageLoaded = pageLoaded;


function confirmarPedidos(args) {
    if (viewModel.get('listPedidos').length == 0) {
        dialogs.alert({
            message: "El carrito está vacio",
            okButtonText: "OK"
        })
        return;
    }

    helpers.navigate({
        moduleName: 'components/pedidos/pedidos',
        transitioniOS: {
            name: "curl",
            duration: 1000,
            curve: "easeIn"
        },
        transitionAndroid: {
            name: "explode",
            duration: 1000,
            curve: "easeOut"
        }
    });
}
exports.confirmarPedidos = confirmarPedidos;


function onRequestSuccess() {
    viewModel.limpiarPedidos();
    helpers.back();
}

function onRequestFail(err) {
    alert(JSON.stringify(err));
    return err;
}

exports.confirmarPedidos = function confirmarPedidos() {
    viewModel.set('isLoading', true);
    function _fetchData() {
        return servicePedidos.getAllRecords();
    };
    _fetchData()
        .then(function (result) {
            viewModel.set('isLoading', false);
            var data = dataService.data('pedidos');
            data.save({

                codigo: result.length + 1,
                total: viewModel.get('total'),
                cantidad: viewModel.get('cantidad'),
                estado: 'pendiente',
                pedido: viewModel.get('listPedidos'),

                // save properties

            })
                .then(onRequestSuccess.bind(this))
                .catch(onRequestFail.bind(this));
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
};