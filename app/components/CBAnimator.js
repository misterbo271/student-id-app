import React, {forwardRef} from 'react';
import LottieView from 'lottie-react-native';

const CBAnimator = ({style, enable, source, progress, speed, duration, loop, autoPlay, onAnimationFinish}, ref) => {
    if (!enable) return null;
    return (
        <LottieView
            ref={ref}
            style={style}
            source={source}
            progress={progress}
            speed={speed}
            duration={duration}
            loop={loop}
            autoPlay={autoPlay}
            onAnimationFinish={onAnimationFinish}
        />
    );
};

export default forwardRef(CBAnimator);
