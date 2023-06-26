import * as React from "react";
import Icon from "@ant-design/icons";

const SVGComponent = (props) => (
    <svg viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <g clip-rule="evenodd" fill-rule="evenodd">
            <path d="M256 0C114.8 0 0 114.8 0 256s114.8 256 256 256 256-114.8 256-256S397.2 0 256 0z" fill="#4bae4f"/>
            <path
                d="M379.8 169.7c6.2 6.2 6.2 16.4 0 22.6l-150 150c-3.1 3.1-7.2 4.7-11.3 4.7s-8.2-1.6-11.3-4.7l-75-75c-6.2-6.2-6.2-16.4 0-22.6s16.4-6.2 22.6 0l63.7 63.7 138.7-138.7c6.2-6.3 16.4-6.3 22.6 0z"
                fill="#fff"/>
        </g>
    </svg>
);

// eslint-disable-next-line react/display-name
export default (props) => <Icon component={SVGComponent} {...props} />
