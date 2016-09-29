import ko = require("knockout");
import data = require("common/data");
import ViewModelBase = require("common/viewModelBase");
import modal = require("common/modal");
import CreateMovie = require("viewModels/createMovie");

class Movies extends ViewModelBase {
    list = ko.observableArray<IMovie>();

    activate() {
        this.loadMovies();
    }

    loadMovies() {
        this.startLoading();
        data.getAllMovies(null, null).then((results) => {
            this.list(results);
        }).always(this.stopLoading);
    }

    createNew() {
        modal.show(new CreateMovie()).then((newMovie: IMovie) => {
            if (newMovie) {
                this.loadMovies();
            }
        });
    }
}

export = Movies;