import React from 'react';
import * as d3 from 'd3';

function Legend({ colorBy }) {
  const colorScale =
    colorBy === 'Sentiment'
      ? d3.scaleLinear().domain([-1, 0, 1]).range(['red', '#ECECEC', 'green'])
      : d3.scaleLinear().domain([0, 1]).range(['#ECECEC', '#4467C4']);

  const gradientId = 'legend-gradient';

  return (
    <div style={{
      position: 'fixed',  
      right: '60%',           
      top: '50%',   
      transform: 'translateY(-50%)',
      zIndex: 10        
    }}>
      <svg width={100} height={450}>
        <defs>
          <linearGradient id={gradientId} x1="0%" x2="0%" y1="0%" y2="100%">
            {colorScale.domain().map((d, i) => (
              <stop
                key={i}
                offset={`${(i / (colorScale.domain().length - 1)) * 100}%`}
                style={{ stopColor: colorScale(d) }}
              />
            ))}
          </linearGradient>
        </defs>
        <rect width={20} height={300} fill={`url(#${gradientId})`} />
        
        {colorBy === 'Sentiment' ? (
          <>
            <text x="30" y="20" fontSize="12">Negative</text>
            <text x="30" y="290" fontSize="12">Positive</text>
          </>
        ) : (
          <>
            <text x="30" y="20" fontSize="12">Objective</text>
            <text x="30" y="290" fontSize="12">Subjective</text>
          </>
        )}
      </svg>
    </div>
  );
}

export default Legend;
