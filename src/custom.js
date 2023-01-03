// JavaScript Document
	$('.toggle-answers').on('click', function(){
		$(this).next().slideToggle(200);
		$(this).text($(this).text() == 'Click to Hide the Answer(s)' ? 'Click to See the Answer(s)' : 'Click to Hide the Answer(s)');
	});

	$('.toggle-hint').on('click', function(){
		$(this).next().slideToggle(200);
		$(this).text($(this).text() == 'Click to Hide the Hint' ? 'Click to See a Hint' : 'Click to Hide the Hint');
	});
	