import React, {PureComponent} from 'react';
import {Text, TextInput, TouchableOpacity, View} from 'react-native';
import PropTypes from 'prop-types';
import {Icon, ThemeContext} from 'react-native-elements';
import {appStyles} from 'configs/styles';
import {helpers} from 'configs/themes';
import dimens from "configs/dimens";

export default class CBBoxInput extends PureComponent {

    static contextType = ThemeContext;

    static propTypes = {
        onAction: PropTypes.func,
        action: PropTypes.string,
        disabled: PropTypes.bool,
        header: PropTypes.bool,
        title: PropTypes.string,
        icon: PropTypes.node,
        label: PropTypes.string,
        clearable: PropTypes.bool,
        renderInput: PropTypes.node,
        renderPredicate: PropTypes.node,
        renderAction: PropTypes.node,
        error: PropTypes.string,
        isRequired: PropTypes.bool
    };

    static defaultProps = {
        disabled: false,
        header: false,
        title: '',
        clearable: true,
        isRequired: false
    };

    constructor(props) {
        super(props);
        this.textInput = React.createRef();
        this.state = {
            value: '',
            hasFocus: false
        };
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.value !== prevState.value) {
            return {
                value: nextProps.value
            };
        }
        return null;
    }

    focus() {
        this.textInput.current.blur(); // Hot fix android 9.0
        this.textInput.current.focus();
    }

    blur() {
        this.textInput.current.blur();
    }

    isFocused() {
        const {hasFocus} = this.state;
        return hasFocus;
    }

    onChangeText = (value) => {
        const {onChangeText} = this.props;
        if (onChangeText && typeof onChangeText === 'function') {
            onChangeText(value);
        }
    };

    onFocus = () => {
        this.setState({
            hasFocus: true
        }, () => {
            const {onFocus} = this.props;
            if (onFocus && typeof onFocus === 'function') {
                onFocus();
            }
        });
    };

    onBlur = () => {
        this.setState({
            hasFocus: false
        }, () => {
            const {onBlur} = this.props;
            if (onBlur && typeof onBlur === 'function') {
                onBlur();
            }
        });
    };

    onSubmitEditing = (e) => {
        const {action, onAction, onSubmitEditing} = this.props;
        if (action && onAction && typeof onAction === 'function') {
            onAction(action);
        }
        if (onSubmitEditing && typeof onSubmitEditing === 'function') {
            onSubmitEditing(e);
        }
    };

    onClear = () => {
        this.onChangeText('');
    };

    render() {
        const {theme} = this.context;
        const headingStyle = helpers('heading', theme.colors.scheme);
        const boxStyle = helpers('box', theme.colors.scheme);
        const textStyle = helpers('text', theme.colors.scheme);
        const inputStyle = helpers('input', theme.colors.scheme);
        const errorStyle = helpers('error', theme.colors.scheme);
        const {style, containerStyle, disabled, inputStyle: inputContainerStyle, header, title, icon, label, clearable, renderInput, renderPredicate, renderAction, error, isRequired} = this.props;
        const {value, hasFocus} = this.state;
        const isChecked = value && value.length > 0;
        return (
            <View style={style}>
                <View style={appStyles.row}>
                    {title && title.length > 0 ? <Text style={[appStyles.heading, {flex: 1, minHeight: 18, fontSize: dimens.normalText}, headingStyle]}>
                        {header || isChecked ? title : ''}
                        {isRequired ? <Text style={[appStyles.heading, {color: theme.colors.badge}]}>{' *'}</Text> : null}
                    </Text> : null}
                    {renderAction ? renderAction : null}
                </View>
                <View style={[appStyles.box, appStyles.lonely, boxStyle, containerStyle, {justifyContent: 'space-between', borderColor: hasFocus ? theme.colors.primary : theme.colors.divider}]}>
                    {icon ? icon : null}
                    {label && label.length > 0 ? <Text style={[appStyles.text, {alignSelf: 'center', marginRight: 10}, textStyle]}>{label}</Text> : null}
                    {!renderInput ? <TextInput
                        ref={this.textInput}
                        {...this.props}
                        style={[appStyles.input, appStyles.single, disabled && {opacity: 0.3}, inputStyle, inputContainerStyle]}
                        underlineColorAndroid={'transparent'}
                        numberOfLines={5}
                        ellipsizeMode={'tail'}
                        placeholderTextColor={theme.colors.grey3}
                        value={value}
                        onChangeText={this.onChangeText}
                        onFocus={this.onFocus}
                        onBlur={this.onBlur}
                        onSubmitEditing={this.onSubmitEditing}/> : renderInput}
                    {renderPredicate ? renderPredicate : null}
                    {value && value.length > 0 && clearable ? <TouchableOpacity style={[appStyles.action, {width: 35}]} onPress={this.onClear}>
                        <Icon type={'ionicon'} name={'close-circle'} color={theme.colors.hide} size={20}/>
                    </TouchableOpacity> : null}
                </View>
                {error && error.length > 0 ? <Text style={[appStyles.error, {marginTop: 5}, errorStyle]}>{error}</Text> : null}
            </View>
        );
    }
}
