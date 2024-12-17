sap.ui.define([
    "sap/ui/core/mvc/Controller"
],
function (Controller) {
    "use strict";

    return Controller.extend("com.ust.northwind.nwpractice.controller.Employee", {
        onInit: function () {
            this._fetchData();
        },
        _fetchData: function () {
            var oModel = this.getOwnerComponent().getModel();
            var oView = this.getView();

            // Bind data to a table or some UI element
            oModel.read("/Employees", {
                success: function (oData) {
                    oView.getModel().setProperty("/Employees", oData.value); // Assuming you have a Products property in your model
                },
                error: function (oError) {
                    console.error("Failed to fetch data", oError);
                }
            });
        },
        onListItemPress: function (oEvent) {
            // Get the pressed list item
            var oItem = oEvent.getSource();
            
            // Get the binding context of the pressed item
            var oContext = oItem.getBindingContext(); // Assuming the default model is used
        
            // Retrieve the EmployeeID from the context
            var sEmployeeID = oContext.getProperty("EmployeeID");
        
            // Navigate to the employeeDetail route with the EmployeeID
            var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("employeeDetail", {
                EmployeeID: sEmployeeID
            });
        }
        
          /*   const oItem = oEvent.getSource();
            const oContext = oItem.getBindingContext("products");
            const sCustId = oContext.getObject().CustomerID;
            const oRouter = this.getOwnerComponent().getRouter();
            oRouter.navTo("RouteDetail", {
                productId: sCustId
            });
        } */
    });
});