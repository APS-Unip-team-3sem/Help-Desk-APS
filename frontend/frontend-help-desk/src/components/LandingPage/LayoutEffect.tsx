import React from "react";
import { useInView } from "react-intersection-observer";

interface LayoutEffectProps {
    children: React.ReactElement;
    className?: string;
    isInviewState: {
        trueState?: string;
        falseState?: string;
    };
}

const LayoutEffect: React.FC<LayoutEffectProps> = ({ children, className, isInviewState }) => {
    const { ref, inView } = useInView({ triggerOnce: true });

    return React.cloneElement(children, {
        ref,
        className: `${children.props.className || ""} ${className || ""} ${inView ? isInviewState.trueState : isInviewState.falseState}`
    });
};

export default LayoutEffect;