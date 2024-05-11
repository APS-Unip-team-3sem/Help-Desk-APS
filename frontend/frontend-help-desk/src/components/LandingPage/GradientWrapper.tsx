import React, { ReactNode, HTMLAttributes } from 'react';

interface GradientWrapperProps extends HTMLAttributes<HTMLDivElement> {
    wrapperClassName?: string;
    children: ReactNode;
}

const GradientWrapper: React.FC<GradientWrapperProps> = ({ children, wrapperClassName, ...props }) => (
    <div
        {...props}
        className={`relative ${props.className || ""}`}
    >
        <div className={`absolute m-auto blur-[160px] ${wrapperClassName || ""}`}
            style={{
                background:
                    "linear-gradient(180deg, #7C3AED 0%, rgba(152, 103, 240, 0.984375) 0.01%, rgba(237, 78, 80, 0.2) 100%)",
            }}
        >
        </div>
        <div className="relative">
            {children}
        </div>
    </div>
);

export default GradientWrapper;