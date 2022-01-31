const vscode = require('vscode');
const { constructLog } = require('./helper');
/**
 * @param {vscode.ExtensionContext} context
 */
function activate(context) {
	const Println = vscode.commands.registerCommand('turboPrint.Println', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		
		for (let i = 0; i < editor.selections.length; i++) {
			const selection = editor.selections[i];
			const selectedText = document.getText(selection);
			const selectedTextLine = selection.active.line;

			if (selectedText.trim().length !== 0) {
				await editor.edit((editBuilder) => {
					const messages = [`fmt.Println("${selectedText.trim()} ====>", ${selectedText.trim()})`];
					constructLog(vscode, document, editBuilder, messages, selectedTextLine);
				});
			}
		}
	});

	const MarshalIndent = vscode.commands.registerCommand('turboPrint.MarshalIndent', async () => {
		const editor = vscode.window.activeTextEditor;
		if (!editor) {
			return;
		}

		const document = editor.document;
		
		for (let i = 0; i < editor.selections.length; i++) {
			const selection = editor.selections[i];
			const selectedText = document.getText(selection);
			const selectedTextLine = selection.active.line;

			if (selectedText.trim().length !== 0) {
				await editor.edit((editBuilder) => {
					const messages = [
						`jsonByteLog${i+1}, _ := json.MarshalIndent(${selectedText.trim()}, "", "  ")`,
						`fmt.Println("${selectedText.trim()} ====>", string(jsonByteLog${i+1}))`
					];
					constructLog(vscode, document, editBuilder, messages, selectedTextLine);
				});
			}
		}
	});

	context.subscriptions.push(Println);
	context.subscriptions.push(MarshalIndent);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
