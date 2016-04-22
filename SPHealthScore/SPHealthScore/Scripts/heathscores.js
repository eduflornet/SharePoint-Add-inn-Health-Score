'use strict';

// 2.	Añadir la encapsulación de un JavaScript.

var Contoso = window.Contoso || {};

Contoso.HealthScores = function () {

    // 3.	Asignar un comportamiento de botón a los botones.
    $('button').button();

    // 4.	Crear dos variables públicas, una para el título y otra para el intervalo
    var healthScore;
    var pollInterval;

    // 5.	Agregar una función que llame al motor de SharePoint para recibir los datos de monitorización
    var getHealthScore = function () {
        $.ajax({
            type: "HEAD",
            url: "_layouts/15/blank.htm",
            success: function (data, status, xhr) {
                healthScore = xhr.getResponseHeader("X-SharePointHealthScore");
                $('#healthPara').text("Server health score: " + healthScore);
                $('#healthBar').progressbar("option", "value", parseInt(healthScore));
            }
        });
    };

    // 6.	Agregar una función para recopilar los datos
    var startPolling = function () {
        $('#healthBar').progressbar({
            max: 10,
            value: 0
        });
        getHealthScore();
        pollInterval = setInterval(getHealthScore, 5000);
    };

    // 7.	Agregar una función para terminar de recopilar los datos
    var stopPolling = function () {
        clearInterval(pollInterval);
        $('healthPara').text("Click Start Polling to poll the server for health scores.");
        $('#healthBar').progressbar("destroy");
    };


    // 8.	Agregar el retorno
    return {
        StartPolling: startPolling,
        StopPolling: stopPolling
    }

}();















