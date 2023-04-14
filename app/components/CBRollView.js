import React, {forwardRef, useImperativeHandle, useRef} from 'react';
import {ScrollView} from 'react-native';

const CBRollView = (props, ref) => {
    useImperativeHandle(ref, () => ({
        scrollToOffset
    }));
    const scrollView = useRef(null);
    const scrollToOffset = (offset) => {
        scrollView.current.scrollTo({x: offset, animated: true});
    };
    return (
        <ScrollView ref={scrollView} {...props}/>
    );
};

export default forwardRef(CBRollView);