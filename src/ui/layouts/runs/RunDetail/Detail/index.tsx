import React from 'react';

import {

  FlexBox,

} from '../../../../components';

import { useService } from './useService';

// import { NonEditableRunConfig } from '../../../NonEditableRunConfig';

function printNestedJson(obj: any) {
  let output = '';
  for (let key in obj) {
      if (typeof obj[key] === 'object' && obj[key] !== null) {
          output += `<p style="color:#443E99; font-size:18px; font-weight:600 ">${key}</p>`;
          output += printNestedJson(obj[key]);
      } else if (Array.isArray(obj[key])) {
          output += `<p style="color:blue; font-size:16px; font-weight:400 ">${key}</p>`;
          obj[key].forEach((item: any) => output += printNestedJson(item)); //eslint-disable-line
      } else {
          output += `<div><span><strong style='color:#565e5e; font-size:14px'>${key}</strong><span> : <span style='color:#1dc2a6; font-size:14px'>${obj[key]}<span></p>`;
          // output += `<p style="color:green; font-size:14px; font-weight:200 ">${key}: ${obj[key]}</p>`;
      }
  }
  return output;
}

// React component to display nested JSON object
function JsonDisplay({ data }: any) {
  const json = printNestedJson(data)
  const string = JSON.stringify(json)
  console.log({ string })
  return (
      <div dangerouslySetInnerHTML={{ __html: printNestedJson(data) }} style={{ overflow: 'auto', maxHeight: '80%', margin: 20 }} />
  );
}

export const Details: React.FC<{ runId: TId }> = ({ runId }) => {
  const { run } = useService({ runId });
  
  const artifact:any = localStorage.getItem("__ARTIFACT");
  const step:any = localStorage.getItem("__STEP");
  
  if(artifact == null && step == null) return <></>
  // console.log({data})
  console.log({run})

  return (
    <FlexBox.Column fullWidth>
      {/* <JsonDisplay data={JSON.parse(step)}/> */}
    </FlexBox.Column>
  );
};
