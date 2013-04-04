$(document).ready(function(){
	$('#submit').on('click', function(e){
		e.preventDefault();
		// console.log($('input').val());
		$.ajax({
      url: "127.0.0.1:8080",
      type: "POST",
      headers: {
				'Content-Type': 'application/json',
			  "access-control-allow-origin": "*",
			  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
			  "access-control-allow-headers": "content-type, accept",
			  "access-control-max-age": 10 // Seconds.
			},
      // data: $('input').val(),
      data: JSON.stringify({
          'url': $('input').val()
        }),
      success: function(){
          alert("success");
      },
      error:function(){
          alert("failure");
      }
	  })
	})
});