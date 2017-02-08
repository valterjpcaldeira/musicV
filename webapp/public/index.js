var form = document.querySelector('form');
var list = document.querySelector('.list');

form.addEventListener('submit', function(e) { 
  e.preventDefault(); 
  	list.innerHTML = "";

	startLoading();

	var url = $("#url").val();

	$.getJSON( "/search/"+url, function( data ) {
	  var items = [];
	  var taskList = '<ul>';
	  $.each( data.items, function( key, val ) {
	  	if(val.id.videoId){
	  		taskList += '<div class="mdl-list__item">'+
			    '<span class="mdl-list__item-primary-content">'+
			     ' <i><img class="alignnone size-full wp-image-156" style="width:69px;margin-right:10px;" src="'+val.snippet.thumbnails.default.url+'" ></img>'+
			     '</i>'+
			      '<h6>'+val.snippet.title+'</h6>'+
			    '</span>'+
			    '<button value='+val.id.videoId+' urlThumbnill="'+val.snippet.thumbnails.default.url+'" title="'+val.snippet.title+'" description="'+val.snippet.description+'" onclick="addThis(this)" class="mdl-button mdl-js-button mdl-button--fab mdl-js-ripple-effect mdl-button--colored">'+
  					'<i class="material-icons">add</i>'+
				'</button>'+
			  '</div>';
			}
	  	
	  });
	 
	  list.innerHTML = taskList+'</ul>';
	  stopLoading();
	});

}); 

function addThis(elm){
	list.innerHTML = "";
	startLoading();
	WeDeploy.data('http://data.musicv.wedeploy.io')
    .create('youtubeLinks', {url: $(elm).attr('value'),
							 urlThumbnill: $(elm).attr('urlThumbnill'),
							 description: $(elm).attr('description'),
							 state: 1,
							 likes: 0,
							 title: $(elm).attr('title')})
		.then(function(response) {
			stopLoading();
		  	var snackbarContainer = document.querySelector('#demo-toast-example');
		    'use strict';
		    $("#url").val("");
		    var data = {message: 'Música Adicionada Com Sucesso' };
		    snackbarContainer.MaterialSnackbar.showSnackbar(data);
		})
		.catch(function(error) {
			console.log(error);
			stopLoading();
		});
}

function startLoading(){
	$("#spinner").addClass("is-active");
	$("#spinner").show();
}

function stopLoading(){
	$("#spinner").removeClass("is-active");
	$("#spinner").hide();
}