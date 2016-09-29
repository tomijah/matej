import router = require('plugins/router');
import ko = require('knockout');
import $ = require('jquery');
import _ = require('lodash');

abstract class ViewModelBase {

    protected errors: KnockoutValidationErrors;
    autofocus = ko.observable(false);
    isLoading = ko.observable(false);

    constructor() {
        this.bindMethodsToCurrentInstance('stopLoading', 'startLoading');
    }

    navigate(hash: string) {
        router.navigate(hash);
    }

    bindMethodsToCurrentInstance(...methods: string[]) {
        _.bindAll.call(_, this, methods);
    }

    compositionComplete() {
        this.autofocus(true);
    }

    stopLoading() {
        this.isLoading(false);
    }

    startLoading() {
        this.isLoading(true);
    }


    isModelValid(focus = true): boolean {
        if (this.errors === undefined) {
            var groupingOptions: KnockoutValidationGroupingOptions = {
                deep: true
            };
            this.errors = ko.validation.group(this, groupingOptions);
        }

        this.errors.showAllMessages();

        var isValid = this.errors().length === 0;

        if (focus && !isValid) {
            this.focusFirstError();
        }

        return isValid;
    }

    focusFirstError() {
        var firstErroLabel = $('.has-error label').first();

        if (firstErroLabel.length > 0) {
            firstErroLabel[0].scrollIntoView();
        }

        $('input.has-error, textarea.has-error, select.has-error').first().focus();
    }
}

export = ViewModelBase;