/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var App = App || {};
App.Practico = (function() {
    var validarMatricula = function(){
        $("#matricula").change(function (){
            alert($(this).val());
        });
    };
    
    return {
        inicio:function (){
            alert('app iniciado');  
        },
        punto1:function (){
            validarMatricula();
        },
        init: function() {
            App.Practico.inicio();
            App.Practico.punto1();
        }
    };
})();

$(function() {
    App.Practico.init();
});
