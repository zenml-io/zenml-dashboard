import React, { useState, useEffect } from "react";
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

    const [run, setRun] = useState(true)

    const node = document.querySelector('[title="Skip"]');
    // eslint-disable-next-line
    const skipTour = () => localStorage.setItem('runTour', 'false')
    node?.addEventListener("click", skipTour);

    useEffect(() => {
        // eslint-disable-next-line
        if (localStorage.getItem('runTour') == 'false') {
            setRun(false)
        } else {
                setRun(true)
        }  
    }, [skipTour])

    return (
            <JoyRide
                steps={TOUR_STEPS}
                hideCloseButton
                run={run}
                continuous
                showSkipButton
                showProgress
                styles={{
                    options: {
                      primaryColor: '#433E99',
                      zIndex: 1000,
                    }
                  }}
            />
    );
};
export default Tour;