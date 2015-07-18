$(document).ready(function(){
	$('select[name=tableSelect]').bind('change',function(){
		$.get('/index.php?table='+$(this).val(),{},function(data){
			eval("var values ="+data);
			$('#tableContent').html(values.html);
			eval(values.js);
		});
	})
})