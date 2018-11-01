
'use strict';
angular.module("myApp").controller('indexCtrl', function($scope) {
   	var self = this;
	
	var data = {
		labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
		series: [
			[5, 4, 3, 7, 5, 10, 3, 4, 8, 10, 6, 8],
			[3, 2, 9, 5, 4, 6, 4, 6, 7, 8, 7, 4]
		]
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
		series: [10, 20, 50],
		labels: ['Curso', 'Alimentação', 'Transporte']
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
	 
});

