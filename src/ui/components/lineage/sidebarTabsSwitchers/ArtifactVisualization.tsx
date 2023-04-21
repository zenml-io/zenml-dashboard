import React,
{
  useEffect,
  useRef,
  useState
} from 'react' //eslint-disable-line
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
import { artifactVisulizationService } from '../../../layouts/runs/RunDetail/sidebarServices';
import style from './ArtifactVisualization.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ReactMarkdown from 'react-markdown';
import CsvTable from '../CsvTable';

const ArtifactVisualization = ({ node, fetching }: { node: any, fetching: boolean }) => {

  console.log('__unauth_stepnode-ArtifactVisualization', fetching)
  const [response, setResponse] = useState<any | undefined>(null)
  const [type, setType] = useState<string | undefined>('')
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const divRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {

    if (response?.data?.type === "html") {
      setType("__HTML");
      const fragment = document.createRange().createContextualFragment(response.data.value);
      console.log('__unauth--divRef', fragment)
      console.log('__unauth--response', response)
      divRef?.current?.append(fragment);
      console.log('__unauth--divRef', divRef)
      console.log('__unauth--tpe', type)
    }
    else {
      divRef.current = null
    }

  }, [divRef.current, response?.data?.value, type]); //eslint-disable-line

  useEffect(() => {
    console.log("__unauth_stepnode-ArtifactVisualization", node?.id)
    setResponse(null);
    artifactVisulizationService(node?.id, authToken)
      .then((res) => {
        setResponse(res);
        if (res?.data?.type === "html") {
          setType("__HTML");
          setResponse(res);
        }
        if (res?.data?.type === "image") {
          setType("__IMAGE");
        }
        if (res?.data?.type === "csv") {
          setType("__CSV");
        }
        if (res?.data?.type === "markdown") {
          setType("__MARKDOWN");
        }
      })
    // return () => setResponse(null);
  }, [node.id])//eslint-disable-line

  useEffect(() => {
  }, [response])//eslint-disable-line

  if (response === null) {
    return <div className={`${style.FullWidthSpinnerContainer}`}>
      <FullWidthSpinner color="black" size="md" />
    </div>
  }
  if (response === undefined || response?.name === "Error") {
    return (<div className={`${style.mainContainer}`}>
      <p>NO VISUALIZATION</p>
    </div>)
  }

  return (
    <div className={`${style.mainContainer}`} id='alibhai'>
      {type === "__HTML" ?
        response === undefined ? <p>NO VISUALIZATION</p> :
          <div style={{ height: "95%", width: '100%', overflowY: 'scroll' }}>
            <div ref={divRef} />
          </div>
        :
        ""
      }

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
        <div className={`${style.csv}`}>
          {response === null ? <FullWidthSpinner color="black" size="md" /> :
            <>
              <CsvTable data={response?.data?.value} />
              {response === undefined && <p>NO VISUALIZATION</p>}
            </>
          }
        </div>
        : ""}
    </div>
  )
}

export default ArtifactVisualization
