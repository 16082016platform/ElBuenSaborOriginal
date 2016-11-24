'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),

    service = require('./categorias-service'),
    servicePlatos = require('../platos/platos-service'),
    // additional requires

    viewModel = require('./categorias-view-model');

function onListViewItemTap(args) {
    // var itemData = viewModel.get('listItems')[args.index];

    // helpers.navigate({
    //     moduleName: 'components/platos/platos',
    //     context: {
    //         filter: {
    //             categoria: itemData.details.Id
    //         }
    //     }
    // });

    var itemData = viewModel.get('listPlatos')[args.index];

    helpers.navigate({
        moduleName: 'components/platos/itemDetails/itemDetails',
        context: itemData.details
    });
}
exports.onListViewItemTap = onListViewItemTap;

function cargarPlatos() {

    viewModel.set('isLoading', true);
    viewModel.set('listPlatos', []);

    function _fetchData() {
        return servicePlatos.getAllRecords({
            categoria: viewModel.get('categoriaActiva')
        });
    };

    _fetchData()
        .then(function (result) {
            var itemsList = [];

            result.forEach(function (item) {

                flattenLocationProperties(item);

                itemsList.push({

                    header: item.nombre,

                    // singleItem properties
                    details: item
                });
            });

            viewModel.set('listPlatos', itemsList);
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
}
exports.cargarPlatos = cargarPlatos;

function flattenLocationProperties(dataItem) {
    var propName, propValue,
        isLocation = function (value) {
            return propValue && typeof propValue === 'object' &&
                propValue.longitude && propValue.latitude;
        };

    for (propName in dataItem) {
        if (dataItem.hasOwnProperty(propName)) {
            propValue = dataItem[propName];
            if (isLocation(propValue)) {
                dataItem[propName] =
                    'Latitude: ' + propValue.latitude +
                    'Longitude: ' + propValue.longitude;
            }
        }
    }
}
// additional functions

function pageLoaded(args) {
    var page = args.object;

    helpers.platformInit(page);
    page.bindingContext = viewModel;

    viewModel.set('isLoading', true);
    viewModel.set('listItems', []);

    function _fetchData() {
        var context = page.navigationContext;

        if (context && context.filter) {
            return service.getAllRecords(context.filter);
        }

        return service.getAllRecords();
    };

    _fetchData()
        .then(function (result) {
            var itemsList = [];
            var width = page.getMeasuredWidth() / result.length;

            result.forEach(function (item) {

                flattenLocationProperties(item);

                itemsList.push({

                    header: item.nombre,

                    // singleItem properties
                    details: item,

                    width: width,

                    activo: false
                });
            });

            itemsList[0].activo = true;
            viewModel.set('categoriaActiva', itemsList[0].details.Id);

            viewModel.set('listItems', itemsList);
            viewModel.set('isLoading', false);
        })
        .catch(function onCatch() {
            viewModel.set('isLoading', false);
        });
    // additional pageLoaded

    //   35d3eb60-ac2f-11e6-bbe3-2b75d1374b2d


    if (isInit) {
        isInit = false;

        // additional pageInit

        var timer = require("timer");
        let id = timer.setInterval(() => {
            cargarPlatos();
            timer.clearInterval(id);
        }, 1500);
    }
}

// START_CUSTOM_CODE_categorias
// Add custom code here. For more information about custom code, see http://docs.telerik.com/platform/screenbuilder/troubleshooting/how-to-keep-custom-code-changes

// END_CUSTOM_CODE_categorias
exports.pageLoaded = pageLoaded;