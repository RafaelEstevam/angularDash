
'use strict';
angular.module("myApp").controller('movementsCtrl', function($scope) {
	var self = this;

	self.listaMovimentos = [
		{id: 1, nome: "Freelancer - Criação de Website", preco: "1200.00", status: "Receita", data: "10/06/2018"},
		{id: 2, nome: "Manutenção - Veículo", preco: "500.00", status: "Despesa", data: "20/07/2018"},
		{id: 3, nome: "Curso - Computação gráfica", preco: "300.00", status: "Despesa", data: "25/01/2018"}
	]

});

