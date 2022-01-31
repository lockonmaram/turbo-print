const vscode = require('vscode');

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
					// get spaces before log
					const currentLine = document.lineAt(selectedTextLine).firstNonWhitespaceCharacterIndex;
					const nextLine = document.lineAt(selectedTextLine + 1).firstNonWhitespaceCharacterIndex;

					const initialSpaces = `${'	'.repeat(currentLine > nextLine ? currentLine : nextLine)}`
					const debuggingMsg = `${initialSpaces}fmt.Println("${selectedText.trim()} ====>", ${selectedText.trim()})`;
					const wrappingMsg = `${initialSpaces}fmt.Println("${"-".repeat(debuggingMsg.length - 15)}")`;

					editBuilder.insert(
						new vscode.Position(
							selectedTextLine + 1,
							0
						),
						`${wrappingMsg}\n${debuggingMsg}\n${wrappingMsg}\n`
					);
				});
			}
		}
	});

	context.subscriptions.push(Println);
}

// this method is called when your extension is deactivated
function deactivate() {}

module.exports = {
	activate,
	deactivate
}
