const fs = require('fs');
const path = require('path');
const os = require('os');

const beautify = require('js-beautify');

const MG = require('../lib');

const hasOwn = function(obj, key) {
    return Object.prototype.hasOwnProperty.call(obj, key);
};

const replace = function(str, obj, defaultValue) {
    str = `${str}`;
    if (!obj) {
        return str;
    }
    str = str.replace(/\{([^}{]+)\}/g, function(match, key) {
        if (!hasOwn(obj, key)) {
            if (typeof defaultValue !== 'undefined') {
                return defaultValue;
            }
            return match;
        }
        let val = obj[key];
        if (typeof val === 'function') {
            val = val(obj, key);
        }
        if (typeof val === 'undefined') {
            val = '';
        }
        return val;
    });
    return str;
};

const readFileContentSync = function(filePath) {
    let content = null;
    const isExists = fs.existsSync(filePath);
    if (isExists) {
        content = fs.readFileSync(filePath);
        if (Buffer.isBuffer(content)) {
            content = content.toString('utf8');
        }
    }
    return content;
};

const writeFileContentSync = function(filePath, content, force = true) {
    const isExists = fs.existsSync(filePath);
    if (force || isExists) {
        const p = path.dirname(filePath);
        if (!fs.existsSync(p)) {
            fs.mkdirSync(p, {
                recursive: true
            });
        }
        fs.writeFileSync(filePath, content);
        return true;
    }
    return false;
};


const replaceFile = function(templatePath, savePath, callback) {
    const content = readFileContentSync(templatePath);
    const editedContent = callback(content);
    if (editedContent === content) {
        return content;
    }
    writeFileContentSync(savePath, editedContent);
    return editedContent;
};

const start = () => {

    const newLine = `  ${os.EOL}`;

    const list = [{
        data: {
            columns: ['', 'Name', 'Value'],
            rows: [
                [1, 'Tom', 'Value 1'],
                [2, 'Jerry', 'Value 2']
            ]
        }
    }, {
        title: 'With column width:',
        data: {
            columns: ['', {
                name: 'Name',
                width: 15
            }, {
                name: 'Value',
                width: 35
            }],
            rows: [
                [1, 'Hello', 'Long Text Value'],
                [2, 'Hello There', 'Long Text Value Long Text Value']
            ]
        }
    }, {
        title: 'With column align and padding:',
        data: {
            options: {
                padding: 1
            },
            columns: [{
                id: 'default',
                name: 'Default',
                width: 10
            }, {
                id: 'left',
                name: 'Left',
                width: 10,
                align: 'left'
            }, {
                id: 'center',
                name: 'Center',
                width: 10,
                align: 'center'
            }, {
                id: 'right',
                name: 'Right',
                width: 10,
                align: 'right'
            }],
            rows: [{
                default: 'Cell',
                left: 'Markdown',
                center: 'Start',
                right: '123.0'
            }, {
                default: 'Content',
                left: 'Grid',
                center: 'Complete',
                right: '8.1'
            }]
        }
    }, {
        title: 'With special character:',
        data: {
            columns: [{
                name: 'Name',
                width: 15
            }, {
                name: 'Character',
                align: 'center'
            }],
            rows: [
                ['Backtick', '`'],
                ['Pipe', '|'],
                ['Escaped Pipes', '\\||\\|'],
                ['中文', '✅']
            ]
        }
    }, {
        title: 'With links, images, Codes and formatting:',
        data: {
            columns: ['Name', 'Version', 'Install', 'Description'],
            rows: [
                [
                    '[markdown-grid](https://github.com/cenfun/markdown-grid)',
                    '![npm](https://badgen.net/npm/v/markdown-grid)',
                    '`npm i markdown-grid`',
                    'Generating a **Markdown** *Grid*'
                ],
                [
                    '[console-grid](https://github.com/cenfun/console-grid)',
                    '![npm](https://badgen.net/npm/v/console-grid)',
                    '`npm i console-grid`',
                    'Log a *Grid* in **Console**'
                ]
            ]
        }
    }].map((item) => {

        const codes = ['const MG = require("markdown-grid");'];
        codes.push(`const mg = MG(${JSON.stringify(item.data)});`);
        codes.push('');
        codes.push('console.log(mg);');

        const code = codes.join(os.EOL);

        const mg = MG(item.data);
        const str = beautify.js(code, {}) + newLine + os.EOL + mg;

        //console.log(str);

        const ls = [
            '```js',
            str,
            '```',
            mg
        ];

        if (item.title) {
            ls.unshift(`## ${item.title}`);
        }

        return ls.join(newLine);
    });

    const templatePath = path.resolve(__dirname, 'README.md');
    const savePath = path.resolve(__dirname, '../README.md');

    replaceFile(templatePath, savePath, (content) => {
        return replace(content, {
            placeholder_list: list.join(newLine)
        });
    });

    console.log('generated README.md');

};


start();
