/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

function onAuthRequired(headers, errorMessage){
	errorMessage = errorMessage ? errorMessage : null;
	
	return {
		authStatus: "credentialsRequired",
		errorMessage: errorMessage
	};
}

function submitAuthentication(username, password){
	if (username==="user" && password === "password"){

		var userIdentity = {
				userId: username,
				displayName: username, 
				attributes: {
					foo: "bar"
				}
		};

		WL.Server.setActiveUser("AuthRealm", userIdentity);
		
		return { 
			authStatus: "complete" 
		};
	}

	return onAuthRequired(null, "Invalid login credentials");
}

function getSecretData(){
	return {
		secretData: "Very very very very secret data"
	};
}

function onLogout(){
	WL.Logger.debug("Logged out");
}