/* 
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
var App = App ||{};
App.Parte2 = (function (){
    
    var arrayProfesionales = [];
    var Profesional = function (matricula, apellido, nombres, email, fechaMatricula, especialidad, ambito, estado){
        this.matricula = matricula;
        this.apellido = apellido;
        this.nombres = nombres;
        this.email = email;
        this.fechaMatricula = fechaMatricula;
        this.especialidad = especialidad;
        this.ambito = ambito;
        this.estado = estado;
    };
    
    var validarCampos = function (){
//        console.log("funcion validar campos");
        var validatorMatricula = new RegExp("^([A-Z]|[a-z]){2}\\u002D\\d{4}$");
        if (!validatorMatricula.test($("#txtMatricula").val())) {
            mostrarMsg("la Matricula es incorrecta");
            return false;
        }
        if($("#txtApellido").val()== "" || $("#txtNombre").val() == "" || $("#txtEmail").val() == ""  || !$("#txtEmail").val().contains("@") || $("#txtFechaMatricula").val() == ""){
//            console.log("campos vacios");
            return false;
        }
        return true;
    };
    
    var mostrarMsg = function(mensaje) {
        $("#mensaje").hide();
        $("#mensaje").fadeIn(2000);
        $("#mensaje").html("<h4>" + mensaje + "</h4>");
        $("#mensaje").fadeOut(2000);
    };
    
    var agregarFila=function (p){
//        console.log("funcion add fila");
        $('#tblProfesionales tr:last').after('<tr><td>'+p.apellido+'</td>'+
                                '<td>'+p.nombres+'</td>'+
                                '<td>'+p.email+'</td>'+
                                '<td>'+p.matricula+'</td>'+
                                '<td>'+p.fechaMatriculacion+'</td>'+
                                '<td>'+p.ambito+'</td>'+
                                '<td>'+p.especialidad+'</td>'+'</tr>');
    };
    
    var limpiarCampos = function (){
        console.log("click limpiar");
        $(':input', '#formBusq')
                .not(':button, :submit, :reset, :hidden')
                .val('')
                .removeAttr('checked')
                .removeAttr('selected');
    };
    
    return {
        init : function (){
            console.log("Parte 2 iniciado");
            App.Parte2.punto2();
            App.Parte2.punto4();
            App.Parte2.btnLimpiar();
        },
        
        punto2 : function (){
            $("#txtMatricula").change(function (){
//                console.log("input chage");
                validarCampos();
            });
        },
        
        punto4 : function (){
            $("#btnAgregar").click(function (){
                console.log("click add");
                if(validarCampos()){
                    unProfecional = new Profesional(
                        $("#txtMatricula").val(),
                        $("#txtApellido").val(),
                        $("#txtNombre").val(),
                        $("#txtEmail").val(),
                        $("#txtFechaMatricula").val(),
                        $("#cmbEspecialidad").val(),
                        $("input:radio[name=ambito]:checked").val(),
                        $("#chkEstado").is(":checked"));
                    arrayProfesionales.push(unProfecional);
                    agregarFila(unProfecional);
                    console.log(arrayProfesionales);
                    limpiarCampos()
                }
            });
        },
        
        btnLimpiar : function (){
            $("#btnLimpiar").click(function (){
                limpiarCampos();
            });
        }
    };
})();

$(function (){
    App.Parte2.init();
});