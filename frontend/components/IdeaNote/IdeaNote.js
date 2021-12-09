import styles from '../../styles/Note.module.sass';
import { MdSettings } from 'react-icons/md';
import { useState } from 'react';

const IdeaNote = ({ name, description }) => {
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [color, setColor] = useState('yellow');
  const availableColors = [
    'yellow',
    'blue',
    'green',
    'purple',
    'pink',
    'orange',
  ];

  const changeColor = (selectedColor) => {
    setColor(selectedColor);
  };

  return (
    <div
      className={styles.note + ' ' + styles[color]}
      onMouseLeave={() => setIsSettingsActive(false)}
    >
      {isSettingsActive && (
        <div className={styles.settings}>
          Colors:
          <ul>
            {availableColors.map((color) => {
              return (
                <li>
                  <div
                    className={styles[color]}
                    onClick={() => changeColor(color)}
                  ></div>
                </li>
              );
            })}
          </ul>
        </div>
      )}
      <div className={styles.cogContainer}>
        <span
          className={
            styles.cog + (isSettingsActive ? ' ' + styles.cogActive : '')
          }
          onMouseOver={() => setIsSettingsActive(true)}
        >
          <MdSettings />
        </span>
      </div>
      <div onMouseEnter={() => setIsSettingsActive(false)}>
        <h2>{name}</h2>
        <p className={styles.description}>{description}</p>
      </div>
    </div>
  );
};

export default IdeaNote;
