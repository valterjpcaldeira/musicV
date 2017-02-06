function loadTabTop(){

WeDeploy.data('http://data.musicv.wedeploy.io')
  .orderBy('likes', 'desc')
  .limit(10)
  .get('youtubeLinks')
	.then(function(response) {
		appendTop(response);
	})
	.catch(function(error) {
		console.log(error);
	});

}



function appendTop(tasks) {
	var list = document.querySelector('.listTop');
	var taskList = '<div class="mdl-grid portfolio-max-width">';

	tasks.forEach(function(task) {
		var videoCode = task.url;

		var descp = task.description;
		if(descp){
        	descp += descp.substring(0, 34)
    	} 

    	var title =  task.title;  
    	if(title){
        	title += title.substring(0, 34)
    	} 

		taskList +=  '<div class="mdl-cell mdl-card mdl-shadow--4dp portfolio-card">'+
					'<div class="mdl-card__media">'+
					'<div class="mdl-grid">'+
                    	'<div class="mdl-cell mdl-cell--6-col"> <img class="article-image" src="'+task.urlThumbnill+'" border="0" alt=""></div>'+
                    	'<div class="mdl-cell mdl-cell--6-col"><h4 class="mdl-card__title-text">Played at:</h4><h5 class="mdl-card__title-text">'+task.playedDate+'</h5></div>'+
                    	'</div>'+
                    '</div>'+
                    '<div class="mdl-card__title">'+
                        '<h2 class="mdl-card__title-text">'+title+'</h2>'+
                    '</div>'+
                    '<div class="mdl-card__supporting-text">'+
                        descp+
                    '</div>'+
                    '<div class="mdl-card__actions mdl-card--border">'+
					    '<div class="mdl-grid">'+
                    		'<div class="mdl-cell mdl-cell--10-col">'+
                    			'<a href="https://www.youtube.com/watch?v='+task.url+'" target="_blank" class="mdl-button mdl-button--colored mdl-js-button mdl-js-ripple-effect">'+
							      'Open in Youtube'+
							    '</a>'+
                    		'</div>'+
                    		'<div class="mdl-cell mdl-cell--2-col">'+
                    			'<div class="mdl-badge mdl-badge--overlap" data-badge="'+task.likes+'" style="width: 40px;">'+
							    	'<img style="width: 38px;cursor:pointer;" src="http://musicv.wedeploy.io/like.png" border="0" alt="">'+
							    '</div>'+
                    		'</div>'+
                    	'</div>'+
					  '</div>'+
                '</div>';

	});

	list.innerHTML = taskList+'</div>';
}

