import React, {forwardRef} from 'react';
import {ScrollView, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBScrollView = (props, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <ScrollView ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBScrollView);

