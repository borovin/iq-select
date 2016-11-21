# IQ Select

[![Build Status](https://travis-ci.org/borovin/iq-select.svg?branch=master)](https://travis-ci.org/borovin/iq-select)
[![codecov](https://codecov.io/gh/borovin/iq-select/branch/master/graph/badge.svg)](https://codecov.io/gh/borovin/iq-select)
[![bitHound Overall Score](https://www.bithound.io/github/borovin/iq-select/badges/score.svg)](https://www.bithound.io/github/borovin/iq-select)

React alternative to native html select element

## Install

```
npm install borovin/iq-select
```

## Usage

```
import IQSelect from 'iq-select';

const options = {
    "EN": "English",
    "RU": "Russian",
    "GE": "German",
    "FR": "French"
};
const select = <IQSelect name="lang" value="RU" label="Choose language" options={options} />
```

This module uses es6/jsx/stylus features in source files. You need to configure your module bundler to work with them.

### Properties

`name` Select name

`value` Select default value

`label` Select floating label

`options` Select options. Plain JS object. Object keys are possible values for select, object values are select options text.

`onChange` Select change handler. Executes when select value is changed.