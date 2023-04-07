import React, { memo, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { runSelectors } from '../../../../../redux/selectors';
import { useService } from './useService';

import {
  FlexBox,
} from '../../../../components';

import JsonDisplay from '../../../../components/lineage/JsonDisplay';
import styles from './index.module.scss';

const stylesActive = {
  opacity: 1,
}
const stylesInActive = {
  opacity: 0.5,
}

const details = [
  {
    title: "Run Meta",
    case: "__RUN_META"
  },
  {
    title: "Step Meta",
    case: "__STEP_META"
  },
  {
    title: "Artifact Meta",
    case: "__ARTIFACT_META"
  },

]



export const Details: React.FC<{ runId: TId }> = memo(({ runId }) => {


  // const artifactData = useSelector(runSelectors.artifactData);

  const { artifactData, run, stepData } = useService({ runId });

  const [show, setShow] = useState("__RUN_META");

  const [dynamicLeft, setDynamicLeft] = useState<number | undefined>(21);

  const [dynamicWidth, setDynamicWidth] = useState<number | undefined>(80);

  const tabRef = useRef<(HTMLDivElement | null)[]>([])
  console.log("Rendered___", { dynamicLeft, dynamicWidth })

  const TabClickHandler = (tab: string) => {
    switch (tab) {
      case "__RUN_META": return setShow("__RUN_META");
      case "__STEP_META": return setShow("__STEP_META");
      case "__ARTIFACT_META": return setShow("__ARTIFACT_META");
      default: return setShow("__RUN_META");;
    }
  }

  useEffect(() => {
    // console.log("Rendered___useEffect 1", dynamicLeft, dynamicWidth)
    if (dynamicWidth == undefined && dynamicLeft == undefined) {
      let left: any = tabRef.current[0]?.offsetLeft;
      setDynamicLeft(left * 0);
      setDynamicWidth(tabRef.current[0]?.offsetWidth);
    }
  }, [])


  const handleClick = (divId: number) => {
    let left: any = tabRef.current[divId]?.offsetLeft;
    setDynamicLeft(left - 15);
    setDynamicWidth(tabRef.current[divId]?.offsetWidth);
    console.log("Rendered___", { dynamicLeft, dynamicWidth, tabRef, divId })
  };


  // if (Object.keys(node).length === 0) {
  //     return <FullWidthSpinner color="black" size="md" />;
  // }

  return (
    // <FlexBox fullWidth style={{ overflow: 'hidden', backgroundColor:'pink' }}>
    // </FlexBox>

    <div className={`${styles.mainContainer}`}>
      <div className={`${styles.navigation}`}>
        <div className={`${styles.tabs}`}>
          {details.map((tab, i) => {
            return (
              <>
                <div
                  key={i}
                  style={show === tab.case ? stylesActive : stylesInActive}
                  id={i.toString()}
                  ref={(el) => tabRef.current[i] = el}
                  onClick={() => {
                    handleClick(i)
                    TabClickHandler(tab.case)
                  }}
                >{tab.title}
                </div>
                {i !== details.length - 1 ? <div style={{ opacity: 0.4 }}>|</div> : ""}

              </>
            )
          })}

        </div>
        <div className={`${styles.underline}`}
          style={{ marginLeft: dynamicLeft, transition: 'all 300ms ease', width: dynamicWidth }}
        ></div>

      </div>
      {show === "__RUN_META" ? <JsonDisplay data={run} styles={{ width: "100%", padding: 20 }} /> : ""}
      {show === "__STEP_META" ? <JsonDisplay data={stepData} styles={{ width: "100%", padding: 20 }} /> : ""}
      {show === "__ARTIFACT_META" ? <JsonDisplay data={artifactData} styles={{ width: "100%", padding: 20 }} /> : ""}
      {/* <JsonDisplay data={artifactData.metadata.user} styles={{ width: "100%", padding: 20 }} /> 
      <JsonDisplay data={artifactData.metadata.workspace} styles={{ width: "100%", padding: 20 }} />  */}

    </div>

  );
})