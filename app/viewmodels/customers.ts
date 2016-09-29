import ko = require("knockout");
import data = require("common/data");
import ViewModelBase = require("common/viewModelBase");
import modal = require("common/modal");
import CreateCustomer = require("viewModels/createCustomer");

class Customers extends ViewModelBase {
    list = ko.observableArray<ICustomer>();
    searchTerm = "";

    activate() {
        this.loadCustomers("");
    }

    loadCustomers(term: string) {
        this.startLoading();
        data.getAllCustomers(term).then((results) => {
            this.list(results);
        }).always(this.stopLoading);
    }

    search() {
        this.loadCustomers(this.searchTerm);
    }

    showDetails(customer: ICustomer) {
        this.navigate(`#customerdetails/${customer.id}`);
    }

    createNew() {
        modal.show(new CreateCustomer());
    }
}

export = Customers;