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


import { artifactService } from './artifactVisualizationService';
import style from './ArtifactVisualization.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ReactMarkdown from 'react-markdown';
// import {html} from './test'

// const ArtifactVisualization = ({ artifactId }: { artifactId: any }) => {
const ArtifactVisualization = ({ node }: { node: any }) => {

  const [response, setResponse] = useState<any | undefined>(null)
  const [current, setCurrent] = useState<any | undefined>(null)
  const [type, setType] = useState<string | undefined>('')
  const authToken = useSelector(sessionSelectors.authenticationToken);

  console.log("__UNAUTH_RESPOSNE_START", node)



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
    console.log("__UNAUTH_RESPOSNE_CHANGED")
    if (node.name === 'image') {
      setResponse(null);
      setType("__IMAGE");
      artifactService(node.id, authToken)
        .then((res) => {
          setResponse(res);
          setCurrent(response);
        })
    }
    else if (node.name === "html") {
      setType("__HTML");
      // artifactService(node.id, authToken)
      //   .then((res) => {
      //     setResponse(res);
      //     setCurrent(response);
      //     console.log("__UNAUTH_RESPOSNE_", res.data)
      //   })
    }
    else if (node.name === "markdown") {
      setType("__MARKDOWN");
      artifactService(node.id, authToken)
        .then((res) => {
          setResponse(res);
          setCurrent(response);
          console.log("__UNAUTH_RESPOSNE_", res.data)
        })
    }

    return () => setResponse(null);


  }, [node])

  useEffect(() => {

  }, [response])



  const html = `<p>this is the visualization html</p>`
  // const image = `<p>this is the visualization image</p>`
  // const markdown = `<p>this is the visualization markdown. Loading.....</p>`


  return (
    <div className={`${style.mainContainer}`}>
      {type === "__HTML" ?
      <>
          {response === null ? <FullWidthSpinner color="black" size="md" /> : <div dangerouslySetInnerHTML={{ __html: html }} />}
      </>
        : ""}
      {type === "__IMAGE" ?
        <>
          {response === null ? <FullWidthSpinner color="black" size="md" /> : <img src={"data:image/png;base64," + response?.data?.value} alt={"Base64 encoded image"} height={"100px"} width={"100px"} />}

        </>
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
