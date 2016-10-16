var socialMediaIconNames = [
	"clearNightIcon",
	"lightningIcon",
	"mostlyCloudyIcon",
	"partlyCloudyIcon",
	"partlyCloudyNightIcon",
	"rainyIcon",
	"showersIcon",
	"snowShowersIcon",
	"snowyIcon",
	"sunnyIcon",
	"sunnyShowersIcon",
	"thermometerColdIcon",
	"thermometerHotIcon",
	"thundershowersIcon",
	"windyIcon", 
	"windySunnyIcon"
];
//var socialMediaIconNames = ["chrome"];
iconNames = iconNames.concat(socialMediaIconNames);
var easeVar = Quad;
var linesToReset = [];
//animate each of the icons

window['clearNightIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#moon").node, 1, {scale:0,transformOrigin:"50% 50%", ease:Elastic.easeOut})
		.timeScale(speed);

	animateStars(f, 6, tl, .4);



	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}

window['lightningIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#cloud0").node, .3, {alpha:0})
		.from(f.select("#cloud1").node, .3, {alpha:0}, "-=.1")
		.from(f.select("#cloud2").node, .3, {alpha:0}, "-=.2")
		.from(f.select("#lightning").node, .3, {scale:0,transformOrigin:"50% 0%", ease:Bounce.easeOut, repeat:-1, repeatDelay:3}, "-=.2")
		.timeScale(speed);

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['partlyCloudyIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#outer").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut})
		.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#inner").node, .5, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#cloud").node, .3, {alpha:0}, "-=.3")
		.timeScale(speed);
	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;

	var tlIdle = new TimelineLite()
	 	.to(f.select("#outerRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true})
	 	.to(f.select("#middleRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true}, "2");
	 tlIdle.pause();
	// 	.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")};

	
	tlsIdle[index] = tlIdle;
}


window['partlyCloudyNightIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#moon").node, 1, {scale:0,transformOrigin:"50% 50%", ease:Elastic.easeOut})
		.from(f.select("#cloud").node, .3, {alpha:0}, "-=.5")
		.timeScale(speed);

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['rainyIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#cloud1").node, .3, {alpha:0})
		.from(f.select("#cloud2").node, .3, {alpha:0}, "-=.1")
		.from(f.select("#dashedLines").node, 1, {alpha:0, transformOrigin:"top"}, "-=.1")
		.timeScale(speed);

	animateDash(tl, f.select("#dashedLines"), .5, 12, 4, "line")

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['mostlyCloudyIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#outer").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut})
		.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#inner").node, .5, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#cloudRight").node, .3, {alpha:0}, "-=.3")
		.from(f.select("#cloudLeft").node, .3, {alpha:0}, "-=.0")
		.timeScale(speed);
	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;

	var tlIdle = new TimelineLite()
	 	.to(f.select("#outerRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true})
	 	.to(f.select("#middleRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true}, "2");
	 tlIdle.pause();
	// 	.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")};

	
	tlsIdle[index] = tlIdle;
}


window['showersIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#cloud0").node, .3, {alpha:0})
		.from(f.select("#cloud1").node, .3, {alpha:0}, "-=.1")
		.from(f.select("#cloud2").node, .3, {alpha:0}, "-=.2")
		.from(f.select("#rain").node, .3, {alpha:0}, "-=.2")
		.timeScale(speed);

	animateRain(f.select("#rain"), -4, 15, 0, .5);

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['snowShowersIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#cloud").node, .3, {alpha:0})
		.from(f.select("#rain").node, .3, {alpha:0}, "-=.1")
		.timeScale(speed);

	animateRain(f.select("#rain"), 0, 15, 30, 2);

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['snowyIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#cloud0").node, .3, {alpha:0})
		.from(f.select("#cloud1").node, .3, {alpha:0}, "-=.1")
		.from(f.select("#rain").node, .3, {alpha:0}, "-=.1")
		.timeScale(speed);
	animateRain(f.select("#rain"), 0, 15, 30, 2);

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['sunnyIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#outer").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut})
		.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#inner").node, .5, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.timeScale(speed);
	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;

	var tlIdle = new TimelineLite()
	 	.to(f.select("#outerRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true})
	 	.to(f.select("#middleRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true}, "2");
	 tlIdle.pause();
	// 	.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")};

	
	tlsIdle[index] = tlIdle;
}


window['sunnyShowersIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#outer").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut})
		.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#inner").node, .5, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#cloud").node, .3, {alpha:0})
		.from(f.select("#rain").node, .3, {alpha:0}, "-=.2")
		.timeScale(speed);
	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;

	var tlIdle = new TimelineLite()
	 	.to(f.select("#outerRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true})
	 	.to(f.select("#middleRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true}, "2");
	 tlIdle.pause();
	// 	.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")};
	animateRain(f.select("#rain"), -4, 15, 0, .5);

	
	tlsIdle[index] = tlIdle;
}


window['thermometerColdIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#thermometer").node, .5, {alpha:0})
		.to(f.select("#mercury").node, 2, {scaleY:.4,transformOrigin:"bottom", ease:Quad.easeOut}, "-=.2")
		.to("#snowflake", 12, {rotation:360, repeat:-1, ease:Linear.easeNone, transformOrigin:"50% 50%"}, 0)
		.timeScale(speed);

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['thermometerHotIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#outer").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut})
		.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#inner").node, .5, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#thermometer").node, .5, {alpha:0}, "-=.2")
		.from(f.select("#mercury").node, 2, {scaleY:.1,transformOrigin:"bottom", ease:Quad.easeOut}, "-=.2")
		.timeScale(speed);
	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;

	var tlIdle = new TimelineLite()
	 	.to(f.select("#outerRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true})
	 	.to(f.select("#middleRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true}, "2");
	 tlIdle.pause();
	// 	.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")};

	
	tlsIdle[index] = tlIdle;
}


window['thundershowersIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#cloud0").node, .3, {alpha:0})
		.from(f.select("#cloud1").node, .3, {alpha:0}, "-=.1")
		.from(f.select("#cloud2").node, .3, {alpha:0}, "-=.2")
		.from(f.select("#rain").node, .3, {alpha:0}, "-=.2")
		.from(f.select("#lightning").node, .3, {scale:0,transformOrigin:"50% 0%", ease:Bounce.easeOut, repeat:-1, repeatDelay:3}, "-=.2")
		.timeScale(speed);

	animateRain(f.select("#rain"), -4, 15, 0, .5);

	

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}


window['windyIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#cloud0").node, .3, {alpha:0})
		.from(f.select("#cloud1").node, .3, {alpha:0}, "-=.1")
		.from(f.select("#dashedLines").node, .3, {alpha:0}, "-=.1")
		.timeScale(speed);

	animateDash(tl, f.select("#dashedLines"), 1, 20, 4, "path")

	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;
}

window['windySunnyIcon'] = function(index, f, thisIcon)
{
	var tl = new TimelineLite({onStart:animationComplete, onStartParams:[index, true], onReverseComplete:animationComplete, onReverseCompleteParams:[index, false]})
		.from(f.select("#outer").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut})
		.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.from(f.select("#inner").node, .5, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")
		.timeScale(speed);
	tls[index] = tl;
	var tlRollover = new TimelineLite();
	tlsRollover[index] = tlRollover;

	animateWind(tl, f.select("#wind"), 2, .1, .3, "line")

	var tlIdle = new TimelineLite()
	 	.to(f.select("#outerRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true})
	 	.to(f.select("#middleRepeat").node, 5, {scale:.8,transformOrigin:"50% 50%", ease:Circ.easeOut, repeat:-1, ease:Quad.easeInOut, yoyo:true}, "2");
	 tlIdle.pause();
	// 	.from(f.select("#middle").node, .3, {scale:0,transformOrigin:"50% 50%", ease:Circ.easeOut}, "-=.2")};

	
	tlsIdle[index] = tlIdle;
}

function animateStars(f, starCount, thisTl, startingTime)
{
	var timeBetween = .2;
	for (var i = 1; i < starCount + 1; i++) {
		thisTl.from(f.select("#star" + i).node, 1.5, {alpha:0, repeatDelay:1, repeat:-1, ease:Linear.easeNone, yoyo:true}, startingTime + timeBetween * i)
	};
	
}

function animateRain(rainElem, posX, posY, rotation, speed)
{

	var rainTl = new TimelineLite();
	var rains = rainElem.selectAll("path");
	for (var i = 0; i < rains.length; i++) {
		rainTl.to(rains[i].node, speed + (i*speed*.1), {rotation:rotation +rotation*i, y:posY, x:posX, alpha:0, repeatDelay:.1, repeat:-1, ease:Linear.easeNone}, i * .2);
	};

}

function animateWind(thisTL, windElem, speed, stagger, repeatDelay, type)
{
	//var rainTl = new TimelineLite();
	var winds = windElem.selectAll(type);
	for (var i = 0; i < winds.length; i++) {

		thisTL.from(winds[i].node, speed, {scaleX:.0, ease:Linear.easeNone, repeat:-1, repeatDelay:.1, alpha:0, yoyo:true}, i*stagger)
	};
	
}

function animateDash(tl, dashedGroup, speed, dash, gap, type)
{
	var dashedLines = dashedGroup.selectAll(type);
	for (var i = 0; i < dashedLines.length; i++) {
		
		dashedLines[i].attr({
			strokeDasharray:dash + " " + gap,
			strokeDashoffset:0
		})
		//tl.to(dashedLines[i].node, speed, {strokeDashoffset:12, ease:Linear.easeNone, repeat:-1, repeatDelay:.1, alpha:0, yoyo:true}, i*stagger)

		var fakeTweenObj = {currentLength:0};
		var pathLength = 0;

		tl.to(fakeTweenObj, speed, {
			currentLength:-dash -gap, 
			onUpdate:drawTheLine, onUpdateParams:[fakeTweenObj, dashedLines[i]], 
			repeat:-1,
			ease:Linear.easeNone
		}, i*.1);

	};
}

// function animateLines(f, pathCount, thisTl, startingTime, animationTime, timeBetween, index)
// {

// 	var thisLinesToReset = [];
// 	for (var i = 0; i < pathCount; i++) {
		


// 		var fakeTweenObj = {currentLength:0};
// 		var thisPath = f.select("#path" + i);
// 		var pathLength = Snap.path.getTotalLength(thisPath);
// 		thisLinesToReset.push(thisPath);

// 		thisPath.attr({
// 			strokeDasharray:pathLength + " " + pathLength,
// 			strokeDashoffset:pathLength
// 		});
// 		thisTl.from(fakeTweenObj, animationTime, {ease:Quad.easeInOut, 
// 			currentLength:pathLength, 
// 			onUpdate:drawTheLine, onUpdateParams:[fakeTweenObj, thisPath]
// 		}, timeBetween * i);
// 		//thisTl.from(f.select("#star" + i).node, 1.5, {alpha:0, repeatDelay:1, repeat:-1, ease:Linear.easeNone, yoyo:true}, startingTime + timeBetween * i)

		
// 	};


// 	linesToReset[index] = thisLinesToReset;
	
// }

function resetLines(thisIcon)
{
	
	if(linesToReset[thisIcon]){
		
	
		for (var i = 0; i < linesToReset[thisIcon].length; i++) {
			var thisPath = linesToReset[thisIcon][i];
			var pathLength = Snap.path.getTotalLength(thisPath);
			thisPath.attr({
				strokeDasharray:pathLength + " " + pathLength,
				strokeDashoffset:pathLength
			});
		}
	}	
}

//this actually moves the lines during the tween above
function drawTheLine(fakeTweenObj, thisPath)
{	
	thisPath.attr({
		strokeDashoffset:fakeTweenObj.currentLength
	});
}





