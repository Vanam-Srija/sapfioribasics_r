sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/ui/model/json/JSONModel"
], function (Controller, JSONModel) {
    "use strict";

    return Controller.extend("com.ust.northwind.nwpractice.controller.EmployeeDetail", {
        onInit() {
            const router = this.getOwnerComponent().getRouter();
            router.getRoute("employeeDetail").attachPatternMatched(this.handleRouteMatched, this);
        },

        handleRouteMatched(event) {
            const employeeId = event.getParameter("arguments").EmployeeID; // Get the employee ID
            if (employeeId) {
                this._fetchEmployeeData(employeeId);
                this._fetchOrdersData(employeeId); // Fetch orders data for the employee
            } else {
                console.error("No EmployeeID provided in the route.");
            }
        },

        _fetchEmployeeData(employeeId) {
            const employeePath = "/Employees";
            const model = this.getView().getModel();

            model.read(employeePath, {
                success: (data) => this.onDataFetchSuccess(employeeId, data),
                error: this.onDataFetchError
            });
        },

        _fetchOrdersData(employeeId) {
            // Modify this line to fetch orders related to the specific EmployeeID
            const orderPath = `/Orders?$filter=EmployeeID eq ${employeeId}`; // Filter orders by employee ID
            const model = this.getView().getModel();

            model.read(orderPath, {
                success: (data) => this.onOrdersDataFetchSuccess(data),
                error: this.onDataFetchError
            });
        },

        onDataFetchSuccess(employeeId, data) {
            if (data && data.results) {
                const selectedEmployee = data.results.find((employee) => {
                    return employee.EmployeeID && employee.EmployeeID.toString() === employeeId.toString();
                });

                if (selectedEmployee) {
                    const jsonModel = new JSONModel(selectedEmployee); // Bind as a single object
                    this.getView().setModel(jsonModel, "selectedEmployee");
                } else {
                    console.error(`No employee found with EmployeeID: ${employeeId}`);
                }
            } else {
                console.error("Data or results are undefined.");
            }
        },

        onOrdersDataFetchSuccess(data) {
            if (data && data.results) {
                const ordersModel = new JSONModel(data.results); // Bind orders data to a new model
                this.getView().setModel(ordersModel, "orders"); // Set orders model
            } else {
                console.error("Order data or results are undefined.");
            }
        },

        onDataFetchError(error) {
            console.error(`Error fetching data: ${error}`);
        }
    });
});
