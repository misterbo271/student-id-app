import React, {forwardRef} from 'react';
import {SectionList, useColorScheme} from 'react-native';
import {helpers} from 'configs/themes';

const CBSectionList = (props, ref) => {
    const scheme = useColorScheme();
    const viewStyle = helpers(props.define, scheme);
    return (
        <SectionList ref={ref} {...props} style={[props.style, viewStyle]}/>
    );
};

export default forwardRef(CBSectionList);

