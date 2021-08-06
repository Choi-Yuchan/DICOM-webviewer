import PropTypes from 'prop-types';
import styled from 'styled-components';

const OverlayBlock = styled.div`
    position: absolute;
    top: 0;
    left: 15px;
    width: 100%;
    height: 100%;
    color: #fefefe;
`;

function CustomOverlay(props) {
    const propTypes = {
        scale: PropTypes.number.isRequired,
        windowWidth: PropTypes.number.isRequired,
        windowCenter: PropTypes.number.isRequired,
        imageId: PropTypes.string.isRequired,
        imageIndex: PropTypes.number.isRequired,
        stackSize: PropTypes.number.isRequired,
    }

    return(
        <OverlayBlock>
            {Object.keys(props).map(
                key => {
                    const val = props[key];
                    return(
                        <p key={key}>
                            <b>{key}</b>: <span style={{ color: '#a7c7e7'}}>{val}</span>
                        </p>
                    )
                }
            )}
        </OverlayBlock>
    )
}

export default CustomOverlay;