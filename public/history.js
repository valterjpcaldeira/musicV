function loadTabHis(){

WeDeploy.data('http://data.musicv.wedeploy.io')
  .where('state', '=', 0)
  .orderBy('id', 'desc')
  .limit(15)
  .get('youtubeLinks')
	.then(function(response) {
		appendHis(response);
	})
	.catch(function(error) {
		console.log(error);
	});

	WeDeploy.data('http://data.musicv.wedeploy.io')
  .where('state', '=', 0)
  .orderBy('id', 'desc')
  .offset(50)
  .get('youtubeLinks')
	.then(function(response) {
		deleteHis(response);
	})
	.catch(function(error) {
		console.log(error);
	});

}



function appendHis(tasks) {
	var list = document.querySelector('.listHistory');
	var taskList = '<div class="mdl-grid portfolio-max-width">';

	tasks.forEach(function(task) {
		var videoCode = task.url;

		var descp = task.description;
		while(descp.length < 80){
        	descp += '&nbsp;';
    	}    


		taskList +=  '<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">'+
					'<div class="mdl-card__media">'+
					'<div class="mdl-grid">'+
                    	'<div class="mdl-cell mdl-cell--6-col"> <img class="article-image" src="'+task.urlThumbnill+'" border="0" alt=""></div>'+
                    	'<div class="mdl-cell mdl-cell--6-col"><h4 class="mdl-card__title-text">Played at:</h4><h5 class="mdl-card__title-text">'+task.playedDate+'</h5></div>'+
                    	'</div>'+
                    '</div>'+
                    '<div class="mdl-card__title">'+
                        '<h2 class="mdl-card__title-text">'+task.title.substring(0, 34)+'</h2>'+
                    '</div>'+
                    '<div class="mdl-card__supporting-text">'+
                        descp.substring(0, 34)+
                    '</div>'+
                    '<div class="mdl-card__actions mdl-card--border">'+
					    '<a href="https://www.youtube.com/watch?v='+task.url+'" target="_blank" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">'+
					      'Open in Youtube'+
					    '</a>'+
					    '<a onclick="addThis(this)" description="'+descp+'" title="'+task.title+'" urlThumbnill="'+task.urlThumbnill+'" value='+task.url+' class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">'+
					      'Adicionar Música'+
					    '</a>'+
					  '</div>'+
                '</div>';

	});

	list.innerHTML = taskList+'</div>';
}

function deleteHis(tasks) {
	var data = WeDeploy.data('http://data.musicv.wedeploy.io');
	tasks.forEach(function(task) {
		 data.delete('youtubeLinks/'+task.id);
	});
}

