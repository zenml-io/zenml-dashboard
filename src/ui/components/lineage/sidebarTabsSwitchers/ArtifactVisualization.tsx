import React,
{
  useEffect,
  useState
} from 'react' //eslint-disable-line
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { okaidia } from 'react-syntax-highlighter/dist/esm/styles/prism';


// **************** WORK IN PROGRESS, DONT REMOVE COMMENTS**********************


// import { artifactService } from './artifactVisualizationService';
import { artifactHTML, artifactService } from '../../../layouts/runs/RunDetail/sidebarServices';
import style from './ArtifactVisualization.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ReactMarkdown from 'react-markdown';
// import {html} from './test'

// const ArtifactVisualization = ({ artifactId }: { artifactId: any }) => {
const ArtifactVisualization = ({ node }: { node: any }) => {

  const [response, setResponse] = useState<any | undefined>(null)
  const [current, setCurrent] = useState<any | undefined>(null)
  const [type, setType] = useState<string | undefined>('')
  const [flag, setFlag] = useState<boolean>(false)
  const authToken = useSelector(sessionSelectors.authenticationToken);

  console.log("__UNAUTH_HTML__", node)



  // if(response !== current)
  // {
  //   console.log("__UNAUTH_RESPOSNE_START_IF")
  //   setResponse(null);
  //   console.log({"__UNAUTH_RESPOSNE":response, current})
  //   if (response == null) {
  //     setResponse("response")
  //     setCurrent(" ")
  //     // artifactHtml(artifactId, authToken).then((res) => {
  //     //   setResponse(res)
  //     //   setCurrent(response);
  //     //   console.log("__UNAUTH_HTML ", response)
  //     // });
  //   }
  // }

  useEffect(() => {
    if (node.name === 'image') {
      setResponse(null);
      setType("__IMAGE");
      artifactService(node.id, authToken)
        .then((res) => {
          setResponse(res);
          setCurrent(response);
        })
    }
    else if (node.name === "html" || node.name === "html_large") {
      setResponse(null);
      setType("__HTML");
      artifactHTML(node.id, authToken, flag)
        .then((res) => {
          // setCurrent(response);
          let html = res?.data?.value.replace(/\\/g, '');
          console.log("__UNAUTH_HTML__RESPONSE", res?.data?.value)
          setResponse(res?.data?.value);
        })
    }
    else if (node.name === "markdown") {
      setResponse(null);
      setType("__MARKDOWN");
      artifactService(node.id, authToken)
        .then((res) => {
          setResponse(res);
          setCurrent(response);
        })
    }

    return () => setResponse(null);


  }, [node])

  useEffect(() => {

  }, [response])



  const html = `<p>this is the visualization html</p>`


  return (
    <div className={`${style.mainContainer}`}>

      {type === "__HTML" ?
        <>
          {response === null ? <FullWidthSpinner color="black" size="md" /> : <div dangerouslySetInnerHTML={{ __html: response }} />}
        </>
        : ""}
      {type === "__IMAGE" ?
        <div className={`${style.image}`}>
          {response === null ? <FullWidthSpinner color="black" size="md" /> : <img src={"data:image/png;base64," + response?.data?.value} alt={"Base64 encoded image"} />}

        </div>
        : ""}
      {type === "__MARKDOWN" ?
        <div className={`${style.markdown}`}>
          {response === null ? <FullWidthSpinner color="black" size="md" /> :
            <ReactMarkdown className={`${style.markdownText}`}>{response.data.value}</ReactMarkdown>
          }
        </div>
        : ""}
    </div>
  )
}

export default ArtifactVisualization
