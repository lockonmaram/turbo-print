const constructLog = (
  vscode,
  document,
  editBuilder,
  messages,
  selectedTextLine
) => {
  const currentLine = document.lineAt(selectedTextLine).firstNonWhitespaceCharacterIndex;
  const nextLine = document.lineAt(selectedTextLine + 1).firstNonWhitespaceCharacterIndex;

  const initialSpaces = `${'	'.repeat(currentLine > nextLine ? currentLine : nextLine)}`;

  const debuggingMsg = messages.length > 1 ?
  `${messages.map((msg) => `${initialSpaces}${msg}\n`).join('')}` :
  `${initialSpaces}${messages[0]}\n`;
  const wrappingMsg = `${initialSpaces}fmt.Println("${"-".repeat(debuggingMsg.length - 15)}")`;
  
  editBuilder.insert(
    new vscode.Position(
      selectedTextLine + 1,
      0
    ),
    `${wrappingMsg}\n${debuggingMsg}${wrappingMsg}\n`
  );
};

module.exports = {
  constructLog
};