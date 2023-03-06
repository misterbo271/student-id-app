import React, {forwardRef} from 'react';
import {useColorScheme, View} from 'react-native';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBShadow = ({style, children}, ref) => {
    const scheme = useColorScheme();
    const shadowStyle = helpers('shadow', scheme);
    return (
        <View ref={ref} style={[appStyles.shadow, style, shadowStyle]}>
            {children}
        </View>
    );
};

export default forwardRef(CBShadow);

