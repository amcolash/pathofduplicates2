import React from 'react';

export default function Card(props) {
  return (
    <div
      style={{
        padding: '1rem 2rem',
        background: '#f5f5f5',
        borderRadius: '0.2rem',
        boxShadow: '0.1rem 0.1rem 0.25rem rgba(0, 0, 0, 0.5)',
      }}>
      {props.children}
    </div>
  );
}
