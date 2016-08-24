/**
 * 
 */

var timeOut;
$(function() {
	var timeOut;
	
	function logSession() {
		if (timeOut == true) {
			$('#log').css('display','none');
			$('#table').css('display','block');
			
			setTimeout(function(){
				timeOut = false;
			}, 3600000);
		} else {
			$('#log').css('display','block');
			$('#table').css('display','none');
		}
	}
	$('html').on('unload', logSession());
	
	
	$('#info').on('submit', function(e) {
		e.preventDefault();
		var logInfo ={
				'username': $('#username').val(), 
				'password': $('#password').val()
		};

		$.ajax({
			url:'passcheck.php',
			method:'POST',
			dataType:'json',
			data: logInfo
		}).then(function(d) {
			var check = $.parseJSON(d);
	        if (check == true) {
				$('#log').css('display','none');
				$('#table').css('display','block');
				
				loadTable();
				
				timeOut = true;
	        } else {
	        	$('#error').css('display', 'block');
	        }
			
		}, function(data) {
			console.log('Request fail!')
		})
	})
	
	
	
	$('#add-btn').on('click', function() {
		$('#table').css('display','none');
		$('#new').css('display','block');
		
		var tr = $('tr');
		var number = tr.length;
		
		$('#number').val(number);
	})
	
	
	
	var table;
	
	function loadTable() {
		$.ajax({
			url:'table.php',
			method:'GET',
			dataType:'json',
		}).then(function(result) {
			table = $.parseJSON(JSON.stringify(result));
			
			createTable();
			
		}, function(data) {
			console.log('Request load fail!')
		})
	}
	
	
	
	$('#row').on('submit', function(e) {
		e.preventDefault();
		var rowInfo ={
				'number': $('#number').val(), 
				'name': $('#name').val(),
				'quantity': $('#quantity').val(),
				'price': $('#price').val()
		};

		$.ajax({
			url:'table.php',
			method:'POST',
			dataType:'json',
			data: rowInfo
		}).then(function(result) {
			table = $.parseJSON(JSON.stringify(result));
			
			$('#table').css('display','block');
			$('#new').css('display','none');
			
			$('#name').val('');
			$('#quantity').val('');
			$('#price').val('');
			
			createTable();
			
		}, function(data) {
			console.log('Request add row fail!')
		})
	})
	
	
	
	function createTable() {
		$('tbody').html('');
		for(var i = 0; i < table.length ; i++) {
			var row = $("<tr></tr>");
			
			var numberCell = $("<td></td>").html(i + 1);
			row.append(numberCell);
			
			var nameCell = $("<td></td>").html(table[i].name);
			row.append(nameCell);
			
			var quantityCell = $("<td></td>").html(table[i].quantity);
			row.append(quantityCell);
			
			var priceCell = $("<td></td>").html(table[i].price);
			row.append(priceCell);
			
			var iconsCell = $("<td></td>").html('<span class=\"fa fa-pencil\"></span><span class=\"fa fa-trash-o\"></span>');
			row.append(iconsCell);
			
			$('tbody').append(row);	
		}
		
		$('.fa-pencil').on('click', function(t) {
			editRow(t);
		})
		
		$('.fa-trash-o').on('click', function(t) {
			deleteRow(t);
		})
	}
	
	
	
	function editRow(t) {
		var number = $(t.target).parent().siblings().first().html();
		$('#number').val(number);
		
		var name = $(t.target).parent().siblings().first().next().html();
		$('#name').val(name);
		
		var quantity = $(t.target).parent().siblings().first().next().next().html();
		$('#quantity').val(quantity);
		
		var price = $(t.target).parent().siblings().first().next().next().next().html();
		$('#price').val(price);
		
		$('#new').css('display','block');
		$('#table').css('display','none');
	}
	
	
	
	function deleteRow(t) {
		var number = $(t.target).parent().siblings().first().html();
		
		var delInfo ={
				'number': number, 
				'delete': true,
		};
		
		$.ajax({
			url:'table.php',
			method:'POST',
			dataType:'json',
			data: delInfo
		}).then(function(result) {
			table = $.parseJSON(JSON.stringify(result));
						
			createTable();
			
		}, function(data) {
			console.log('Request delete fail!')
		})
	}
})