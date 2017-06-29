var player;
var currentId;
var currentVideoId;
var currentLikes;
var currentImage;
var currentTitle;
var currentDesc;
var currentBy;
var array = [];

function loadTabMusic(){

	if(!player){
		WeDeploy.data('http://data.musicv.wedeploy.io')
		.where('state', '=', 1)
	  .orderBy('id', 'asc')
	  .limit(1)
	  .get('youtubeLinks')
		.then(function(response) {
			appendVideo(response);
		})
		.catch(function(error) {
			console.error(error);
		});



    	
	}



}
/*
WeDeploy
	.data('http://data.boilerplate-data.wedeploy.io')
	.limit(5)
	.orderBy('id', 'desc')
	.watch('tasks')
	.on('changes', function(tasks) {
		appendTasks(tasks);
	});
	*/

	//player.loadVideoById(videoId);

	function next(tasks){

		console.log("tasks:");
		console.log(tasks);
		if(tasks.length === 0){
			WeDeploy.data('http://data.musicv.wedeploy.io')
				  .orderBy('likes', 'desc')
				  .limit(8)
				  .get('youtubeLinks')
					.then(function(response) {
						playRandom(response);
					});
		}

	tasks.forEach(function(task) {
		currentVideoId = task.url;
		 currentLikes= task.likes;
		 currentImage = task.urlThumbnill;
		 currentTitle = task.title;
		 currentDesc = task.description;
		var videoCode = task.url;
		currentId = task.id;
		currentBy = task.by;

		$(".likeMusic").parent().attr("data-badge", currentLikes);
		$(".likeMusic").attr("playedDate", task.playedDate);
		$(".likeMusic").attr("id", currentId);
		$(".likeMusic").attr("description", currentDesc);
		$(".likeMusic").attr("title", currentTitle);
		$(".likeMusic").attr("urlThumbnill", currentImage);
		$(".likeMusic").attr("likes", currentLikes);
		$(".likeMusic").attr("by", currentBy);


		player.loadVideoById(videoCode);
	});

	}


function appendVideo(tasks) {


		if(tasks.length === 0){
			WeDeploy.data('http://data.musicv.wedeploy.io')
				  .orderBy('likes', 'desc')
				  .limit(8)
				  .get('youtubeLinks')
					.then(function(response) {
						player = new YT.Player('player', {
				          height: '390',
				          width: '640',
				          videoId: videoCode,
				          controls: 0,
				          disablekb: 1,
				          events: {
				            'onReady': onPlayerReady,
				            'onStateChange': onPlayerStateChange,
				            'onError': onError
				          }
				        });
						playRandom(response);
					});
		}

	tasks.forEach(function(task) {
		 currentVideoId = task.url;
		 currentLikes= task.likes;
		 currentImage = task.urlThumbnill;
		 currentTitle = task.title;
		 currentDesc = task.description;
		var videoCode = task.url;
		currentId = task.id;
		currentBy = task.by;


		$(".likeMusic").parent().attr("data-badge", currentLikes);
		$(".likeMusic").attr("playedDate", task.playedDate);
		$(".likeMusic").attr("id", currentId);
		$(".likeMusic").attr("description", currentDesc);
		$(".likeMusic").attr("title", currentTitle);
		$(".likeMusic").attr("urlThumbnill", currentImage);
		$(".likeMusic").attr("likes", currentLikes);
		$(".likeMusic").attr("by", currentBy);

		player = new YT.Player('player', {
          height: '390',
          width: '640',
          videoId: videoCode,
          controls: 0,
          disablekb: 1,
          events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange,
            'onError': onError
          }
        });
	});

}

// autoplay video
    function onError(event) {
        var data = WeDeploy.data('http://data.musicv.wedeploy.io');
            data.delete('youtubeLinks/'+currentId);

            playNext();
    }

    // autoplay video
    function onPlayerReady(event) {
        event.target.playVideo();
    }

    // when video ends
    function onPlayerStateChange(event) {        
        if(event.data === 0) {            
            var data = WeDeploy.data('http://data.musicv.wedeploy.io');
            var today = new Date();
			var hr = today.getHours();
			var min = today.getMinutes();


            data.update('youtubeLinks/'+currentId, {url: currentVideoId,
							 urlThumbnill: currentImage,
							 description: currentDesc,
							 state: 0,
							 likes: currentLikes,
							 by: currentBy,
							 playedDate: hr+':'+min,
							 title: currentTitle}).then(function(movie) {
			  playNext();
			});    
        }
    }

    function playNext(){
    	WeDeploy.data('http://data.musicv.wedeploy.io')
    			.where('state', '=', 1)
				  .orderBy('id', 'asc')
				  .limit(1)
				  .get('youtubeLinks')
					.then(function(response) {
						console.log(response);
						next(response);
					})
					.catch(function(error) {
					});
    }

    function playRandom(tasks){
    	var ra = Math.floor((Math.random() * tasks.length));
    	console.log(ra);
    	console.log(tasks);
    	var task = tasks[ra];
    	console.log(task);
    	currentVideoId = task.url;
		 currentLikes= task.likes;
		 currentImage = task.urlThumbnill;
		 currentTitle = task.title;
		 currentDesc = task.description;
		var videoCode = task.url;
		currentId = task.id;
		currentBy = task.by;

		$(".likeMusic").parent().attr("data-badge", currentLikes);
		$(".likeMusic").attr("playedDate", task.playedDate);
		$(".likeMusic").attr("id", currentId);
		$(".likeMusic").attr("description", currentDesc);
		$(".likeMusic").attr("title", currentTitle);
		$(".likeMusic").attr("urlThumbnill", currentImage);
		$(".likeMusic").attr("likes", currentLikes);
		$(".likeMusic").attr("by", currentBy);


		player.loadVideoById(videoCode);
    }

    function pauseMusic(){
    	player.pauseVideo();
    }

    function playMusic(){
    	player.playVideo();
    }

