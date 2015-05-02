/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

var App = App || {};
App.Practico = (function() {
    //contenedor para el archivo json
    var arrayProfesionales; 
    
    var validarMatricula = function(){
        $("#matricula").change(function (){
            var validatorMatricula =new RegExp("^([A-Z]|[a-z]){2}\\u002D\\d{4}$");
            console.log(validatorMatricula.test($(this).val())+" - mat:"+" "+$(this).val())
            if (!validatorMatricula.test($(this).val())){
                mostrarMsg("la Matricula es incorrecta");
            }
        });
    };
    
    //muestra msj de las validaciones
    var mostrarMsg=function (mensaje){
        $("#mensaje").hide();
        $("#mensaje").fadeIn(2000);
        $("#mensaje").html("<h4>"+mensaje+"</h4>");
        $("#mensaje").fadeOut(2000);
    }
    
    //agrega un profesional a la tabla de profesionales encontrados
    var agregarFila=function (p){
        $('#tblProfesionales tr:last').after('<tr><td>'+p.apellido+'</td>'+
                                '<td>'+p.nombres+'</td>'+
                                '<td>'+p.email+'</td>'+
                                '<td>'+p.matricula+'</td>'+
                                '<td>'+p.fechaMatriculacion+'</td>'+
                                '<td>'+p.ambito+'</td>'+
                                '<td>'+p.especialidad+'</td>'+'</tr>');
    }
    return {
        inicio : function (){
            console.log('app inicio');  
        },
        punto1 : function (){
            validarMatricula();
        },
        punto2 : function (){
            $("#chkBusqAvanzada").change(function (){
//                console.log("checked: "+$(this).is(":checked"));
                //si el chkBox esta seleccionado muestro el cmbEspecialidad
                if($(this).is(":checked")){
                    $("#especialidad").attr("hidden",false);
                }else{
                    $("#especialidad").attr("hidden",true);
                }
            });
        },
        punto3 : function (){
//            console.log("-------punto3")
            $.getJSON('profesionales.json',function(json){
                console.log("arrayProf: "+json);
                //cargo el array con los datos del archivo json
                arrayProfesionales=json.profesionales; //profesionales es un array en el archivo .json
                
                //prueba para ver datos cargados en el array traidos del archivo .json
//                console.log(arrayProfesionales[1].nombres);
//                $.each(arrayProfesionales,function (i,item){
//                   console.log(item.nombres); 
//                });
            });
        },
        punto4 : function (){
          $("#btnBuscar").click(function(){
                console.log("click buscar");

                var matricula = $("#txtMatricula").val();
                var nombres = $("#txtNombre").val();
                var apellido = $("#txtApellido").val();
                var email = $("#txtMatricula").val();
                var ambito="n";
                var especialidad=$('#cmbEspecialidad').val();
                if ($("#radioProv").is(":checked")){
                    ambito = "p";
                }
                
                $("#tblProfesionales td").remove(); //limpio la tabla
                
                //recorro el array y comparo con los datos ingresados
                $.each(arrayProfesionales,function (i,p){
                    if (matricula != "" && p.matricula == matricula){
                        agregarFila(p);
                    }else{
                        if($("#chkBusqAvanzada").is(":checked") && p.especialidad==especialidad){
                            agregarFila(p);
                        }else{
                            if(!$("#chkBusqAvanzada").is(":checked") && ambito==p.ambito){
                                agregarFila(p);
                            }else{
                                if((nombres != "" && p.nombres.toLowerCase().contains(nombres)) 
                                        || (apellido != "" && p.apellido.toLowerCase().contains(apellido))
                                        || (email != "" && p.email==email)){
                                    agregarFila(p);
                                }                            
                            }
                        }
                    }
                });
          });
        },
        init: function() {
            App.Practico.inicio();
            App.Practico.punto1();
            App.Practico.punto2();
            App.Practico.punto3();
            App.Practico.punto4();
        }
    };
})();

$(function() {
    App.Practico.init();
});
