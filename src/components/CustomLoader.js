import styled from "styled-components";

const LoaderBox = styled.div`
    position: absolute;
    top: 10px;
    left: 10px;
    width: 100%;
    height: 100%;
    color: #fefefe;
`;
function CustomLoader() {
    return(
        <LoaderBox className="lds-ripple">
            <div>something</div>
            <div></div>
        </LoaderBox>
    )
}

export default CustomLoader;