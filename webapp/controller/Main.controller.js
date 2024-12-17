sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("com.ust.northwind.nwpractice.controller.Main", {
        onInit: function () {

        },
        onEmployeePress(){
          const  orouter = this.getOwnerComponent().getRouter();
          orouter.navTo("RouteEmployee");

        }
    });
});
