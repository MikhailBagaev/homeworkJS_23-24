requirejs.config({
    paths: {
        'jquery': 'http://code.jquery.com/jquery-1.12.0.min'
    },
    shim: {
        'jquery': {
            exports: 'jquery'
        }
    }
});
require(
    [
        'jquery', 'tmpl.resig', 'model', 'view', 'controller'
    ],
    function (jquery, tmpl, Model, View, Controller) {
        $(function(){
            var list = ['Покормить кота', 'Забрать ребенка из школы', 'Сделать ДЗ 23-24', 'Освободить Донбасс и Крым'];        
            var model = new Model(list);
            var view = new View(model);
            var controller = new Controller(model, view);
    });
    }
);