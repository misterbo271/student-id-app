import React, {forwardRef} from 'react';
import {TouchableWithoutFeedback, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBTouchableWithoutFeedback = (props, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <TouchableWithoutFeedback ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBTouchableWithoutFeedback);

