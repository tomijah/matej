import ko = require("knockout");
import data = require("common/data");
import ViewModelBase = require("common/viewModelBase");

class CustomerDetails extends ViewModelBase {
    details: ICustomer;
    history = ko.observableArray<IRentalhistoryItem>();
    availableMovies = ko.observableArray<IMovie>();
    term = ko.observable("").extend({ throttle: 200 });
    canActivate(id: string): any {
        var customerId = parseInt(id);
        if (isNaN(customerId)) {
            return { redirect: '#' };
        }

        return data.getCustomer(customerId).then((customer) => {
            this.details = customer;
            return true;
        }).fail(() => {
            return { redirect: '#' };
        });
    }

    activate() {
        this.loadRentalHistory();
        this.term.subscribe((newTerm) => {
            this.searchMovies();
        });
    }

    loadRentalHistory() {
        this.startLoading();
        data.getRentalHistory(this.details.id).then((result) => {
            this.history(result);
        }).always(this.stopLoading);
    }

    searchMovies() {
        data.searchAvailableMovies(this.term()).then((result) => {
            this.availableMovies(result);
        });
    }

    rent(movie: IMovie) {
        if (this.isLoading()) {
            return;
        }

        this.startLoading();
        data.rentMovie(movie.id, this.details.id).then(() => {
            this.term("");
            this.loadRentalHistory();
        })
    }

    return(rental: IRentalhistoryItem) {
        this.startLoading();
        data.returnMovie(rental.rentalId).then(() => {
            this.loadRentalHistory();
        });
    }
}

export = CustomerDetails;