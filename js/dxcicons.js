//variables
var imagesPath = "../assets/img/weather/";//path to the images
var delayBetweenIcons = .1;//stagger the animation of each iccon (in seconds)
var useRollover = true;//have an animation on rollover
var hoverScale = 1.05;//how much does the icon grow on rollover
var speed = 1;//speed up or slow down the animations (1 being normal speed)
var playOnStart = true;//play animations on page load

//if you want to give your icons links, add them in order in this array.
var iconLinks = [];
//var iconLinks = ["http://aprendagames.com",,,"http://aprendagames.com"];//In this example, only the first and fourth have a link.

//--------------------------NO NEED TO EDIT BELOW THIS LING--------------------------//
var tls = [];//array to hold each of the animations
var tlsIdle = [];
var tlsRollover = [];
var tlsReverse = [];
var tlsActive = [];
var iconNames = [];
var iconStyles = [];
var thisIcons = [];
var allIconsF = [];

//on page load
window.addEventListener('load', function(){

	//replace each browsericon div

	// var elems = document.getElementsByClassName("seoicon");
	// for (var index = 0; index < elems.length; index++) {
	// 	var elem = elems[index];
	// 	var thisS = Snap(elem);

	// 	for (var i = 0; i < iconNames.length; i++) {

	// 		tlsActive[i] = false;
	// 		if(elem.classList.contains(iconNames[i])){
	// 			//console.log("x" + i)
	// 			var toLoad = iconNames[i];
	// 			Snap.load(imagesPath + toLoad + ".svg", function(f){
	// 				var appended = thisS.append(f);
	// 				determineIcon(index, toLoad, appended, elem);
	// 				console.log(index + " " + toLoad + " " + appended + " " + elem)
	// 			});
	// 		}
	// 	}
	// }

	$(".weathericon").each(function(index, elem){

		//var elem = elems[index];
		var thisS = Snap(elem);
		//determine which svg to load
		for (var i = 0; i < iconNames.length; i++) {
			//console.log("b")
			tlsActive[i] = false;
			if(elem.classList.contains(iconNames[i])){
				var toLoad = iconNames[i];
				Snap.load(imagesPath + toLoad + ".svg", function(f){
					var appended = thisS.append(f);
					determineIcon(index, toLoad, appended, elem);
				});
			};
		};
	});
});
function makeVisible(appended, vis)
{
	appended.attr({visibility:vis});//this is because stupic safari shows them for exactly 1 frame
}


var currentWaypoints = 0;
function playWhenVisible(iconNum)
{

	currentWaypoints++;
	//console.log(iconNum)
	setTimeout(function(){

		tls[iconNum].play();
		currentWaypoints = 0;

	},delayBetweenIcons*1000*currentWaypoints)
}

//determine which icon is being loaded
function determineIcon(index, toLoad, f, elem)
{




	allIconsF[index] = f;
	setTimeout(function(){
		var thisIcon = f.select("#" + toLoad).node;
		thisIcons[index] = thisIcon;
		iconStyles[index] = thisIcon.style;
		//play the icon-specific animation
		window[toLoad](index, f, thisIcon);
		//stop them if they're not supposed to play right now
		//if(!playOnStart)
			tls[index].stop();
		tlsRollover[index].stop();
		//if there are rollovers, add them to each icon
		if(useRollover && iconLinks[index]){

			thisIcon.addEventListener( 'click', function() {
				if(tlsActive[index]){
					window.location.href = iconLinks[index];
				}
			})

			iconStyles[index].cursor = "pointer";

			thisIcon.addEventListener( 'mouseenter', function() {
				if(tlsActive[index]){
					TweenLite.to(thisIcon, .5, {scale:hoverScale, transformOrigin:"50% 50%", ease:Elastic.easeOut});
					if(tlsRollover[index])
						tlsRollover[index].restart();
				}
			});
			thisIcon.addEventListener( 'mouseleave', function() {
				if(tlsActive[index]){
					TweenLite.to(thisIcon, .5, {scale:1, transformOrigin:"50% 50%", ease:Elastic.easeOut});
					if(tlsRollover[index])
						tlsRollover[index].restart();
				}
			});
		}

		setTimeout(function(){
			makeVisible(f, "visible");
		}, 30);

		var waypoint = new Waypoint({
		  element: elem,
		  handler: function(direction) {
		   	var thisWaypoint = parseInt(this.key.replace("waypoint-", ""));
		   	//console.log(thisWaypoint)
		   	//restartIcons([i])
		   	playWhenVisible(thisWaypoint);
		  },
		  offset: '90%'
		})

	},delayBetweenIcons*1000*index)
}
//animation is complete
function animationComplete(index, isActive)
{

	tlsActive[index] = isActive;
	if(isActive){
		if(tlsIdle[index])
			tlsIdle[index].play();
	}else{
		if(tlsIdle[index])
			tlsIdle[index].pause();
	}
}
//start the icons over
function restartIcons(iconToRestart)
{
	for (var j = 0; j < iconToRestart.length; j++) {
		makeVisible(allIconsF[iconToRestart[j]], "hidden");
		resetLines(iconToRestart[j]);
	};
	//if(linesToReset[iconToRestart].length > 0)

	(function myLoop(i){
		setTimeout(function(){
			makeVisible(allIconsF[iconToRestart[iconToRestart.length - i]], "visible");
			tls[iconToRestart[iconToRestart.length - i]].restart();
			if (--i) myLoop(i);
		},delayBetweenIcons*1000)
	})(iconToRestart.length);
}
