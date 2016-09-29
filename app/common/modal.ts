import dialog = require("plugins/dialog");
import composition = require("durandal/composition");
import ko = require("knockout");
import $ = require("jquery");
import ViewModelBase = require('common/viewModelBase');

function createModalContext(): dialog.DialogContext {
    return {
        addHost(theDialog: any) {
            var cont = $(`<div id="modal" class="modal fade"><div class="modal-dialog"><div class="modal-content"></div></div></div>`);
            cont.appendTo(document.body);
            var el = cont.find('.modal-content')[0];
            theDialog.host = el;
            return el;
        },
        compositionComplete(child: HTMLElement, parent: HTMLElement, context: composition.CompositionContext) {
            var modalContainer = $(child).closest('.modal');
            var viewModel = context.model;
            modalContainer.modal({
                backdrop: 'static',
                keyboard: false
            }).on('shown.bs.modal', () => {
                if (viewModel.shown) {
                    viewModel.shown();
                }
            });
        },
        removeHost(theDialog: any) {
            var modalContainer = $(theDialog.host).closest('.modal');
            modalContainer.modal('hide');
        }
    };
}

dialog.addContext('normal', createModalContext());

export class ModalViewModelBase extends ViewModelBase {
    close(result: any = null) {
        dialog.close(this, result);
    }

    shown() {
        this.autofocus(true);
    }
}

export function show(viewModel: any, activationData?: any): JQueryPromise<any> {
    return dialog.show(viewModel, activationData, 'normal');
}