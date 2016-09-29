requirejs.config({
    paths: {
        'text': '../node_modules/requirejs-text/text',
        'durandal': '../node_modules/Durandal/js',
        'plugins': '../node_modules/Durandal/js/plugins',
        'knockout': '../node_modules/knockout/build/output/knockout-latest.debug',
        'jquery': '../node_modules/jquery/dist/jquery',
        'knockout.validation': '../node_modules/knockout.validation/dist/knockout.validation',
        'delegatedEvents': '../node_modules/knockout-delegated-events/build/knockout-delegatedEvents',
        'lodash': '../node_modules/lodash/lodash',
        'bootstrap': '../node_modules/bootstrap-sass/assets/javascripts/bootstrap',
        'moment': '../node_modules/moment/moment',
    },
    shim: {
        'knockout.validation': ["knockout"],
        'delegatedEvents': ["knockout"],
        'bootstrap': ["jquery"]
    },
    deps: [
        'bootstrap',
        'delegatedEvents',
        'common/customBindings'
    ]
});

requirejs([
    'jquery',
    'durandal/system',
    'durandal/app',
    'durandal/viewLocator',
    'knockout.validation'
],
    ($: JQueryStatic,
        system: DurandalSystemModule,
        app: DurandalAppModule,
        viewLocator: DurandalViewLocatorModule,
        koValidate: KnockoutValidationStatic,
        csrf) => {

        system.debug(true);

        koValidate.init({
            errorElementClass: 'has-error',
            errorMessageClass: 'help-block',
            grouping: { deep: true },
            insertMessages: true,
            decorateInputElement: true
        });

        app.title = 'DVD';
        app.configurePlugins({
            router: true,
            dialog: true
        });

        app.start().then(() => {
            viewLocator.useConvention();
            app.setRoot('viewmodels/shell');
        });
    });