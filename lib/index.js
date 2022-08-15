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

const renderLine = (ls) => {
    ls.push('');
    ls.unshift('');
    return ls.join('|');
};

const renderCell = (cellValue, column) => {
    const width = column.width;
    const align = column.align;
    if (align === 'right') {
        return cellValue.padStart(width, ' ');
    }
    if (align === 'center') {
        const valueWidth = cellValue.length;
        if (width > valueWidth) {
            const spaceWidth = width - valueWidth;
            const leftWidth = Math.round(spaceWidth * 0.5);
            cellValue = cellValue.padStart(leftWidth + valueWidth, ' ');
            return cellValue.padEnd(width, ' ');
        }
        return cellValue;
    }
    return cellValue.padEnd(width, ' ');
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
    //console.log(d);
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
            column.width = column.name.length + 3;
        }
        column.width = Math.max(column.width, 3);
        return column;
    });

    //header
    const headers = [];
    columns.forEach((column) => {
        headers.push(renderCell(column.name, column));
    });
    lines.push(renderLine(headers));

    const hyphens = [];
    columns.forEach((column) => {
        hyphens.push(renderHyphen(column));
    });
    lines.push(renderLine(hyphens));

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
        lines.push(renderLine(cells));
    });

    return lines.join(os.EOL);
};
