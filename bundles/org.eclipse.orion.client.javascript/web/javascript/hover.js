 /*******************************************************************************
 * @license
 * Copyright (c) 2014, 2015 IBM Corporation and others.
 * All rights reserved. This program and the accompanying materials are made 
 * available under the terms of the Eclipse Public License v1.0 
 * (http://www.eclipse.org/legal/epl-v10.html), and the Eclipse Distribution 
 * License v1.0 (http://www.eclipse.org/org/documents/edl-v10.html). 
 *
 * Contributors:
 *     IBM Corporation - initial API and implementation
 *******************************************************************************/
/*eslint-env amd*/
/* global doctrine */
define([
'orion/objects', 
'javascript/finder', 
'orion/URITemplate',
'orion/Deferred',
'i18n!javascript/nls/messages',
'orion/i18nUtil',
'doctrine' //last, exports into global
], function(Objects, Finder, URITemplate, Deferred, Messages, i18nUtil) {
	
	/**
	 * @description Formats the hover info as markdown text
	 * @param {String} node The text to format
	 * @returns returns
	 */
	function formatMarkdownHover(comment, offsetRange) {
	    if(!comment) {
	        return null;
	    }
	    try {
	        var format = Object.create(null);
	        if(comment) {
		        var doc = doctrine.parse(comment, {recoverable:true, unwrap : true});
		        format.params = [];
		        format.throws = [];
		        format.see = [];
		        format.desc = (doc.description ? doc.description : '');
		        if(doc.tags) {
		            var len = doc.tags.length;
		            for(var i = 0; i < len; i++) {
		                var tag = doc.tags[i];
		                switch(tag.title) {
		                    case 'name': {
		                        if(tag.name) {
		                          format.name = tag.name; 
		                        }
		                        break;
		                    }
		                    case 'description': {
		                        if(tag.description !== null) {
		                          format.desc = (format.desc === '' ? tag.description : format.desc+'\n'+tag.description);
		                        }
		                        break;
		                    }
		                    case 'param': {
		                        format.params.push(_convertTagType(tag.type) +
		                                  (tag.name ? '__'+tag.name+'__ ' : '') + 
		                                  (tag.description ? tag.description+'\n' : ''));
		                        break;
		                    }
		                    case 'returns': 
		                    case 'return': {
		                        format.returns = _convertTagType(tag.type) +
		                              (tag.description ? tag.description+'\n' : '');
		                         break;
		                    }
		                    case 'since': {
		                        if(tag.description) {
		                          format.since = tag.description;
		                        }
		                        break;
		                    }
		                    case 'callback': {
		                    	if(tag.description) {
		                          format.callback = tag.description;
		                        } else {
		                        	format.callback = 'This function is used as a callback';
		                        }
		                    	break;
		                    }
		                    case 'throws': {
		                    	format.throws.push(_convertTagType(tag.type) + (tag.description ? tag.description+'\n' : '')); //$NON-NLS-1$
		                    	break;
		                    }
		                    case 'see': {
		                    	format.see.push(_convertTagType(tag.type) + (tag.description ? tag.description+'\n' : '')); //$NON-NLS-1$
		                    	break;
		                    }
		                    case 'deprecated': {
		                    	format.deprecated = tag.description ? tag.description+'\n' : ''; //$NON-NLS-1$
		                    }
	                	}
		            }
		        }
	        }
	        var hover = '';
	        if(typeof(format.deprecated) !== 'undefined') {
	        	hover += i18nUtil.formatMessage('__${0}__ ', Messages['deprecatedHoverTitle'])+format.deprecated+'\n\n'; //$NON-NLS-2$ //$NON-NLS-1$
	        }
	        if(format.desc !== '') {
	            hover += format.desc+'\n\n'; //$NON-NLS-1$
	        }
	        if(format.params.length > 0) {
	            hover += i18nUtil.formatMessage('__${0}__\n\n', Messages['parametersHoverTitle']); //$NON-NLS-1$
	            for(i = 0; i < format.params.length; i++) {
	                hover += '>'+format.params[i] + '\n\n'; //$NON-NLS-1$
	            }
	        }
	        if(format.returns) {
	            hover += i18nUtil.formatMessage('__${0}__\n\n>', Messages['returnsHoverTitle']) + format.returns + '\n\n'; //$NON-NLS-2$ //$NON-NLS-1$
	        }
	        if(format.throws.length > 0) {
	        	hover += i18nUtil.formatMessage('__${0}__\n\n', Messages['throwsHoverTitle']); //$NON-NLS-1$
	        	for(i = 0; i < format.throws.length; i++) {
	        		hover += '>'+format.throws[i]+'\n\n'; //$NON-NLS-1$
	        	}
	        }
	        if(format.callback) {
				hover += i18nUtil.formatMessage('__${0}__\n\n>', Messages['callbackHoverTitle']) + format.callback + '\n\n'; //$NON-NLS-2$ //$NON-NLS-1$
	        }
	        if(format.since) {
	            hover += i18nUtil.formatMessage('__${0}__\n\n>', Messages['sinceHoverTitle'])+format.since+'\n\n'; //$NON-NLS-2$ //$NON-NLS-1$
	        }
	        if(format.see.length > 0) {
	        	hover += i18nUtil.formatMessage('__${0}__\n\n', Messages['seeAlsoHoverTitle']); //$NON-NLS-1$
	        	for(i = 0; i < format.see.length; i++) {
	        		hover += '>'+format.see[i]; //$NON-NLS-1$
	        		if(i < format.see.length-1) {
	        			hover += '\n\n'; //$NON-NLS-1$
	        		}
	        	}
	        }
	        if(hover === '') {
	        	return null;
	        }
	        //TODO scope this to not show when you are on a decl
	        /**var href = new URITemplate("#{,resource,params*}").expand(
	                      {
	                      resource: metadata.location, 
	                      params: {start:node.range[0], end: node.range[1]}
	                      }); //$NON-NLS-0$
	        hover += '\n\n\n  [Jump to declaration]('+href+')';*/
	    }
	    catch(e) {
	        //do nothing, show what we have
	    }
	    var result = {content: hover, type:'markdown'}; //$NON-NLS-1$
	    if (offsetRange){
	    	result.offsetStart = offsetRange[0];
	    	result.offsetEnd = offsetRange[1];
	    }
	    return result;
	}
	
	/**
	 * @description Converts the doctrine tag type to a simple form to appear in the hover
	 * @private
	 * @param {Object} tag Teh doctrine tag object
	 * @returns {String} The simple name to display for the given doctrine tag type
	 */
	function _convertTagType(type) {
	    if(!type) {
	        return '';
	    }
        switch(type.type) {
            case 'NameExpression': {
                if(type.name) {
                  return '*('+type.name+')* ';
                }
                break;
            }
            case 'RecordType': {
                return '*(Object)* ';
            }
            case 'FunctionType': {
                return '*(Function)* ';
            }
            case 'NullableType': 
            case 'NonNullableType':
            case 'OptionalType':
            case 'RestType': {
                return _convertTagType(type.expression);
            }
            case 'TypeApplication': {
                //we only want to care about the first part i.e. Object[] vs. Object.<string, etc>
                if(type.expression.name === 'Array') {
                    //we need to grab the first application
                    if(type.applications && type.applications.length > 0) {
                        var val = type.applications[0];
                        if(val.name) {
                            //simple type
                            return '*('+val.name+'[])* ';
                        } else if(val.fields && val.fields.length > 0) {
                            return _convertTagType(val.fields[0]);
                        } else {
                            //fallback to trying to format the raw value
                            return _convertTagType(val);
                        }
	                    
	                }
                }
                return _convertTagType(type.expression);
            }
            case 'UnionType': 
            case 'ArrayType': {
                if(type.elements && type.elements.length > 0) {
                    //always just take the first type
                    return _convertTagType(type.elements[0]);
                }
                break;
            }
            case 'FieldType': {
                return _convertTagType(type.value);
            }
            default: return '';
        }
	}
	
	var deferred;
	
	/**
	 * @name javascript.JavaScriptHover
	 * @description creates a new instance of the hover
	 * @constructor
	 * @public
	 * @param {javascript.ASTManager} astManager
	 * @param {javascript.ScriptResolver} resolver
	 * @param {javascript.TernWorkerCore} ternWorker
	 * @param {javascript.CUProvider} cuProvider 
	 * @since 7.0
	 */
	function JavaScriptHover(astManager, resolver, ternWorker, cuProvider) {
		this.astManager = astManager;
		this.resolver = resolver;
		this.ternworker = ternWorker;
		this.cuprovider = cuProvider;
		this.ternworker.addEventListener('message', function(evnt) {
			if(typeof(evnt.data) === 'object') {
				var _d = evnt.data;
				var hover = '';
				if(_d.request === 'documentation') {
					if(_d.doc) {
						hover = formatMarkdownHover(_d.doc.doc);
					}
					deferred.resolve(hover);
				} 
			}
		});
	}
	
	Objects.mixin(JavaScriptHover.prototype, /** @lends javascript.JavaScriptHover.prototype*/ {
		
		/**
		 * @description Callback from the editor to compute the hover
		 * @function
		 * @public 
		 * @memberof javascript.JavaScriptOccurrences.prototype
		 * @param {Object} editorContext The current editor context
		 * @param {Object} ctxt The current selection context
		 */
		computeHoverInfo: function computeHoverInfo(editorContext, ctxt) {
		    if(ctxt.proposal) {
		        return ctxt.proposal.hover;
		    }
		    var that = this;
		    return editorContext.getFileMetadata().then(function(meta) {
		    	if (!meta){
		    		return null;
		    	}
		        if(meta && meta.contentType.id === 'application/javascript') {
		            return that.astManager.getAST(editorContext).then(function(ast) {
        				return that._doHover(ast, ctxt, meta);
        			});
		        }
		        return editorContext.getText().then(function(text) {
		            var blocks = Finder.findScriptBlocks(text);
		            if(blocks && blocks.length > 0) {
		            	var cu = that.cuprovider.getCompilationUnit(blocks, meta);
    		            if(cu.validOffset(ctxt.offset)) {
        		            return that.astManager.getAST(cu.getEditorContext()).then(function(ast) {
                				return that._doHover(ast, ctxt, meta);
                			});
            			}
        			}
        			return null;
		        });
		    });
			
		},
		
		_doHover: function _doHover(ast, ctxt, meta) {
			var node = Finder.findNode(ctxt.offset, ast, {parents:true});
		    if(node && node.type === 'Literal') {
		    	//Symantic navigation
		    	if(ctxt.offset <= node.range[0] || ctxt.offset >= node.range[1]) {
                    //be a bit more precise than finder
                    return null;
                }
                var parents = node.parents;
                var parent = parents.pop();
                var that = this;
                if(parent.type === 'ArrayExpression') {
                    parent = parents.pop();
                    if(parent.type === 'CallExpression' && (parent.callee.name === 'define' || parent.callee.name === 'require')) {
                        var path = node.value;
	                    return that.resolver.getWorkspaceFile(path).then(function(files) {
		                    return that._formatFilesHover(path, files);
		                });
                    }
                } else if(parent.type === 'CallExpression') {
                    var path = node.value;
                    switch(parent.callee.name) {
                        case 'require': {
                            return that.resolver.getWorkspaceFile(path).then(function(files) {
                            	if(!/\.js$/.test(path)) {
	                                path += '.js'; //$NON-NLS-1$
	                            }
			                    var rels = that.resolver.resolveRelativeFiles(path, files, meta);
	                            if(rels && rels.length > 0) {
			                        return that._formatFilesHover(node.value, rels);
			                    }
			                });
                        }
                        //$FALLTHROUGH$
                        case 'importScripts': {
                            var path = node.value;
	                        return that.resolver.getWorkspaceFile(path).then(function(files) {
	                            if(!/\.js$/.test(path)) {
	                                path += '.js'; //$NON-NLS-1$
	                            }
	                            var rels = that.resolver.resolveRelativeFiles(path, files, meta);
	                            if(rels && rels.length > 0) {
			                        return that._formatFilesHover(node.value, rels);
			                    }
			                });
                        }
                    }
                }
                return null;
		    } 
			deferred = new Deferred();
			var files = [{type: 'full', name: meta.location, text: ast.source}]; //$NON-NLS-1$
			this.ternworker.postMessage({request:'documentation', args:{params:{offset: ctxt.offset}, files: files, meta:{location: meta.location}}}); //$NON-NLS-1$
			return deferred;
		},
		
		/**
		 * @description Formats the list of files as links for the hover
		 * @function
		 * @private
		 * @param {String} path The path we are navigating to
		 * @param {Array.<javascript.ScriptResolver.File>} files The array of files to linkify
		 * @returns {String} The mardown to show in the hover
		 */
		_formatFilesHover: function _formatFilesHover(path, files) {
		    if(path && files) {
		        var title = null;
		        if(files.length > 1) {
		             title = i18nUtil.formatMessage('###${0} \'${1}\'###', Messages['openFileForTitle'], path); //$NON-NLS-1$ //$NON-NLS-2$
		        }
		        var hover = '';
		        for(var i = 0; i < files.length; i++) {
		            var file = files[i];
		            if(file.name && file.path && file.contentType) {
		                hover += '[';
		                if(file.contentType.icon) {
		                    hover += '!['+file.contentType.name+']('+file.contentType.icon+')'; //$NON-NLS-1$ //$NON-NLS-2$
		                }
		                var href = new URITemplate("#{,resource,params*}").expand( //$NON-NLS-1$
    		                      {
    		                      resource: file.location, 
    		                      params: {}
    		                      }); //$NON-NLS-0$
		                hover += file.name + ']('+href+') - '+file.path+'\n\n'; //$NON-NLS-3$ //$NON-NLS-2$ //$NON-NLS-1$
		            }
		            
		        }
		        return {title: title, content: hover, type:'markdown', allowFullWidth: true}; //$NON-NLS-1$
		    }
		    return null;
		}
	});
	
	JavaScriptHover.prototype.contructor = JavaScriptHover;
	
	return {
		JavaScriptHover: JavaScriptHover,
		formatMarkdownHover: formatMarkdownHover
		};
});
