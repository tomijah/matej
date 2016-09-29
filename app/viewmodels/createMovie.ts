import ko = require("knockout");
import data = require("common/data");
import modal = require("common/modal");

class CreateMovie extends modal.ModalViewModelBase {
    title = ko.observable<string>().extend({ required: true });
    serialNumber = ko.observable<string>().extend({ required: true });

    ok() {
        if (!this.isModelValid() || this.isLoading()) {
            return;
        }

        var movie = <IMovie>{};
        movie.title = this.title();
        movie.serialNumber = this.serialNumber();
        movie.isAvailable = true;

        this.startLoading();
        data.createMovie(movie).then((movie) => {
            this.close(movie);
        }).always(this.stopLoading);
    }

    cancel() {
        this.close(null);
    }
}

export = CreateMovie