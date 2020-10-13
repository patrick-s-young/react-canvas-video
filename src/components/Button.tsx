import React from 'react';
import type { ButtonProps } from 'components/button.config';

const Button: React.FC<ButtonProps> = ({
  onClickCallback,
  stateValue,
  isEnabled,
  imagePath,
  className,
  altText
}) => {
  return (
    <div className={className}>
      { isEnabled ? 
          <img src={imagePath.hilite} onClick={() => onClickCallback(stateValue)} alt={altText} /> 
        : <img src={imagePath.default} alt={altText} />
      }
    </div>
  );
}

export default Button;