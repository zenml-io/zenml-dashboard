import React, { useState, useEffect, useRef } from 'react'; //eslint-disable-line
import circleArrowSideClose from '../icons/assets/circleArrowSideClose.svg';
import circleArrowSideOpen from '../icons/assets/circleArrowSideOpen.svg';
import { useSelector } from '../../hooks';
import { sessionSelectors } from '../../../redux/selectors';
import ArtifactTabHeader from './sidebarTabsSwitchers/artifactTabSwitcher';
import StepnodeTabHeader from './sidebarTabsSwitchers/stepTabSwitcher';
import {
  fetchArtifactData,
  fetchStepData,
} from '../../layouts/runs/RunDetail/sidebarServices';
import styles from './index.module.scss';

const colCenter = {
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const Sidebar: React.FC<any> = ({ selectedNode }) => {
  const [sidebar, setSidebar] = useState(true);
  const [fetching, setFetching] = useState(true); //added
  const [isStepNode, setIsStepNode] = useState(true);
  const [artifact, setArtifact] = useState([] as any);
  const [step, setStep] = useState([] as any);
  const sidebar_ref = useRef<HTMLInputElement>(null); //eslint-disable-line
  const authToken = useSelector(sessionSelectors.authenticationToken);

  async function FetchData(type: boolean) {
    if (type) {
      const data = await fetchStepData(selectedNode, authToken);
      setStep(data);
      setFetching(false);
    } else {
      const data = await fetchArtifactData(selectedNode, authToken);

      setArtifact(data);
      setFetching(false);
    }
  }

  // USE EFFECT TO CHECK IF ITS A STEP NODE OR AN ARTIFACT NODE
  useEffect(() => {
    if (selectedNode === null) return;
    let type = 'configuration' in selectedNode;
    if (type) {
      setIsStepNode(true);
    } else {
      setIsStepNode(false);
    }
    FetchData(type);
  }, [isStepNode, selectedNode]); //eslint-disable-line

  // CLICK OUTSIDE TO CLOSE THE SIDEBAR
  useEffect(() => {
    let handler = (event: any) => {
      if (!sidebar_ref.current?.contains(event.target)) {
        setSidebar(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => {
      document.removeEventListener('mousedown', handler);
    };
  }, []);

  // reopen sidebar if closed
  useEffect(() => {
    setFetching(true); //added
    if (!sidebar) {
      setSidebar(true);
    }
  }, [selectedNode]); //eslint-disable-line

  useEffect(() => {
    //added
  }, [fetching]); //eslint-disable-line

  return (
    <div
      className={`${styles.sidebarMainContainer} ${
        sidebar ? styles.sidebarOpen : styles.sidebarClose
      }`}
      ref={sidebar_ref}
    >
      <div className={`${styles.btnContainer}`} style={colCenter}>
        {sidebar ? (
          <img
            className="absolute"
            src={circleArrowSideOpen}
            alt={'close'}
            onClick={() => setSidebar(!sidebar)}
          />
        ) : (
          <img
            className="absolute"
            src={circleArrowSideClose}
            alt={'close'}
            onClick={() => setSidebar(!sidebar)}
          />
        )}
      </div>
      <div className={`${styles.bodyContainer}`}>
        {isStepNode ? (
          <StepnodeTabHeader node={step} fetching={fetching} />
        ) : (
          <ArtifactTabHeader node={artifact} fetching={fetching} />
        )}
      </div>
    </div>
  );
};

export default Sidebar;
