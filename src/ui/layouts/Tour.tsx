import React, { useState, useEffect } from "react";
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
            run={run}
            hideCloseButton
            continuous
            showSkipButton
            hideBackButton={false}
            showProgress
            styles={{
                options: { primaryColor: '#fff', zIndex: 1000, textColor: '#004a14', width: 380 },
                buttonNext: { outline: 'none', backgroundColor: '#431D93',  color: "#fff", fontSize: "1.6rem", height: '4rem', borderRadius: '4px', padding: '0 3.2rem' },
                buttonSkip: { backgroundColor: '#fff',  color: "#424240", border: '1px solid #424240',  fontSize: "1.6rem", height: '4rem', borderRadius: '4px', padding: '0 3.2rem',  marginLeft: '50%' }
            }}
        />
    );
};
export default Tour;