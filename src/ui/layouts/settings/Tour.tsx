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
                    options: { primaryColor: '#fff', zIndex: 1000, textColor: '#004a14', width: 380 },
                    buttonNext: { outline: 'none', backgroundColor: '#431D93',  color: "#fff", fontFamily: 'Rubik', fontSize: "1.6rem", height: '4rem', borderRadius: '4px', padding: '0 3.2rem' },
                    buttonSkip: { backgroundColor: '#fff',  color: "#424240", border: '1px solid #424240', fontFamily: 'Rubik', fontSize: "1.6rem", height: '4rem', borderRadius: '4px', padding: '0 3.2rem',  marginLeft: '50%' }    
                  }}
            />
    );
};
export default Tour;