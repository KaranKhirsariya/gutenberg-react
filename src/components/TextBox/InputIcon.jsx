import React from 'react';
import { PropTypes } from 'prop-types';

const InputIconComponent = ({ icon, clickable, onClick }) => {
  return (
    <span className="input-icon" onClick={onClick}>
      {icon}
      <style jsx>{`
        .input-icon {
          box-sizing: border-box;
          display: inline-flex;
          width: calc(var(--input-height) - 2px);
          flex-shrink: 0;
          height: 100%;
          align-items: center;
          justify-content: center;
          margin: 0;
          padding: 0;
          line-height: 1;
          position: relative;
          cursor: ${clickable ? 'pointer' : 'default'};
          pointer-events: ${clickable ? 'auto' : 'none'};
        }
        .input-icon :global(svg) {
          width: calc(var(--input-height) - 2px);
          height: calc(var(--input-height) - 2px);
          transform: scale(0.44);
        }
      `}</style>
    </span>
  );
};
InputIconComponent.propTypes = {
  icon: PropTypes.node,
  clickable: PropTypes.bool,
  onClick: PropTypes.func,
};

InputIconComponent.displayName = 'ThemedInputIcon';
const InputIcon = React.memo(InputIconComponent);
export default InputIcon;
