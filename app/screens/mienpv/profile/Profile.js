import React from 'react';
import {CBContainer, CBText} from 'components';
import {appStyles} from 'configs/styles';

import Base from 'screens/Base';

export default class Profile extends Base {

    render() {
        return (
            <CBContainer style={{alignItems: 'center', justifyContent: 'center'}}>
                <CBText style={appStyles.text} define={'text'}>{'Profile'}</CBText>
            </CBContainer>
        );
    }
}
