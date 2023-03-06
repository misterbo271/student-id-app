import React, {forwardRef} from 'react';
import {TouchableOpacity, useColorScheme} from 'react-native';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBRound = ({style, define, children, onPress}, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(define, scheme);
    return (
        <TouchableOpacity ref={ref} style={[appStyles.round, style, viewStyle]} onPress={onPress}>
            {children}
        </TouchableOpacity>
    );
};

export default forwardRef(CBRound);
