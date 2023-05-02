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
import axios from 'axios';



const resposneSizeConstant = 5 * 1024 * 1024;

function Modal({ message, proceed, size }: { message: string, proceed: any, size: any }) {

  const [isProceed, setIsProceed] = useState(false);
  const tempSize = Number(localStorage.getItem("VISUALIZATION_SIZE"));
  console.log("node.metadata.storage_size.value (size)", typeof size)
  console.log("node.metadata.storage_size.value (size)", Number(size))

  const handleAgree = () => {
    proceed(true)
    setIsProceed(true)
  };

  useEffect(() => {
    // if (size !==0) {
    if (Number(size) < resposneSizeConstant)
      // if (tempSize < 1)
      return proceed(true)
    // }
  }, [isProceed])//eslint-disable-line

  return (
    <>
      <div className={`${style.askModal} askModal`}>
        <div className={`${style.askModalMessage} askModalMessage`}>
          <p>{message}</p>
        </div>
        <div className={`${style.askModalBtn} askModalBtn`}>
          <button onClick={handleAgree}>Agree</button>
        </div>
      </div>
    </>
  );
}



const ArtifactVisualization = ({ node, fetching }: { node: any, fetching: boolean }) => {

  const controller = new AbortController();
  const signal = controller.signal;

  const source = axios.CancelToken.source();

  const [response, setResponse] = useState<any | undefined>(null)
  const [type, setType] = useState<string | undefined>('')
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [proceed, setProceed] = useState(false);
  const [loader, setLoader] = useState(false);
  const divRef = useRef<HTMLDivElement | null>(null);
  const [cancelToken, setCancelToken] = useState<any>(null);

  const handleDownload = async () => {
    try {
      const blob = new Blob([response?.data?.value], { type: 'text/html' });
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'response.html';
      a.click();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error(error);
    }
  };

  const getVisualizations = () => {




    setCancelToken(source);
    // setCancelToken(controller);

    setLoader(true)
    // artifactVisulizationService(node?.id, authToken, signal)
    artifactVisulizationService(node?.id, authToken, source)
      // artifactVisulizationService(node?.id, authToken, null, null)
      .then((res) => {
        setLoader(false)
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
        setLoader(false)
      })
      .catch(error => {
        if (axios.isCancel(error)) {
          console.log('Request canceled:', error.message);
        } else {
          console.log('Error:', error.message);
        }
      });
  }

  const handleCancelRequest = () => {
    if (cancelToken) {
      console.log("cancelToken", cancelToken)
      cancelToken.cancel('Request canceled by user');
      // cancelToken.Abort();
      setTimeout(() => {
        cancelToken.cancel('Request canceled by user');

      }, 500)
    }
  }

  // useEffect(() => {
  //   console.log("Request canceled by user")
  //   if (cancelToken) {
  //     cancelToken.cancel('Request canceled by user');
  //   }
  // }, [node])//eslint-disable-line
  useEffect(() => {
    if (cancelToken) {
      cancelToken.cancel('Request canceled by user');
    }
    if (proceed) {
      getVisualizations();
    }
  }, [proceed, node])//eslint-disable-line

  useEffect(() => {
    if (response?.data?.type === "html") {
      setType("__HTML");
      const fragment = document.createRange().createContextualFragment(response.data.value);
      divRef?.current?.append(fragment);
    }
    else {
      divRef.current = null
    }
  }, [divRef.current, response?.data?.value, type]); //eslint-disable-line

  // ASK TO PROCEED IF SIZE IN LARGER THAN 5MB
  if (!proceed) {
    console.log("node.metadata.storage_size.value", typeof node.metadata.storage_size.value)
    let size = node.metadata.storage_size.value
    return <Modal message='size of resposne in larger than 5mb. Do you want to continue?' proceed={setProceed} size={size} />
  }

  // LOADER CONDITION
  if (loader) {
    return <div className={`${style.FullWidthSpinnerContainer}`}>
      <FullWidthSpinner color="black" size="md" />
      <p style={{ fontFamily: 'Rubik', fontSize: '14px' }}>Loading Visualization. Please wait</p>
      <button
        onClick={handleCancelRequest}
        className={`${style.downloadBtn}`}
      >Cancel Visalization</button>
      {/* <div className={`${style.btnContainer}`}> */}
      <button onClick={handleDownload} className={`${style.downloadBtn} downloadBtn`} style={{ background: '#cfcfcf', marginTop: '10px', padding: '0px 60px' }} disabled>
        Download
      </button>
      {/* </div> */}
    </div>
  }

  return (
    <div className={`${style.mainContainer}`}>
      <div className={`${style.btnContainer}`}>
        <button onClick={handleDownload} className={`${style.downloadBtn} downloadBtn`}>
          Download
        </button>
      </div>
      {type === "__HTML" ?
        response === undefined ? <p>NO VISUALIZATION </p> :
          <div className={`${style.html}`}>
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
