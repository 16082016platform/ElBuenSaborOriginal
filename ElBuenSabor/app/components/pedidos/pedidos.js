'use strict';
var isInit = true,
    helpers = require('../../utils/widgets/helper'),
    navigationProperty = require('../../utils/widgets/navigation-property'),
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
