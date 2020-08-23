( function (global) {

	// console.log("In ajaxUtil");
	
	var ajaxUtil = {};
	
	// console.log("Declared ajaxUtil");

	function getRequestObject(){
		if(global.XMLHttpRequest){
			return (new XMLHttpRequest());
		}
		else if(global.ActiveXObject){
			return (new ActiveXObject("Microsoft.XMLHTTP"));
		}
		else{
			global.alert("Ajax is not Supported!");
			return (null);
		}
	}

	// console.log("Declared getRequestObject()");

	ajaxUtil.sendGetRequest = function ( requestURL , responseHandler , isJsonObject) {
		// console.log("In sendGetRequest()");
		
		var requestObject = getRequestObject();

		// console.log("made requestObject");


		requestObject.onreadystatechange = function () {
			// console.log("in onreadystatechange with state : " + requestObject.readyState);
			handleResponse( requestObject , responseHandler , isJsonObject );
			// console.log("after executing handleResponse");
		};


		//Alternate way if onreadystatechange
		// 	requestObject.onload = function () {
		// 		responseHandler(requestObject);
		// 	};
		// // console.log("After onreadystatechange");
		
		requestObject.open('GET', requestURL , true);

		// console.log("After open");

		requestObject.send(null);

		// console.log("After send");
	};

	var handleResponse = function( requestObject , responseHandler , isJsonObject ) {

		// console.log("In handle response with state : " + requestObject.readyState);
		if (isJsonObject == undefined) {
			isJsonObject = true;
		}
		if( (requestObject.readyState == 4) && (requestObject.status == 200)){
				if(isJsonObject){
					responseHandler(JSON.parse( requestObject.responseText ));
					}
				else{
					responseHandler(requestObject.responseText);
				}	
				}

		// console.log("Exiting handle response with state : " + requestObject.readyState);
	};
	// console.log("Making ajaxUtil global");
	global.$ajaxUtil = ajaxUtil;

})(window);