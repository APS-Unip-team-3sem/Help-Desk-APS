import React, { ReactNode, HTMLProps } from "react";

interface SectionWrapperProps extends HTMLProps<HTMLElement> {
    children: ReactNode;
}

const SectionWrapper = ({ children, ...props }: SectionWrapperProps): JSX.Element => (
    <section {...props} className={`py-16 lg:py-24 ${props.className || ""}`}>
        {children}
    </section>
);

export default SectionWrapper;