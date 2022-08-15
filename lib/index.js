const os = require('os');

const isNum = function(num) {
    if (typeof num !== 'number' || isNaN(num)) {
        return false;
    }
    const isInvalid = function(n) {
        if (n === Number.MAX_VALUE || n === Number.MIN_VALUE || n === Number.NEGATIVE_INFINITY || n === Number.POSITIVE_INFINITY) {
            return true;
        }
        return false;
    };
    if (isInvalid(num)) {
        return false;
    }
    return true;
};
// format to a valid number
const toNum = function(num, toInt) {
    if (typeof num !== 'number') {
        num = parseFloat(num);
    }
    if (isNaN(num)) {
        num = 0;
    }
    if (toInt) {
        num |= 0;
    }
    return num;
};

//https://en.wikipedia.org/wiki/Halfwidth_and_fullwidth_forms_(Unicode_block)
//http://www.unicode.org/Public/UCD/latest/ucd/EastAsianWidth.txt
/*eslint-disable complexity */
const isNarrowCharacter = (character) => {
    const cp = character.codePointAt(0);
    const border = [
        0x2500,
        0x2502,
        0x250c,
        0x252c,
        0x2510,
        0x251c,
        0x253c,
        0x2524,
        0x2514,
        0x2534,
        0x2518
    ];
    if (border.indexOf(cp) !== -1) {
        return true;
    }
    return (
        (cp >= 0x20 && cp <= 0x7E)
            || cp === 0xA2
            || cp === 0xA3
            || cp === 0xA5
            || cp === 0xA6
            || cp === 0xAC
            || cp === 0xAF
            || cp === 0x20A9
            || (cp >= 0x27E6 && cp <= 0x27ED)
            || cp === 0x2985
            || cp === 0x2986
            || (cp >= 0xFF61 && cp <= 0xFFBE)
            || (cp >= 0xFFC2 && cp <= 0xFFC7)
            || (cp >= 0xFFCA && cp <= 0xFFCF)
            || (cp >= 0xFFD2 && cp <= 0xFFD7)
            || (cp >= 0xFFDA && cp <= 0xFFDC)
            || (cp >= 0xFFE8 && cp <= 0xFFEE)
    );
};
/*eslint-enable */

const getByteLen = (str) => {
    let len = 0;
    const max = str.length;
    let i = 0;
    while (i < max) {
        const c = str.charAt(i);
        if (isNarrowCharacter(c)) {
            len += 1;
        } else {
            len += 2;
        }
        i++;
    }
    return len;
};

const renderLine = (ls, padding) => {
    const spacing = ''.padEnd(padding, ' ');
    const line = ls.join(`${spacing}|${spacing}`);
    return `|${spacing}${line}${spacing}|`;
};

const renderCell = (cellValue, column) => {

    //To include a pipe | as content within your cell, use a \ before the pipe:
    cellValue = cellValue.split(/\\?\|/g).join('\\|');
    const valueWidth = getByteLen(cellValue);
    const width = column.width;

    if (width <= valueWidth) {
        return cellValue;
    }

    const spacingWidth = width - valueWidth;
    const spacing = ''.padEnd(spacingWidth, ' ');

    const align = column.align;

    if (align === 'right') {
        return spacing + cellValue;
    }

    if (align === 'center') {
        const l = Math.round(spacingWidth * 0.5);
        const r = spacingWidth - l;
        const spacingL = ''.padEnd(l, ' ');
        const spacingR = ''.padEnd(r, ' ');
        return spacingL + cellValue + spacingR;

    }

    return cellValue + spacing;
};

const renderHyphen = (column) => {
    const width = column.width;
    const align = column.align;
    if (align === 'left') {
        return ':'.padEnd(width, '-');
    }
    if (align === 'right') {
        return ':'.padStart(width, '-');
    }
    if (align === 'center') {
        const hyphen = ''.padEnd(width - 2, '-');
        return `:${hyphen}:`;
    }
    return ''.padEnd(width, '-');
};

module.exports = function(data) {

    const options = {
        padding: 0,
        ... data.options
    };

    const padding = toNum(options.padding, true);

    //console.log(data, options);

    const lines = [];

    //init columns
    const columns = data.columns.map((item) => {
        if (typeof item === 'string') {
            item = {
                name: item
            };
        }
        const column = {
            ... item
        };
        column.name = `${column.name}`;
        if (!isNum(column.width)) {
            column.width = getByteLen(column.name);
        }
        column.width = Math.max(column.width, 3);
        return column;
    });

    //header
    const headers = [];
    columns.forEach((column) => {
        headers.push(renderCell(column.name, column));
    });
    lines.push(renderLine(headers, padding));

    const hyphens = [];
    columns.forEach((column) => {
        hyphens.push(renderHyphen(column));
    });
    lines.push(renderLine(hyphens, padding));

    //rows
    data.rows.forEach((row) => {
        const cells = [];
        columns.forEach((column, i) => {
            let cellValue = '';
            if (Array.isArray(row)) {
                cellValue += row[i];
            } else {
                cellValue += row[column.id];
            }
            cells.push(renderCell(cellValue, column));
        });
        lines.push(renderLine(cells, padding));
    });

    return lines.join(os.EOL);
};
