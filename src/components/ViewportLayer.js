import React, { useEffect, useRef, useState } from 'react';
import CornerstoneViewport from '../extenstion/index';
import cornerstoneWADOImageLoader from 'cornerstone-wado-image-loader';
import styled from 'styled-components';

export default function ViewportLayer({tools, activeTool ,imageIds, imageIdIndex, isPlaying, frameRate, selected}){
    const [dicomImage, setDicomImage] = useState(["wadouri:https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+5+Chamber+2D.dcm"]);
    const [isActive, setIsActive] = useState(false);
    const element = useRef();

    useEffect(() => {
        const loadImage = (imageIds) =>{
            cornerstoneWADOImageLoader.wadouri.dataSetCacheManager.load(imageIds, 
                cornerstoneWADOImageLoader.internal.xhrRequest).then(function(dataSet){

                    const numFrames = dataSet.intString('x00280008');
                    
                    const imageUrl = [];
                    const imageIdRoot = 'wadouri:' + imageIds;
        
                    for(let i=0; i < numFrames; i++){
                        let imageId = imageIdRoot + "?frame="+i;
                        imageUrl.push(imageId);
                    }
                    
                    if(!numFrames){
                        imageUrl.push(imageIdRoot);
                    }

                    setDicomImage(imageUrl);
            })
            return () => {
                setDicomImage([]);
            }
        }
        
        loadImage(imageIds);

    },[imageIds]);
    
    return(
        <ViewportSelector selected={selected} active={isActive} onClick={() => setIsActive(!isActive)}>
            <CornerstoneViewport
            ref={element}
            style={{minWidth: '50%', height: '256px', flex:'1'}}
            tools={tools}
            activeTool={activeTool}
            imageIds={dicomImage} 
            imageIdIndex={imageIdIndex}
            isPlaying={isPlaying}
            frameRate={frameRate}
            />
        </ViewportSelector>
    )
}

const ViewportSelector = styled.div`
    border: ${props => props.active === true || props.selected === true ? `2px solid dodgerblue` : 'none'};
`;