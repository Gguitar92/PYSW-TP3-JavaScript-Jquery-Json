/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var App = App || {};
App.Practico = (function() {
    
    var validarMatricula = function(){
        $("#matricula").change(function (){
            var validatorMatricula =new RegExp("^([A-Z]|[a-z]){2}\\u002D\\d{4}$");
            console.log(validatorMatricula.test($(this).val())+" - mat:"+" "+$(this).val())
            if (!validatorMatricula.test($(this).val())){
                mostrarMsg("la Matricula es incorrecta");
            }
        });
    };
    
    var mostrarMsg=function (mensaje){
        $("#mensaje").hide();
        $("#mensaje").fadeIn(2000);
        $("#mensaje").html("<h4>"+mensaje+"</h4>");
        $("#mensaje").fadeOut(2000);
    }
    
    return {
        inicio:function (){
            console.log('app iniciado');  
        },
        punto1:function (){
            validarMatricula();
        },
        punto2:function (){
            $("#chkBusqAvanzada").change(function (){
                console.log("checked: "+$(this).is(":checked"));
                if($(this).is(":checked")){
                    $("#especialidad").attr("hidden",false);
                }else{
                    $("#especialidad").attr("hidden",true);
                }
            })
        },
        init: function() {
            App.Practico.inicio();
            App.Practico.punto1();
            App.Practico.punto2();
        }
    };
})();

$(function() {
    App.Practico.init();
});
