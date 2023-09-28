import React from "react";

interface IProps {
    width: string,
    height: string
}

function Loading({ width, height }: IProps) {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            style={{ position: 'fixed', background: "none", alignSelf: 'center', marginTop: 50 }}
            width={width}
            height={height}
            display="block"
            preserveAspectRatio="xMidYMid"
            viewBox="0 0 100 100"
        >
            <circle
                cx="50"
                cy="50"
                r="32"
                fill="none"
                stroke="#26b900"
                strokeDasharray="50.26548245743669 50.26548245743669"
                strokeLinecap="round"
                strokeWidth="8"
            >
                <animateTransform
                    attributeName="transform"
                    dur="1s"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 50 50;360 50 50"
                ></animateTransform>
            </circle>
            <circle
                cx="50"
                cy="50"
                r="23"
                fill="none"
                stroke="#a1fe90"
                strokeDasharray="36.12831551628262 36.12831551628262"
                strokeDashoffset="36.128"
                strokeLinecap="round"
                strokeWidth="8"
            >
                <animateTransform
                    attributeName="transform"
                    dur="1s"
                    keyTimes="0;1"
                    repeatCount="indefinite"
                    type="rotate"
                    values="0 50 50;-360 50 50"
                ></animateTransform>
            </circle>
        </svg>
    );
}

export default Loading;