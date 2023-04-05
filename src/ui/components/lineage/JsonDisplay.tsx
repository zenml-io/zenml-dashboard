import React from 'react';

function printNestedJson(obj: any) {

    let output = '';
    for (let key in obj) {
        if (typeof obj[key] === 'object' && obj[key] !== null) {
            output += `<p style="color:#443E99; font-size:20px; font-weight:800; border-bottom: 0.5px solid #00000040; text-align: left ">${key}</p>`;
            output += printNestedJson(obj[key]);
        } else if (Array.isArray(obj[key])) {
            output += `<p style="color:blue; font-size:20px; font-weight:400; text-align: left ">${key}</p>`;
            obj[key].forEach((item: any) => output += printNestedJson(item)); //eslint-disable-line
        } else {
            output += `<div style="display:flex; justify-content:flex-start; padding-top:10px">
                        <span style='color:#565e5e; font-size:18px; font-weight:600; text-align: left'>
                                ${key} : &nbsp;
                        </span> 
                        <span style='color:#443E99; font-size:16px; font-weight:600; text-align: left'>
                        ${obj[key]}
                        <span>
                    </div>`;
        }
    }
    return output;
}


export default function JsonDisplay({ data, styles }: any) {

    return (
        <div dangerouslySetInnerHTML={{ __html: printNestedJson(data) }} style={styles} />
    );
}