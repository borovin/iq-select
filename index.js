import React from 'react';
import MobileDetect from 'mobile-detect';
import map from 'lodash/map';
import pickBy from 'lodash/pickBy';
import toPairs from 'lodash/toPairs';
import fromPairs from 'lodash/fromPairs';
import sortBy from 'lodash/sortBy';
import isEmpty from 'lodash/isEmpty';
import Option from './option';
import './styles.styl';

function optionClickHandler(value) {
    this.value = value;
}

function selectHandler(e) {
    this.value = e.target.value;
}

function inputHandler(e) {
    switch (e.key) {
        case 'Escape':
            this.textInput.blur();
            break;
        default:
            this.setState({
                query: e.target.value
            });
    }
}

function focusHandler() {
    const component = this;

    this.setState({
        focus: true,
        openTo: calculateDropdownPosition.call(component)
    });
}

function blurHandler() {
    this.textInput.value = '';
    this.setState({
        focus: false,
        query: ''
    });
}

function calculateDropdownPosition(){
    const viewportHeight = Math.max(document.documentElement.clientHeight, window.innerHeight || 0);
    const componentTopPosition = this.rootElement.getBoundingClientRect().top;
    const componentBottomPosition = viewportHeight - this.rootElement.getBoundingClientRect().bottom;

    if (componentBottomPosition < 400 && componentTopPosition > 400){
        return 'top';
    }

    return 'bottom';
}

function renderOptions(native) {
    let options = pickBy(this.props.options, text => text.toLowerCase().indexOf(this.state.query.toLowerCase()) === 0);

    if (isEmpty(options)) {
        return <div className="IQSelect__nothingFound">Nothing found. Try another query.</div>
    }

    options = toPairs(options);
    options = sortBy(options, 1);
    options = fromPairs(options);

    if (native){
        return map(options, (text, key) => <option key={key} value={key}>{text}</option>);
    } else {
        return map(options, (text, key) => <Option key={key} value={key}>{text}</Option>);
    }
}

class IQSelect extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            value: props.value,
            focus: false,
            query: '',
            openTo: 'bottom'
        };
    }

    set value(value) {
        this.setState({value});
        this.props.onChange.call(this, value);
    }

    get value() {
        return this.state.value;
    }

    getChildContext() {
        const component = this;

        return {
            optionClickHandler: optionClickHandler.bind(component),
            query: component.state.query
        };
    }

    render() {
        const device = new MobileDetect(window.navigator.userAgent);
        const classList = [
            `IQSelect`,
            `IQSelect_hasValue_${!!this.state.value}`,
            `IQSelect_mobile_${!!device.mobile()}`,
            `IQSelect_focus_${this.state.focus}`,
            `IQSelect_openTo_${this.state.openTo}`,
            `${this.props.className}`
        ];
        return (
            <div className={classList.join(' ')} ref={(root) => { this.rootElement = root; }}>
                <div className="IQSelect__field">
                    <label className="IQSelect__label">
                        {this.props.label}
                    </label>
                    <div className="IQSelect__value">
                        {this.props.options[this.state.value]}
                    </div>
                    <input onBlur={blurHandler.bind(this)}
                           onFocus={focusHandler.bind(this)}
                           onKeyUp={inputHandler.bind(this)}
                           className="IQSelect__input"
                           ref={(input) => { this.textInput = input; }}
                           type="text"/>
                    <select className="IQSelect__nativeSelect"
                            value={this.state.value || '__default'}
                            name={this.props.name}
                            onChange={selectHandler.bind(this)}>
                        <option key='__default' value='__default' disabled hidden>{this.props.label}</option>
                        {renderOptions.call(this, true)}
                    </select>
                </div>
                <div className="IQSelect__dropdown">
                    {renderOptions.call(this)}
                </div>
            </div>
        );
    }
}

IQSelect.defaultProps = {
    label: 'default label',
    name: 'default name',
    value: '',
    options: {},
    onChange() {}
};

IQSelect.propTypes = {
    label: React.PropTypes.string,
    name: React.PropTypes.string,
    value: React.PropTypes.string,
    options: React.PropTypes.objectOf(React.PropTypes.string),
    onChange: React.PropTypes.func
};

IQSelect.childContextTypes = {
    optionClickHandler: React.PropTypes.func,
    query: React.PropTypes.string
};

export default IQSelect;