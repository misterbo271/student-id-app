import React, {forwardRef} from 'react';
import {Text, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBText = (props, ref) => {
    const scheme = useColorScheme();
    const textStyle = helpers(props.define, scheme);
    return (
        <Text ref={ref} {...props} style={[props.style, textStyle]}/>
    );
};

export default forwardRef(CBText);

