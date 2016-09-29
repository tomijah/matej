import $ = require("jquery");

export function createPromise<T>(result: T, time: number = 0, fail = false): JQueryPromise<T> {
    var def = $.Deferred();

    var resolve = () => {
        if (fail) {
            def.reject();
        } else {
            def.resolve(result);
        }
    }

    if (time) {
        setTimeout(resolve, time);
    } else {
        resolve();
    }

    return def.promise();
}
