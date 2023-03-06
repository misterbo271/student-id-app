import React, {forwardRef} from 'react';
import {FlatList, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBFlatList = (props, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <FlatList ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBFlatList);

