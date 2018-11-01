
'use strict';
angular.module("myApp").controller('indexCtrl', function($scope) {
	var self = this;
	
	var meses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
	var valores = [[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8], [3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]]
	
	var gastos = [ 12, 30, 50]
	var legenda = ['Curso', 'Alimentação', 'Transporte']

	//Default Data
	self.selectOption = 'Mês'

	self.receita = 5.23
	self.receitaTotal = 1000.00
	self.despesa = 12.8
	self.despesaTotal = 800.00
	self.receber = 10.5
	self.receberTotal = 2200.00
	self.gastos = 8.3
	self.gastosTotal = 600.00

	self.listaDesejos = [
		{nome: "Fone de ouvido Cougar", preco: "200.00", status: "Dentro do orçamento"},
		{nome: "Notebook Dell", preco: "2500.00", status: "Fora do orçamento"},
		{nome: "Corsa Hatch 2011", preco: "17200.00", status: "Fora do orçamento"}
	]

	self.createCharts = function(){
		
		var data = {
			labels: meses,
			series: valores
		};
	
		var options = {
			seriesBarDistance: 10,
			height: '200px'
		};
		
		var responsiveOptions = [
			['screen and (max-width: 640px)', {
				seriesBarDistance: 5,
				axisX: {
				labelInterpolationFnc: function (value) {
					return value[0];
				}
				}
			}]
		];
	
		new Chartist.Bar('.ct-chart', data, options, responsiveOptions);

		var chart = new Chartist.Pie('.ct-chart-pie', {
			series: gastos,
			labels: legenda
			}, {
			donut: false,
			showLabel: true
		});
	  
		chart.on('draw', function(data) {
			if(data.type === 'slice') {
				var pathLength = data.element._node.getTotalLength();
				data.element.attr({
				'stroke-dasharray': pathLength + 'px ' + pathLength + 'px'
				});
				var animationDefinition = {
				'stroke-dashoffset': {
					id: 'anim' + data.index,
					dur: 1000,
					from: -pathLength + 'px',
					to:  '0px',
					easing: Chartist.Svg.Easing.easeOutQuint,
					fill: 'freeze'
				}
				};
				if(data.index !== 0) {
				animationDefinition['stroke-dashoffset'].begin = 'anim' + (data.index - 1) + '.end';
				}
			
				data.element.attr({
				'stroke-dashoffset': -pathLength + 'px'
				});
			
				data.element.animate(animationDefinition, false);
			}
		});
	 
	}

	self.createCharts();

});

