# markdown-grid
> Markdown Grid Generator

## Install
```sh
npm i markdown-grid
```

## Usage

```sh  
const MG = require("markdown-grid");
const mg = MG({
    "columns": ["", "Name", "Value"],
    "rows": [
        [1, "Tom", "Value 1"],
        [2, "Jerry", "Value 2"]
    ]
});

console.log(mg);  

|   |Name|Value|
|---|----|-----|
|1  |Tom |Value 1|
|2  |Jerry|Value 2|  
```  
|   |Name|Value|
|---|----|-----|
|1  |Tom |Value 1|
|2  |Jerry|Value 2|  
## With column width:  
```sh  
const MG = require("markdown-grid");
const mg = MG({
    "columns": ["", {
        "name": "Name",
        "width": 15
    }, {
        "name": "Value",
        "width": 35
    }],
    "rows": [
        [1, "Hello", "Long Text Value"],
        [2, "Hello There", "Long Text Value Long Text Value"]
    ]
});

console.log(mg);  

|   |Name           |Value                              |
|---|---------------|-----------------------------------|
|1  |Hello          |Long Text Value                    |
|2  |Hello There    |Long Text Value Long Text Value    |  
```  
|   |Name           |Value                              |
|---|---------------|-----------------------------------|
|1  |Hello          |Long Text Value                    |
|2  |Hello There    |Long Text Value Long Text Value    |  
## With column align and padding:  
```sh  
const MG = require("markdown-grid");
const mg = MG({
    "options": {
        "padding": 1
    },
    "columns": [{
        "id": "default",
        "name": "Default",
        "width": 10
    }, {
        "id": "left",
        "name": "Left",
        "width": 10,
        "align": "left"
    }, {
        "id": "center",
        "name": "Center",
        "width": 10,
        "align": "center"
    }, {
        "id": "right",
        "name": "Right",
        "width": 10,
        "align": "right"
    }],
    "rows": [{
        "default": "Cell",
        "left": "Markdown",
        "center": "Start",
        "right": "123.0"
    }, {
        "default": "Content",
        "left": "Grid",
        "center": "Complete",
        "right": "8.1"
    }]
});

console.log(mg);  

| Default    | Left       |   Center   |      Right |
| ---------- | :--------- | :--------: | ---------: |
| Cell       | Markdown   |    Start   |      123.0 |
| Content    | Grid       |  Complete  |        8.1 |  
```  
| Default    | Left       |   Center   |      Right |
| ---------- | :--------- | :--------: | ---------: |
| Cell       | Markdown   |    Start   |      123.0 |
| Content    | Grid       |  Complete  |        8.1 |  
## With special character:  
```sh  
const MG = require("markdown-grid");
const mg = MG({
    "columns": [{
        "name": "Name",
        "width": 15
    }, {
        "name": "Character",
        "align": "center"
    }],
    "rows": [
        ["Backtick", "`"],
        ["Pipe", "|"],
        ["Escaped Pipes", "\\||\\|"],
        ["中文", "✅"]
    ]
});

console.log(mg);  

|Name           |Character|
|---------------|:-------:|
|Backtick       |    `    |
|Pipe           |    \|   |
|Escaped Pipes  |  \|\|\| |
|中文           |    ✅   |  
```  
|Name           |Character|
|---------------|:-------:|
|Backtick       |    `    |
|Pipe           |    \|   |
|Escaped Pipes  |  \|\|\| |
|中文           |    ✅   |  
## With links, images, Codes and formatting:  
```sh  
const MG = require("markdown-grid");
const mg = MG({
    "columns": ["Name", "Version", "Install", "Description"],
    "rows": [
        ["[markdown-grid](https://github.com/cenfun/markdown-grid)", "![npm](https://badgen.net/npm/v/markdown-grid)", "`npm i markdown-grid`", "Generating a **Markdown** *Grid*"],
        ["[console-grid](https://github.com/cenfun/console-grid)", "![npm](https://badgen.net/npm/v/console-grid)", "`npm i console-grid`", "Log a *Grid* in **Console**"]
    ]
});

console.log(mg);  

|Name|Version|Install|Description|
|----|-------|-------|-----------|
|[markdown-grid](https://github.com/cenfun/markdown-grid)|![npm](https://badgen.net/npm/v/markdown-grid)|`npm i markdown-grid`|Generating a **Markdown** *Grid*|
|[console-grid](https://github.com/cenfun/console-grid)|![npm](https://badgen.net/npm/v/console-grid)|`npm i console-grid`|Log a *Grid* in **Console**|  
```  
|Name|Version|Install|Description|
|----|-------|-------|-----------|
|[markdown-grid](https://github.com/cenfun/markdown-grid)|![npm](https://badgen.net/npm/v/markdown-grid)|`npm i markdown-grid`|Generating a **Markdown** *Grid*|
|[console-grid](https://github.com/cenfun/console-grid)|![npm](https://badgen.net/npm/v/console-grid)|`npm i console-grid`|Log a *Grid* in **Console**|

