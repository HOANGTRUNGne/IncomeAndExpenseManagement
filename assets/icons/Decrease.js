import * as React from "react";
import Icon from "@ant-design/icons";

const SVGComponent = (props) => (
    <svg
        height={512}
        viewBox="0 0 512 512"
        width={512}
        xmlns="http://www.w3.org/2000/svg"
        {...props}
    >
        <path
            d="m512 422-155.654-31.113 30.439-30.425-103.916-103.945-90 90L0 153.633 63.633 90l129.236 129.251 90-90 167.549 167.578 30.469-30.425z"
            fill="#ff5959"
        />
        <path
            d="M450.418 296.829 282.869 129.251l-27.012 27.012v127.265l27.012-27.011 103.916 103.945-30.439 30.425L512 422l-31.113-155.596z"
            fill="#e63a57"
        />
    </svg>
);

// eslint-disable-next-line react/display-name
export default (props) => <Icon component={SVGComponent} {...props} />
