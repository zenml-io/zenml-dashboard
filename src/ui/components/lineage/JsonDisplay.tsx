import React from 'react';

function printNestedJson(obj: any) {
    console.log("ARRAY_12", obj)

    let output = '';
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            output += `<p style="color:#443E99; font-size:25px; font-weight:600; border-bottom: 1px solid #00000050 ">${key}</p>`;
            output += printNestedJson(obj[key]);
        } else if (Array.isArray(obj[key])) {
            output += `<p style="color:blue; font-size:20px; font-weight:400 ">${key}</p>`;
            obj[key].forEach((item: any) => output += printNestedJson(item)); //eslint-disable-line
        } else {
            output += `<div>
                        <span>
                            <strong style='color:#565e5e; font-size:20px'>
                                ${key}
                            </strong>
                        </span> 
                        : 
                        <span style='color:#1dc2a6; font-size:20px;'>
                        ${obj[key]}
                        <span>
                    </div>`;
            // output += `<p style="color:green; font-size:14px; font-weight:200 ">${key}: ${obj[key]}</p>`;
        }
    }
    return output;
}

// React component to display nested JSON object
export default function JsonDisplay({ data }: any) {
    const json = printNestedJson(data)
    const string = JSON.stringify(json)
    console.log({ string })
    return (
        <div dangerouslySetInnerHTML={{ __html: printNestedJson(data) }} style={{ overflow: 'auto', maxHeight: '90vh', width: "100%", margin: 20 }} />
    );
}