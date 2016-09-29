import ko = require("knockout");
import data = require("common/data");
import modal = require("common/modal");

class CreateCustomer extends modal.ModalViewModelBase {
    firstName = ko.observable<string>().extend({ required: true });
    lastName = ko.observable<string>().extend({ required: true });
    email = ko.observable<string>().extend({ email: true });
    address = ko.observable<string>();

    ok() {
        if (!this.isModelValid() || this.isLoading()) {
            return;
        }

        var customer = <ICustomer>{};
        customer.firstName = this.firstName();
        customer.lastName = this.lastName();
        customer.email = this.email();
        customer.address = this.address();

        this.startLoading();
        data.createCustomer(customer).then((id) => {
            this.close();
            this.navigate(`#customerdetails/${id}`);
        }).always(this.stopLoading);
    }

    cancel() {
        this.close();
    }
}

export = CreateCustomer