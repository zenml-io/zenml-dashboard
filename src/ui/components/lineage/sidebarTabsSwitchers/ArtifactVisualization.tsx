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

function Modal({ message, proceed, size }: { message: string, proceed: any, size: number }) {

  const [isProceed, setIsProceed] = useState(false);

  const handleAgree = () => {
    proceed(true)
    setIsProceed(true)
  };
  useEffect(() => {
    if (size !==0) {
      if(size < resposneSizeConstant)
      return proceed(true)
    }
  }, [isProceed,size])

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

function OnCancel() {
  return (
    <div>this may take some time</div>
  )
}


const ArtifactVisualization = ({ node, fetching }: { node: any, fetching: boolean }) => {


  const [response, setResponse] = useState<any | undefined>(null)
  const [type, setType] = useState<string | undefined>('')
  const authToken = useSelector(sessionSelectors.authenticationToken);
  const [proceed, setProceed] = useState(false);
  const [loader, setLoader] = useState(false);
  const [size, setSize] = useState(0);
  const divRef = useRef<HTMLDivElement | null>(null);
  const CancelToken = axios.CancelToken;
  const source = CancelToken.source();

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

  const getSizeOfVisualization = async () => {
    const CancelTokenLocal = axios.CancelToken;
    const sourceLocal = CancelTokenLocal.source();
    return await axios.get(
      `${process.env.REACT_APP_BASE_API_URL}/artifacts/${node.id}/visualize`,
      {
        headers: {
          Authorization: `bearer ${authToken}`,
        },
        onDownloadProgress: progressEvent => {
          const contentLength = progressEvent.total;
          const loadedBytes = progressEvent.loaded;
          console.log(`API response size: ${contentLength} bytes, loaded: ${loadedBytes} bytes (check)`);
          source.cancel(`cannot proceed`);
          setSize(contentLength);
          if (contentLength > resposneSizeConstant) {
            console.log("__unauth_size", contentLength)
          }
          sourceLocal.cancel(`cannot proceed`);
        },
        cancelToken: sourceLocal.token
      },
    )
  }

  const getVisualizations = () => {
    setLoader(true)
    artifactVisulizationService(node?.id, authToken, source)
      .then((res) => {
        setResponse(res);
        console.log("visualization 002")

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
        console.log("visualization 003")
        setLoader(false)
      })

  }

  const handleCancelRequest = () => {
    artifactVisulizationService(node?.id, authToken, source)
    source.cancel("USER CANCELED THE REQUEST");
    setProceed(false);
    setSize(0);
    setLoader(false)
    setResponse({})
  }


  useEffect(() => {
    if (proceed) {
      if (size > 0) {
        console.log("requesting visals")
        getVisualizations()
        console.log("visualization 001")
        setLoader(false)
      }
    }
    if (!proceed) {
      if (size === 0) {
        getSizeOfVisualization();
      }
    }
    return () => setResponse(null);
  }, [size, proceed])//eslint-disable-line




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



  useEffect(() => {
  }, [loader, response])


  if (!proceed) {
    return <Modal message='size of resposne in larger than 5mb. Do you want to continue?' proceed={setProceed} size={size} />
  }

  // if (loader) {
  //   return (
  //     <div className={`${style.FullWidthSpinnerContainer}`}>
  //       <FullWidthSpinner color="black" size="md" />
  //       <button onClick={handleCancelRequest} className={`${style.downloadBtn}`}>Cancel Visalization</button>
  //     </div>)
  // }


  // CHECK IF RESPOSNE IS NULL
  if (response === null) {
    console.log("__unauth_response ", response)
    if (!proceed) {
      return (
        <div className={`${style.FullWidthSpinnerContainer}`}>
          <div className={`${style.mainContainer}`}>
            <p>NO VISUALIZATION</p>
          </div>
        </div>
      )
    }
    return (
      <div className={`${style.FullWidthSpinnerContainer}`}>
        <FullWidthSpinner color="black" size="md" />
        <button onClick={handleCancelRequest} className={`${style.downloadBtn}`}>Cancel Visalization</button>
      </div>)
  }
  // CHECK IF RESPOSNE LENGTH IS 0
  if (Object.keys(response).length === 0) {
    console.log("requesting visals load")
    return (
      <div className={`${style.FullWidthSpinnerContainer}`}>
        <div className={`${style.mainContainer}`}>
          <p>NO VISUALIZATION</p>
        </div>
      </div>
    )
  }
  // CHECK IF RESPOSNE IS UNDEFINED OR API RESPOSNE HAS ERROR
  if (response === undefined || response?.name === "Error") {
    console.log("requesting visals load")
    return (
      <div className={`${style.FullWidthSpinnerContainer}`}>
        <div className={`${style.mainContainer}`}>
          <p>NO VISUALIZATION</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`${style.mainContainer}`}>

      {type === "__HTML" ?
        response === undefined ? <p>NO VISUALIZATION</p> :
          <div style={{ height: "80%", width: '100%', overflowY: 'scroll', overflowX: 'hidden' }}>
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
      <div className={`${style.btnContainer}`}>
        <button onClick={handleDownload} className={`${style.downloadBtn} downloadBtn`}>
          Download
        </button>
      </div>
    </div>
  )
}

export default ArtifactVisualization
