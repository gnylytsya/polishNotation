String.prototype.isNumeric = function() {
	return !isNaN(parseFloat(this)) && isFinite(this);
}


function polishNotation () {
	var readedExpressionObject = readExpressionsFromServer();
	console.log(readedExpressionObject);

	var results = [];
	for(var i = 0; i < 	readedExpressionObject.expressions.length; i++) 
	{
		var expressionResult = calculateValue(readedExpressionObject.expressions[i]);
		results.push(expressionResult);				
	}			

	sendExpressionResult(results, readedExpressionObject.id);	
	console.log("response:" + results, readedExpressionObject.id);
}

function readExpressionsFromServer() {
	var responseObject = null;
	jQuery.ajax({
		url: 'https://www.eliftech.com/school-task', 
		success: function (response) {
			responseObject = response;
		},
		async: false
	});

	return responseObject;
}


function calculateValue(postfix){				
	var resultStack = [];
	//postfix = postfix.replace(/\s/g, "");
	postfix = postfix.split(" ");
	for(var i = 0; i < postfix.length; i++){
		if(postfix[i].isNumeric()){
			resultStack.push(postfix[i]);
		}else{
			var a = resultStack.pop();
			var b = resultStack.pop();
			if(postfix[i] === "+") {
				resultStack.push(parseInt(a) + parseInt(b));
			}else if(postfix[i] === "-") {
				resultStack.push(parseInt(b) - parseInt(a));
			}else if(postfix[i] === "*") {
				resultStack.push(parseInt(a) * parseInt(b));
			}else if(postfix[i] === "/") {
				resultStack.push( Math.floor(parseInt(b) / parseInt(a)));
			}
		}
	}

	if(resultStack.length > 1) {
		return "error";
	} else {
		var resultValue = resultStack.pop();
		return resultValue || 0;
	}
}

function sendExpressionResult(results, id) {				
	debugger;
	jQuery.ajax({
		url: 'https://www.eliftech.com/school-task',				
		data: JSON.stringify({ results: results, id: id }),
		type: 'POST',
		contentType: 'application/json',
		success: function(response) {
			console.log(response);				
		}	
	});
}

polishNotation();