import * as React from "react";

declare global {
    interface Window {
        fbq?: (...args: unknown[]) => void;
    }

    namespace JSX {
        interface IntrinsicElements {
            "lord-icon": React.DetailedHTMLProps<
                React.HTMLAttributes<HTMLElement>,
                HTMLElement
            > & {
                src?: string;
                trigger?: string;
                colors?: string;
                state?: string;
                style?: React.CSSProperties;
            };
        }
    }
}
