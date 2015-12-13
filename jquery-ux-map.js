
// jquery closure
(function ( $ ) {
	//alert('x')
	
 	// plugin definition
	$.fn.mapper = function(options) {
		
		var defaults = {
			
		};
		
		var settings = $.extend( {}, defaults, options );
		

	

		var map = $(this);

		//map.addClass('xxx');
		//map.attr('id', 'map1');

		map.wrap('<div class="mapwrap">');

		var wrap = map.closest('.mapwrap');

		map.after('<div class="overlay">');


		wrap.on('mousedown', '.overlay', {wrap:wrap}, function(e){
			e.data.wrap.addClass('active');
			//console.log(e);
		});

		wrap.on('mouseout', {wrap:wrap}, function(e){
			//e.data.wrap.removeClass('active');
			//console.log(e);
		});


		/*wrap.on('mousewheel', {wrap:wrap}, function(e){
			e.data.wrap.addClass('active');
			//console.log(e);
		});
*/



		$(window).on('scroll', {wrap:wrap}, function(e){
			//e.data.wrap.removeClass('active');
			//console.log(e);
		});


		var mapProp = {
		    center:new google.maps.LatLng(51.508742,-0.120850),
		    zoom:5,
		    mapTypeId:google.maps.MapTypeId.ROADMAP,
		    draggable: true,
  			scrollwheel: true
		  };

		 // console.log(map[0])
		 // console.log(document.getElementById("map1"));
		  var map=new google.maps.Map(map[0],mapProp);

		
	};
	
	
 
}( jQuery ));