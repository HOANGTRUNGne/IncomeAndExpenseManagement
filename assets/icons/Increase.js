import * as React from "react";
import Icon from "@ant-design/icons";

const SVGComponent = (props) => (
    <svg

        viewBox="0 0 512 512"
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="M63.633 422 0 358.367l192.869-192.884 90 90 103.916-103.945-30.439-30.425L512 90l-31.113 155.596-30.469-30.425-167.549 167.578-90-90z"
            fill="#8cd96b"
        />
        <path
            d="M386.785 151.538 282.869 255.483l-27.012-27.011v127.265l27.012 27.012 167.549-167.578 30.469 30.425L512 90l-155.654 31.113z"
            fill="#5ab267"
        />
    </svg>
);

// eslint-disable-next-line react/display-name
export default (props) => <Icon component={SVGComponent} {...props} />
