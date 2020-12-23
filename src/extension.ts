import * as vscode from 'vscode';

function smart_quote_core() {
        const editor = vscode.window.activeTextEditor;

        if (editor) {
                const document = editor.document;
                let selection = editor.selection;
                if (selection.isEmpty) {
                        // Idea borrowed from https://github.com/halfcrazy/vscode-pangu/blob/master/src/extension.ts
                        selection = new vscode.Selection(new vscode.Position(0, 0), new vscode.Position(Number.MAX_VALUE, Number.MAX_VALUE));
                }

                const word = document.getText(selection);

                var flag = false;
                function foo(_match: any, _offset: any, _string: any) {
                        flag = !flag;
                        return flag ? "“" : "”";
                };
                let newtext: string = word.replace(/["“”]/gi, foo);

                editor.edit(editBuilder => { editBuilder.replace(selection, newtext); });
        }
}

export function activate(context: vscode.ExtensionContext) {
        context.subscriptions.push(vscode.commands.registerCommand('smartquote.smart_quote', smart_quote_core));
}

export function deactivate() { }
