import React from 'react';

const Option = (props, context) =>
    <div data-value={props.value}
         onMouseDown={() => context.optionClickHandler(props.value)}
         className='IQSelect__option'>
        <span
            className="IQSelect__optionHighlight">{props.children.substring(0, context.query.length)}</span>{props.children.substring(context.query.length)}
    </div>;

Option.defaultProps = {
    value: 'Default value',
};

Option.propTypes = {
    value: React.PropTypes.string
};

Option.contextTypes = {
    optionClickHandler: React.PropTypes.func,
    query: React.PropTypes.string
};

export default Option;