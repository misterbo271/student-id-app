import React, {forwardRef} from 'react';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBTouchableOpacity = (props, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <TouchableOpacity ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBTouchableOpacity);

