/*
 *  Licensed Materials - Property of IBM
 *  5725-I43 (C) Copyright IBM Corp. 2011, 2013. All Rights Reserved.
 *  US Government Users Restricted Rights - Use, duplication or
 *  disclosure restricted by GSA ADP Schedule Contract with IBM Corp.
 */

/************************************************************************
 * Implementation code for procedure - 'procedure1'
 *
 *
 * @return - invocationResult
 */
 
var getStudentsSQLStatement = WL.Server.createSQLStatement("select * from BEGANSS.STUDENT");
function getStudentsSQL() {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getStudentsSQLStatement
		
	});
}

//var getStudentMarkByIdStatement = WL.Server.createSQLStatement("select * from BEGANSS.MARK where STUDENT_ID = ? ");


var getStudentMarkByIdStatement = WL.Server.createSQLStatement("select  a.STUDENT_ID, a.STUDY_ID, a.DATE, a.COMMENTS, a.MARK, b.NAME, b.HOURS, b.AVG_MARK, a.PROFESS_ID, c.FIRST_NAME, C.SECOND_NAME from BEGANSS.MARK a join BEGANSS.STUDY b on a.STUDY_ID = b.STUDY_ID join BEGANSS.PROFESS c on a.PROFESS_ID = c.PROFESS_ID where a.STUDENT_ID = ?");

function getStudentMarkById(id) {
	return WL.Server.invokeSQLStatement({
		preparedStatement : getStudentMarkByIdStatement,
		parameters : [id]
	});
}

var getUserPasswordSQLStatement = WL.Server.createSQLStatement("select a.PASS, a.ROLE from BEGANSS.USER a where a.USERNAME = ?");
function getUserPasswordSQL(name) {
	
	return WL.Server.invokeSQLStatement({
		preparedStatement : getUserPasswordSQLStatement,
		parameters : [name]
		
	});
}



/************************************************************************
 * Implementation code for procedure - 'procedure2'
 *
 *
 * @return - invocationResult
 */
 
function getStudents() {
	return WL.Server.invokeSQLStoredProcedure({
		procedure : " BEGANSS.SELECT_STUDENT_NATIVE_SQL",
		
	});
}

