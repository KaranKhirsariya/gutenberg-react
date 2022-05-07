import { useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';
import ReactPortal from '../ReactPortal';
import './modalStyles.css';
import { PropTypes } from 'prop-types';
import { Box, IconButton } from 'theme-ui';
import { Flex } from 'rebass';
import { ReactComponent as CloseIcon } from 'assets/images/Cancel.svg';

function Modal({ children, isOpen, handleClose }) {
  const nodeRef = useRef(null);
  useEffect(() => {
    const closeOnEscapeKey = (e) => (e.key === 'Escape' ? handleClose() : null);
    document.body.addEventListener('keydown', closeOnEscapeKey);
    return () => {
      document.body.removeEventListener('keydown', closeOnEscapeKey);
    };
  }, [handleClose]);

  return (
    <ReactPortal wrapperId="react-portal-modal-container">
      <CSSTransition
        in={isOpen}
        timeout={{ entry: 0, exit: 300 }}
        unmountOnExit
        classNames="modal"
        nodeRef={nodeRef}>
        <Box className="modal" ref={nodeRef}>
          <Box
            className="modal-wrapper"
            bg="secondary"
            sx={{
              minWidth: '65%',
              minHeight: '25%',
              padding: 3,
              borderRadius: 4,
            }}>
            <Flex className="modal-header" flexDirection="row" justifyContent="space-between">
              <div></div>
              <IconButton
                aria-label="close dialog"
                sx={{ cursor: 'pointer' }}
                onClick={() => handleClose()}>
                {<CloseIcon />}
              </IconButton>
            </Flex>
            <Box className="modal-content" p={2}>
              {children}
            </Box>
          </Box>
        </Box>
      </CSSTransition>
    </ReactPortal>
  );
}

Modal.propTypes = {
  children: PropTypes.node,

  isOpen: PropTypes.bool,

  handleClose: PropTypes.func,
};
export default Modal;
