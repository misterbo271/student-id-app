import React, {forwardRef} from 'react';
import {useColorScheme, View} from 'react-native';
import {helpers} from 'configs/themes';

const CBView = (props, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <View ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBView);

