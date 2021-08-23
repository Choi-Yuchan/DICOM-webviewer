import React, { useCallback, useEffect, useRef, useState } from 'react';
import CornerstoneViewport from '../extenstion/index';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import styled from 'styled-components';

function ViewportLayer({activeTool ,imageIds, imageIdIndex, isPlaying, frameRate, selectedAll, selectedPage, isSelected}){
    const imageIdRoot = 'wadouri:' + imageIds;
    const [dicomImage, setDicomImage] = useState([imageIdRoot[0]]);
    const [isActive, setIsActive] = useState(false);
    const element = useRef(); 

    const loadImage = useCallback((imageIds) =>{
        cornerstoneWADOImageLoader.wadouri.dataSetCacheManager
        .load(imageIds,cornerstoneWADOImageLoader.internal.xhrRequest)
        .then(function(dataSet){
            const numFrames = dataSet.intString('x00280008');
            
            const imageUrl = [];

            if(!numFrames){
                setDicomImage([imageIdRoot]);
            }
            if (numFrames){
                for(let i=0; i < numFrames; i++){
                    let imageId = imageIdRoot + "?frame="+i;
                    imageUrl.push(imageId);
                }
                setDicomImage(imageUrl);
            }
        })
    },[imageIdRoot]);
    
    useEffect(() => {
        let mounted = true; // component의 mounted 여부 check하기 위해 변수 설정
        if(mounted){
            //mounted 상태일 때 loadImage를 실행할 수 있게 해준다.
            loadImage(imageIds);
        }
        // component가 willunmount될 때 mounted를 false로 설정해준다.
        return () => mounted = false;

    },[loadImage, imageIds]);

    return(
        <ViewportSelector selectedAll={selectedAll} selectedPage={selectedPage} active={isActive} onClick={() => {setIsActive(!isActive); isSelected(!isActive)}}>
            <CornerstoneViewport
            ref={element}
            style={{minWidth: '50%', height: '256px', flex:'1'}}
            activeTool={activeTool}
            imageIds={dicomImage} 
            imageIdIndex={imageIdIndex}
            isPlaying={isPlaying}
            frameRate={frameRate}
            />
        </ViewportSelector>
    )
}

export default ViewportLayer;

const ViewportSelector = styled.div`
    outline: ${props => props.active === true || props.selectedAll === true || props.selectedPage === true ? `3px solid #ffbf00` : '2px solid #c0c0c0'};
`;