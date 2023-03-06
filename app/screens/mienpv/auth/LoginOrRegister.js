import React from 'react';
import LoginOrRegisterContent from 'screens/mienpv/auth/content/LoginOrRegisterContent';

import Base from 'screens/Base';

export default class LoginOrRegister extends Base {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        super.componentDidMount();
    }

    componentWillUnmount() {
        super.componentWillUnmount();
    }

    render() {
        return (
            <LoginOrRegisterContent/>
        );
    }
}
