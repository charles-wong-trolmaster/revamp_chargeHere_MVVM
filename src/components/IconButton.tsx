import React from "react";

interface IconButtonProps {
  onClick?: () => void;
  icon: string;
  name?: string;
  showName?: boolean;
}

const IconButton = (props: IconButtonProps) => {
  const { onClick, icon, name, showName = false } = props;

  return (
    <button
      onClick={onClick}
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: '4px',
        borderRadius: '8px',
        backgroundColor: '#84a9f9ff',
        padding: '12px 16px',
        color: 'white',
        transition: 'background-color 0.15s ease-in-out',
        border: 'none',
        cursor: 'pointer',
        outline: 'none',
        minWidth: '64px'
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = '#1d4ed8';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = '#84a9f9ff';
      }}
      onFocus={(e) => {
        e.currentTarget.style.boxShadow = '0 0 0 2px #3b82f6, 0 0 0 4px rgba(59, 130, 246, 0.5)';
      }}
      onBlur={(e) => {
        e.currentTarget.style.boxShadow = 'none';
      }}
    >
      <img 
        src={icon} 
        style={{
          height: '20px',
          width: '20px',
          objectFit: 'contain'
        }}
      />
      
      {showName && name && (
        <span 
          style={{
            fontSize: '12px',
            fontWeight: '500',
            textAlign: 'center',
            lineHeight: '1.25'
          }}
        >
          {name}
        </span>
      )}
    </button>
  );
};

export default IconButton;