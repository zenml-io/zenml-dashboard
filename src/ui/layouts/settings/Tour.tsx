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
                run={run}
                continuous
                showSkipButton
                showProgress
                hideBackButton={false}
                styles={{
                    options: { primaryColor: '#fff', zIndex: 1000, textColor: '#004a14' },
                    buttonNext: { outline: 'none', backgroundColor: '#431D93',  color: "#fff", fontFamily: 'Rubik', fontSize: "1.3rem", height: '3rem', borderRadius: '4px', padding: '0 2rem' },
                    buttonSkip: { backgroundColor: '#fff',  color: "#424240", border: '1px solid #424240', fontFamily: 'Rubik', fontSize: "1.3rem", height: '3rem', borderRadius: '4px', padding: '0 2rem' },
                    buttonBack: { color: '#000', fontFamily: 'Rubik', fontSize: "1.3rem", height: '3rem'}
                }}
            />
    );
};
export default Tour;