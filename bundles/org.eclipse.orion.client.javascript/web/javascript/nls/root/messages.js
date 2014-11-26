/*******************************************************************************
 * @license
 * Copyright (c) 2014 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made
 * available under the terms of the Eclipse Public License v1.0
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html).
 *
 ******************************************************************************/
//NLS_CHARSET=UTF-8
/*eslint-env amd*/
define({
	'error': 'Error',  //$NON-NLS-0$  //$NON-NLS-1$
	'warning' : 'Warning',  //$NON-NLS-0$  //$NON-NLS-1$
	'ignore' : 'Ignore',  //$NON-NLS-0$  //$NON-NLS-1$
	'sourceOutline' : 'Source Outline', //$NON-NLS-0$  //$NON-NLS-1$
	'sourceOutlineTitle': 'JavaScript source outline',  //$NON-NLS-0$  //$NON-NLS-1$
	'contentAssist' : 'JavaScript content assist', //$NON-NLS-0$  //$NON-NLS-1$
	'eslintValidator' : 'JavaScript Validator', //$NON-NLS-0$  //$NON-NLS-1$
	'missingCurly' : 'Statements not enclosed in braces:', //$NON-NLS-0$  //$NON-NLS-1$
	'noEqeqeq' : 'Discouraged \'==\' use:', //$NON-NLS-0$  //$NON-NLS-1$
	'noDebugger' : 'Discouraged \'debugger\' statement use:', //$NON-NLS-0$  //$NON-NLS-1$
	'noEval' : 'Discouraged \'eval()\' use:', //$NON-NLS-0$  //$NON-NLS-1$
	'noDupeKeys' : 'Duplicate object keys:', //$NON-NLS-0$  //$NON-NLS-1$
	'useIsNaN' : 'NaN not compared with isNaN():', //$NON-NLS-0$  //$NON-NLS-1$
	'docFuncDecl' : 'No JSDoc on function declarations:', //$NON-NLS-0$  //$NON-NLS-1$
	'docFuncExpr' : 'No JSDoc on function expressions:', //$NON-NLS-0$  //$NON-NLS-1$
	'noUnreachable' : 'Unreachable code:', //$NON-NLS-0$  //$NON-NLS-1$
	'noFallthrough' : 'Switch case fall-through:', //$NON-NLS-0$  //$NON-NLS-1$
	'useBeforeDefine' : 'Member used before definition:', //$NON-NLS-0$  //$NON-NLS-1$
	'noEmptyBlock' : 'Undocumented empty block:', //$NON-NLS-0$  //$NON-NLS-1$
	'newParens' : 'Missing parentheses in constructor call:', //$NON-NLS-0$  //$NON-NLS-1$
	'noNewArray': 'Discouraged \'new Array()\':', //$NON-NLS-0$  //$NON-NLS-1$
	'noNewFunc': 'Discouraged \'new Function()\':', //$NON-NLS-0$  //$NON-NLS-1$
	'noNewObject': 'Discouraged \'new Object()\':', //$NON-NLS-0$  //$NON-NLS-1$
	'noNewWrappers': 'Discouraged wrapper objects:', //$NON-NLS-0$  //$NON-NLS-1$
	'missingSemi' : 'Missing semicolons:', //$NON-NLS-0$  //$NON-NLS-1$
	'unusedVars' : 'Unused variables:', //$NON-NLS-0$  //$NON-NLS-1$
	'varRedecl' : 'Variable re-declarations:', //$NON-NLS-0$  //$NON-NLS-1$
	'undefMember' : 'Undeclared global reference:', //$NON-NLS-0$  //$NON-NLS-1$
	'unnecessarySemis' : 'Unnecessary semicolons:', //$NON-NLS-0$  //$NON-NLS-1$
	'unusedParams' : 'Unused parameters:', //$NON-NLS-0$  //$NON-NLS-1$
	'unsupportedJSLint' : 'Unsupported environment directive:',  //$NON-NLS-0$  //$NON-NLS-1$
	'throwError': 'Non-Error used in \'throw\':',  //$NON-NLS-0$  //$NON-NLS-1$
	'generateDocName' : 'Generate Element Comment',  //$NON-NLS-0$  //$NON-NLS-1$
	'generateDocTooltip' : 'Generate a JSDoc-like comment for the selected JavaScript element',  //$NON-NLS-0$  //$NON-NLS-1$
	'openDeclName' : 'Open Declaration',  //$NON-NLS-0$  //$NON-NLS-1$
	'openDeclTooltip' : 'Open the declaration of the selected element',  //$NON-NLS-0$  //$NON-NLS-1$
	'validTypeof': 'Invalid \'typeof\' comparison',  //$NON-NLS-0$ //$NON-NLS-1$
	'noSparseArrays': 'Sparse array declarations', //$NON-NLS-0$ //$NON-NLS-1$
	'jsHover': 'JavaScript Hover Provider', //$NON-NLS-0$ //$NON-NLS-1$
	'removeExtraSemiFixName': 'Remove extra semicolon', //$NON-NLS-0$ //$NON-NLS-1$
	'removeExtraSemiFixTooltip': 'Removes the extra semicolon', //$NON-NLS-0$ //$NON-NLS-1$
	'addFallthroughCommentFixName': 'Add $FALLTHROUGH$ comment', //$NON-NLS-0$ //$NON-NLS-1$
	'addFallthroughCommentFixTooltip': 'Add the $FALLTHROUGH$ line comment', //$NON-NLS-0$ //$NON-NLS-1$
	'addEmptyCommentFixName': 'Comment empty block', //$NON-NLS-0$ //$NON-NLS-1$
	'addEmptyCommentFixTooltip': 'Add a TODO comment to the empty block', //$NON-NLS-0$ //$NON-NLS-1$
	'addESLintEnvFixName': 'Add to eslint-env directive', //$NON-NLS-0$ //$NON-NLS-1$
	'addESLintEnvFixTooltip': 'Add or update an eslint-env directive to filter the known member', //$NON-NLS-0$ //$NON-NLS-1$
	'addESLintGlobalFixName': 'Add to global directive', //$NON-NLS-0$ //$NON-NLS-1$
	'addESLintGlobalFixTooltip': 'Add or update a global directive to filter the unknown member', //$NON-NLS-0$ //$NON-NLS-1$
	'removeUnusedParamsFixName': 'Remove unused parameter', //$NON-NLS-0$ //$NON-NLS-1$
	'removeUnusedParamsFixTooltip': 'Remove the unused parameter, keeping side effects', //$NON-NLS-0$ //$NON-NLS-1$
	'commentCallbackFixName': 'Document as callback', //$NON-NLS-0$ //$NON-NLS-1$
	'commentCallbackFixTooltip': 'Document the parameter as a callback, ignoring unused parameters', //$NON-NLS-0$ //$NON-NLS-1$
	'eqeqeqFixName': 'Change to \'===\'', //$NON-NLS-0$ //$NON-NLS-1$
	'eqeqeqFixTooltip': 'Change the \'==\' to \'===\'', //$NON-NLS-0$ //$NON-NLS-1$
	'unreachableFixName': 'Remove unreachable code', //$NON-NLS-0$ //$NON-NLS-1$
	'unreachableFixTooltip': 'Remove the unreachable code', //$NON-NLS-0$ //$NON-NLS-1$
});
