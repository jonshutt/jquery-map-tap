// jquery closure
(function ( $ ) {
	//alert('x')
	
 	// plugin definition
	$.fn.mapper = function(options) {
		
		var defaults = {
			lat: 57,
			lng: -2,
			zoom: 5,
			type: 'ROADMAP'
		};
		
		var settings = $.extend( {}, defaults, options );		

		var maparea = $(this);


		maparea.html('<div class="mapwrap"><div class="map"></div><div class="overlay"></div><div class="btn btn-default btn-expand">Full Screen <span class="glyphicon glyphicon-fullscreen" aria-hidden="true"></span></div><div class="btn btn-default btn-close">Close <span class="glyphicon glyphicon-remove" aria-hidden="true"></span></div></div>');

		var mapwrap = 	maparea.find('.mapwrap') ;
		var overlay = maparea.find('.overlay') ;
		var map = maparea.find('.map');

		maparea.on('mousedown', '.overlay', {mapwrap:mapwrap}, function(e){


			var mapOffset = maparea.offset().top;
			var mapHeight = maparea.height();
			var windowHeight = $(window).height();

			if (mapHeight > (windowHeight  * .75 )) {
				maparea.height(windowHeight  * .75)
				mapHeight = (windowHeight  * .75);
			}

			var offset;
			offset = mapOffset - ((windowHeight / 2) - (mapHeight / 2));
			var speed = 300;
			$('html body').animate({scrollTop:offset}, speed, function(){

			mapwrap.addClass('active');
			
			setTimeout(function(){

				$(window).on('scroll', {mapwrap:mapwrap}, function(e){
					e.data.mapwrap.removeClass('active');
					$(window).off('scroll');
					console.log('scroll, removing active');
				});


				$(mapwrap).on('touchstart', function(e){ 
					e.stopPropagation();
				});

				$(window).on('touchstart', {mapwrap:mapwrap}, function(e){
					e.data.mapwrap.removeClass('active');
					$(window).off('touchstart');
					console.log('touch, removing active');
				});


	  		}, 100);

		});


	});


	maparea.on('click', '.btn-expand', {mapwrap:mapwrap}, function(e){
		e.preventDefault();
		e.data.mapwrap.addClass('expanded active');
		google.maps.event.trigger(map, "resize");

	})

	maparea.on('click', '.btn-close', {mapwrap:mapwrap}, function(e){
		e.preventDefault();
		e.data.mapwrap.removeClass('expanded active');
		google.maps.event.trigger(map, "resize");

	})

	var mapProp = {
	    center:new google.maps.LatLng(settings.lat,settings.lng),
	    zoom:settings.zoom,
	    mapTypeId:google.maps.MapTypeId[settings.type],
	    draggable: true,
			scrollwheel: true
	};
	
	var map=new google.maps.Map(map[0],mapProp);

		
	};
	
	
 
}( jQuery ));