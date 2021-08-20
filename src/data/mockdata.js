export const state = {
        activeViewportIndex: 0,
        viewport:[0, 1, 2, 3],
        tools: [
             // Mouse
        {
            name: 'Wwwc',
            mode: 'active',
            modeOptions: { mouseButtonMask: 1 },
        },
        {
            name: 'Zoom',
            mode: 'active',
            modeOptions: { mouseButtonMask: 2 },
        },
        {
            name: 'Pan',
            mode: 'active',
            modeOptions: { mouseButtonMask: 4 },
        },
        'Length',
        'Angle',
        'Bidirectional',
        'FreehandRoi',
        'Eraser',
        // Scroll
        { name: 'StackScrollMouseWheel', mode: 'active' },
        // Touch
        { name: 'PanMultiTouch', mode: 'active' },
        { name: 'ZoomTouchPinch', mode: 'active' },
        { name: 'StackScrollMultiTouch', mode: 'active' },
        ],
        url: [
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/4+Chamber+Subcostal+2D.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/4+Chamber+Subcostal+CF.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+2+Chamber+2D.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+3+Chamber+2D.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+4+Chamber+2D.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+4+Chamber+CF+MV.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+4+Chamber+CF+TV.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+4+Chamber+PW+MV+Measure.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+4+Chamber+PW+MV.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+5+Chamber+2D.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Apical+5+Chamber+CF+AV.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Artery+Short+Axis+2D+AV.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Artery+Short+Axis+CF+AV.dcm",
            "https://ontacthealth.s3.ap-northeast-2.amazonaws.com/dicomfiles/Artery+Short+Axis+CF+PV.dcm",
        ],
        imageIdIndex: 0,
        activeTool: 'Wwwc',
}