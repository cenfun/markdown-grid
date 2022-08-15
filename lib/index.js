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


module.exports = function(d) {
    //console.log(d);
    const lines = [];

    //init columns
    const columns = d.columns.map((item) => {
        const c = {
            ... item
        };
        const cn = `${c.name}`;
        if (!isNum(c.width)) {
            c.width = cn.length + 2;
        }
        c.width = Math.max(c.width, 3);
        return c;
    });

    //header
    const header = [''];
    columns.forEach((c) => {
        header.push(c.name.padEnd(c.width, ' '));
    });

    lines.push(header.join('|'));

    const line = [''];
    columns.forEach((c) => {
        if (c.align === 'right') {
            line.push(`${''.padEnd(c.width - 1, '-')}:`);
        } else {
            line.push(''.padEnd(c.width, '-'));
        }

    });
    lines.push(line.join('|'));

    //rows
    d.rows.forEach((r) => {
        const row = [''];
        columns.forEach((c, i) => {
            const s = `${r[c.id]}`;
            if (c.align === 'right') {
                row.push(s.padStart(c.width, ' '));
            } else {
                row.push(s.padEnd(c.width, ' '));
            }
        });
        lines.push(row.join('|'));
    });

    return lines.join(os.EOL);
};
