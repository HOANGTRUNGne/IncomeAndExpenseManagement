import * as React from "react";
import Icon from "@ant-design/icons";
const SVGComponent = (props) => (
    <svg  viewBox="0 0 64 64"  xmlns="http://www.w3.org/2000/svg"><path d="M58 54H6a2 2 0 0 1-2-2V12a2 2 0 0 1 2-2h52a2 2 0 0 1 2 2v40a2 2 0 0 1-2 2z" fill="#fafafa"/><path d="M50 20a4 4 0 1 1-4-4 4 4 0 0 1 4 4zM5.109 52.425l17.064-24.25a1 1 0 0 1 1.642.01L34 43l8.194-10.925a1 1 0 0 1 1.604.005l15.023 20.326A1.006 1.006 0 0 1 58 54H5.926a1 1 0 0 1-.817-1.575z" fill="#e0e0e0"/><path d="M58 9H6a3.003 3.003 0 0 0-3 3v40a3.003 3.003 0 0 0 3 3h52a3.003 3.003 0 0 0 3-3V12a3.003 3.003 0 0 0-3-3zM6.216 53l16.768-24.22L39.131 53zm35.32 0-6.488-9.731 7.94-10.586L57.764 53zM59 51.3 44.605 31.507a1.978 1.978 0 0 0-1.602-.823l-.016-.001a1.98 1.98 0 0 0-1.6.8l-7.515 10.022-9.224-13.835a1.996 1.996 0 0 0-1.645-.89 2.06 2.06 0 0 0-1.663.86L5 51.244V12a1.001 1.001 0 0 1 1-1h52a1.001 1.001 0 0 1 1 1zM46 15a5 5 0 1 0 5 5 5.006 5.006 0 0 0-5-5zm0 8a3 3 0 1 1 3-3 3.003 3.003 0 0 1-3 3z" fill="#9e9e9e"/></svg>
);

// eslint-disable-next-line react/display-name
export default (props) => <Icon component={SVGComponent} {...props} />
