import React, {forwardRef} from 'react';
import {useColorScheme} from 'react-native';
import {Icon} from 'react-native-elements';
import {helpers} from 'configs/themes';

const CBIcon = (props, ref) => {
    const scheme = useColorScheme();
    const iconColor = helpers(props.define, scheme);
    return <Icon ref={ref} {...props} color={props.color || iconColor}/>;
};

export default forwardRef(CBIcon);

