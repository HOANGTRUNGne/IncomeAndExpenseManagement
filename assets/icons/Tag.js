import * as React from "react";
import Icon from "@ant-design/icons";
const SVGComponent = (props) => (
    <svg
        height={512}
        viewBox="0 0 24 24"
        width={512}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <g data-name="Layer 2">
            <path d="M11.45 22.78a1.74 1.74 0 0 1-1.24-.51l-8.48-8.48a1.76 1.76 0 0 1 0-2.48L11 2a1.77 1.77 0 0 1 1.13-.51l5.18-.3a1.75 1.75 0 0 1 1.34.51l3.61 3.61a1.75 1.75 0 0 1 .51 1.34l-.3 5.18A1.77 1.77 0 0 1 22 13l-9.28 9.28a1.74 1.74 0 0 1-1.27.5zm6-20.06L12.23 3a.25.25 0 0 0-.16.08l-9.28 9.29a.25.25 0 0 0 0 .36l8.48 8.48a.25.25 0 0 0 .36 0l9.28-9.28a.29.29 0 0 0 .07-.16l.3-5.18a.23.23 0 0 0-.07-.19L17.6 2.79a.22.22 0 0 0-.17-.07z" />
            <path d="M16.75 9.5a2.26 2.26 0 0 1-1.59-3.85 2.31 2.31 0 0 1 3.19 0 2.28 2.28 0 0 1 0 3.19 2.27 2.27 0 0 1-1.6.66zm0-3a.76.76 0 0 0-.53.21.75.75 0 0 0 1.06 1.07.76.76 0 0 0 .21-.53.72.72 0 0 0-.21-.53.73.73 0 0 0-.53-.22zm-8.13 6.8a.74.74 0 0 1-.53-.22.75.75 0 0 1 0-1.06l2.83-2.83A.75.75 0 0 1 12 10.25l-2.85 2.83a.73.73 0 0 1-.53.22zm2.83 2.83a.79.79 0 0 1-.53-.22.75.75 0 0 1 0-1.06L13.75 12a.75.75 0 0 1 1.06 1.06L12 15.91a.77.77 0 0 1-.55.22z" />
        </g>
    </svg>
);

// eslint-disable-next-line react/display-name
export default (props) => <Icon component={SVGComponent} {...props} />