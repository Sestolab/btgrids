CKEDITOR.plugins.add('btgrids', {
	requires: 'dialog,smethods',
	lang: 'en,ru,uk',
	icons: 'btgrids',

	init: function(editor){

		editor.addCommand('btgrids', new CKEDITOR.dialogCommand('btgridsDialog', {
			allowedContent: 'div(row,col)',
			requiredContent: 'div',
		}));

		editor.addCommand('btGridRowInsertBefore', {
			exec: function(){
				createRow().insertBefore(getRow());
			}
		});

		editor.addCommand('btGridRowInsertAfter', {
			exec: function(){
				createRow().insertAfter(getRow());
			}
		});
		editor.addCommand('btGridRowDelete', {
			exec: function(){
				getRow().remove();
			}
		});

		editor.ui.addButton('btgrids', {
			label: editor.lang.btgrids.label,
			command: 'btgrids'
		});

		if (editor.contextMenu){
			editor.addMenuGroup('btgridsGroup');
			editor.addMenuItems({
				btGridRow: {
					label: editor.lang.btgrids.label,
					group: 'btgridsGroup',
					order: 1,
					getItems: function(){
						return {
							btGridRowInsertBefore: CKEDITOR.TRISTATE_OFF,
							btGridRowInsertAfter: CKEDITOR.TRISTATE_OFF,
							btGridRowDelete: CKEDITOR.TRISTATE_OFF
						};
					}
				},
				btGridRowInsertBefore: {
					label: editor.lang.btgrids.insertBefore,
					command: 'btGridRowInsertBefore',
					group: 'btgridsGroup'
				},
				btGridRowInsertAfter: {
					label: editor.lang.btgrids.insertAfter,
					command: 'btGridRowInsertAfter',
					group: 'btgridsGroup'
				},
				btGridRowDelete: {
					label: editor.lang.btgrids.deleteRow,
					command: 'btGridRowDelete',
					group: 'btgridsGroup'
				}
			});

			editor.contextMenu.addListener(function(element){
				if (element.findParent('div.row'))
					return { btGridRow: CKEDITOR.TRISTATE_OFF };
			});
		}

		CKEDITOR.dialog.add('btgridsDialog', this.path + 'dialogs/btgrids.js');


		function getRow(){
			return editor.getSelection().getStartElement().findParent('div.row');
		}

		function createRow(){
			var row = editor.document.createElement('div').addClass('row'),
				col = editor.document.createElement('div').addClass('col');
			col.setText('Column');
			row.append(col);
			return row;
		}
	}
});

