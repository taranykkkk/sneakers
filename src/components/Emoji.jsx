import React, { useEffect, useState } from 'react';

const Emoji__Array = [
  '\u{1F628}',
  '\u{1F610}',
  '\u{1F611}',
  '\u{1F614}',
  '\u{1F61E}',
  '\u{1F61F}',
  '\u{1F629}',
  '\u{1F631}',
  '\u{1F633}',
];
const Emoji = ({ children }) => {
  const [emoji, setEmoji] = useState('');
  useEffect(() => {
    let randomNum = Math.round(Math.random() * 8);
    let result = Emoji__Array[randomNum];
    const regex1 = new RegExp(result);

    setEmoji(regex1);
  }, []);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        gap: '40px',
      }}>
      <span style={{ fontSize: '99px', lineHeight: '0.8' }}>
        {emoji.source}
      </span>
      <p style={{ fontSize: '30px', maxWidth: '305px', textAlign: 'center' }}>
        {children}
      </p>
    </div>
  );
};

export default Emoji;
