import React, {forwardRef} from 'react';
import {useColorScheme} from 'react-native';
import {Menu, MenuItem} from 'react-native-enhanced-popup-menu';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';

const CBMenu = ({style, items = [], renderHeader, renderFooter}, ref) => {
    const scheme = useColorScheme();
    const menuStyle = helpers('menu', scheme);
    const textStyle = helpers('text', scheme);
    return (
        <Menu ref={ref} style={[style, menuStyle]}>
            {renderHeader ? renderHeader : null}
            {items.map((i, k) => <MenuItem key={k} textStyle={[appStyles.text, textStyle]} onPress={i.onPress}>{i.text}</MenuItem>)}
            {renderFooter ? renderFooter : null}
        </Menu>
    );
};

export default forwardRef(CBMenu);
