import React from "react";
import JoyRide from "react-joyride";

// Tour steps
const TOUR_STEPS = [
    {
        target: "#pipelines",
        content: "This is the pipelines",
    },
    {
        target: "#runs",
        content: "this is the runs",
    },
    {
        target: "#stack",
        content: "this is the stack",
    },
    {
        target: "#stack-component",
        content: "this is the stack components",
    },

    {
        target: "#documentation",
        content: "This is the documentation",
    },
    {
        target: "#example",
        content: "this is the example",
    },
    {
        target: "#report",
        content: "this is the report",
    },
    {
        target: "#settings",
        content: "this is the settings",
    },
];

// Tour component
const Tour = () => {
    return (
        <JoyRide
            steps={TOUR_STEPS}
            hideCloseButton
            continuous
            showSkipButton
            showProgress
            styles={{
                options: {
                    primaryColor: '#fff',
                    zIndex: 1000,
                }
            }}
        />
    );
};
export default Tour;