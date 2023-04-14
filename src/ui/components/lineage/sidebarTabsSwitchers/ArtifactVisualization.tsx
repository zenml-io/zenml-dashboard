import React,
{
  useEffect,
  useState
} from 'react' //eslint-disable-line
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
import { artifactVisulizationService } from '../../../layouts/runs/RunDetail/sidebarServices';
import style from './ArtifactVisualization.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ReactMarkdown from 'react-markdown';
import CsvTable from '../CsvTable';

const ArtifactVisualization = ({ node }: { node: any }) => {

  const [response, setResponse] = useState<any | undefined>(null)
  const [type, setType] = useState<string | undefined>('')
  const authToken = useSelector(sessionSelectors.authenticationToken);

  useEffect(() => {
    setResponse(null);
    artifactVisulizationService(node.id, authToken)
      .then((res) => {
        setResponse(res);
        if (res?.data?.type === "image") {
          setType("__IMAGE");
        }
        if (res?.data?.type === "html") {
          setType("__HTML");
        }
        if (res?.data?.type === "csv") {
          setType("__CSV");
        }
        if (res?.data?.type === "markdown") {
          setType("__MARKDOWN");
        }
      })
    return () => setResponse(null);
  }, [node])//eslint-disable-line

  useEffect(() => {
    console.log('__unauth_resposne', response?.message)
    console.log('__unauth_resposne', response?.name)
    console.log('__unauth_resposne', typeof response)
    console.log('__unauth_resposne',  JSON.stringify(response))
  }, [response])//eslint-disable-line

  if (response === null) {
    return <FullWidthSpinner color="black" size="md" />
  }
  if (response === undefined || response?.name === "Error") {
    return (<div className={`${style.mainContainer}`}>
      <p>NO VISUALIZATION</p>
    </div>)
  }

  return (
    <div className={`${style.mainContainer}`}>

      {type === "__HTML" ?
        <>
          {response === undefined ? <p>NO VISUALIZATION</p> : <div dangerouslySetInnerHTML={{ __html: response }} />}
        </>
        : ""}
      {type === "__IMAGE" ?
        <div className={`${style.image}`}>
          <>
            {response === undefined ? <p>NO VISUALIZATION</p> : <img src={"data:image/png;base64," + response?.data?.value} alt={"Base64 encoded image"} />} {/* eslint-disable-line */}
          </>

        </div>
        : ""}
      {type === "__MARKDOWN" ?
        <div className={`${style.markdown}`}>
          {response === undefined ? <p>NO VISUALIZATION</p> :
            <>
              <ReactMarkdown className={`${style.markdownText}`}>{response?.data?.value}</ReactMarkdown>
            </>
          }
        </div>
        : ""}
      {type === "__CSV" ?
        <div className={`${style.markdown}`}>
          {response === null ? <FullWidthSpinner color="black" size="md" /> :
            <>
              <CsvTable data={response?.data?.value} />
              {response === undefined && <p>NO VISUALIZATION</p>}
            </>
          }
        </div>
        : ""}
      {/* {type === null || type === undefined ? <p>NO VISUALIZATION</p> : ""} */}
    </div>
  )
}

export default ArtifactVisualization
