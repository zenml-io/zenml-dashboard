import React,
{
  useEffect,
  useState
} from 'react' //eslint-disable-line
import { useSelector } from 'react-redux';
import { sessionSelectors } from '../../../../redux/selectors';
import { artifactHTML, artifactService } from '../../../layouts/runs/RunDetail/sidebarServices';
import style from './ArtifactVisualization.module.scss';
import { FullWidthSpinner } from '../../spinners';
import ReactMarkdown from 'react-markdown';

const ArtifactVisualization = ({ node }: { node: any }) => {

  const [response, setResponse] = useState<any | undefined>(null)
  const [current, setCurrent] = useState<any | undefined>(null)//eslint-disable-line
  const [type, setType] = useState<string | undefined>('')
  const [flag, setFlag] = useState<boolean>(false) //eslint-disable-line
  const authToken = useSelector(sessionSelectors.authenticationToken);

  console.log("__UNAUTH_HTML__", node)

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
          setResponse(html);
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
    else if (node.name === "csv") {
      setResponse(null);
      setType("__CSV");
      artifactService(node.id, authToken)
        .then((res:any) => {
          setResponse(res);
          setCurrent(response);
        })

    }

    return () => setResponse(null);


  }, [node])//eslint-disable-line

  useEffect(() => {

  }, [response])//eslint-disable-line


  return (
    <div className={`${style.mainContainer}`}>

      {type === "__HTML" ?
        <>
          {response === null ? <FullWidthSpinner color="black" size="md" /> : <div dangerouslySetInnerHTML={{ __html: response }} />}
          {response === undefined && <p>RENDNER CANCELED</p>}
        </>
        : ""}
      {type === "__IMAGE" ?
        <div className={`${style.image}`}>
          {response === null ? <FullWidthSpinner color="black" size="md" /> : <img src={"data:image/png;base64," + response?.data?.value} alt={"Base64 encoded image"} />} {/* eslint-disable-line */}

        </div>
        : ""}
      {type === "__MARKDOWN" ?
        <div className={`${style.markdown}`}>
          {response === null ? <FullWidthSpinner color="black" size="md" /> :
            <ReactMarkdown className={`${style.markdownText}`}>{response.data.value}</ReactMarkdown>
          }
        </div>
        : ""}
      {/* {type === "__CSV" ?
        <div className={`${style.markdown}`}>
          {response === null ? <FullWidthSpinner color="black" size="md" /> :
            // <CSVDownloader data={response?.data?.value} filename="my-data.csv">
              <button>Download CSV</button>
            // </CSVDownloader>
          }
        </div>
        : ""} */}
    </div>
  )
}

export default ArtifactVisualization
