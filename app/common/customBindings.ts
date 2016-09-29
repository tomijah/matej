import moment = require("moment");
import ko = require("knockout");

ko.bindingHandlers["date"] = {
    update: (element: any, valueAccessor: () => any, allBindingsAccessor: KnockoutAllBindingsAccessor, viewModel: any, bindingContext: KnockoutBindingContext) => {
        var dateValueAccessor = () => {
            var value: Date = ko.utils.unwrapObservable(valueAccessor());
            if (!value) {
                return "";
            }

            return moment(value).format('L');
        };

        ko.bindingHandlers.text.update.call(this, element, dateValueAccessor, allBindingsAccessor, viewModel, bindingContext);
    }
};