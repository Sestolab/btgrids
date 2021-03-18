CKEDITOR.dialog.add('btgridsDialog', function(editor){
	return {
		title: editor.lang.btgrids.title,
		minWidth: 200,
		minHeight: 20,
		contents: [{
			id: 'basic',
			elements: [{
				type: 'hbox',
				children: [
					{
						type: 'text',
						id: 'rows',
						label: editor.lang.btgrids.rows,
						default: 1,
					},
					{
						type: 'text',
						id: 'columns',
						label: editor.lang.btgrids.columns,
						default: 1,
					}
				]
			}]
		}],

		onOk: function(){
			for (var r = 0; r < this.getValueOf('basic', 'rows'); r++){
				var row = editor.document.createElement('div').addClass('row');
				for (var c = 0; c < this.getValueOf('basic', 'columns'); c++){
					var col = editor.document.createElement('div').addClass('col');
					col.setText('Column ' + (c+1));
					row.append(col);
				}
				editor.insertElement(row);
			}
		}
	};
});

