import React from "react";
import JoyRide from "react-joyride";

// Tour steps
const TOUR_STEPS = [
    {
        target: "#change",
        content: "change you username",
    },
    {
        target: "#pwReset",
        content: "change you password",
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