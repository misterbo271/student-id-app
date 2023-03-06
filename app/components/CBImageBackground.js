import React, {forwardRef} from 'react';
import {ImageBackground, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBImageBackground = (props, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <ImageBackground ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBImageBackground);

