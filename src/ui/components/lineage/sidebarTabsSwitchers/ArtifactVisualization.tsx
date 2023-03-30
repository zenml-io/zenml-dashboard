import React, 
{ 
  // useEffect, 
  // useState 
} from 'react' //eslint-disable-line
// import { useSelector } from 'react-redux';
// import { sessionSelectors } from '../../../../redux/selectors';


// **************** WORK IN PROGRESS, DONT REMOVE COMMENTS**********************


// import { artifactHtml } from './artifactVisualizationService';
import style from './ArtifactVisualization.module.scss';
// import { FullWidthSpinner } from '../../spinners';
// import {html} from './test'

// const ArtifactVisualization = ({ artifactId }: { artifactId: any }) => {
const ArtifactVisualization = ({ artifactId }: { artifactId: any }) => {

  // const [response, setResponse] = useState<any | undefined>(null)
  // const [current, setCurrent] = useState<any | undefined>(null)
  // const authToken = useSelector(sessionSelectors.authenticationToken);


  // if(response !== current)
  // {
  //   setResponse(null);
  //   console.log({response, current})
  //   if (response == null) {
  //     artifactHtml(artifactId, authToken).then((res) => {
  //       setResponse(res)
  //       setCurrent(response);
  //       console.log("__UNAUTH_HTML ", response)
  //     });
  //   }
  // }

  // useEffect(()=>{
  //   console.log("CHANGED")
  // },[current])

  // if (response == null) {
  //   return <FullWidthSpinner color="black" size="md" />;
  // }

  
const html = `<p>this is the visualization</p>`

  return (
    <div className={`${style.mainContainer}`}>
      {/* {response.data.type === "html" ?  */}
      <div dangerouslySetInnerHTML={{ __html: html }}  /> 
       {/* : "" } */}
    </div>
  )
}

export default ArtifactVisualization
