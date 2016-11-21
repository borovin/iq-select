# IQ Select

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

### Properties

`name` Select name

`value` Select default value

`label` Select floating label

`options` Select options. Plain JS object. Object keys are possible values for select, object values are select options text.

`onChange` Select change handler. Executes when select value is changed.