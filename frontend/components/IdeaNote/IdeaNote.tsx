import styles from '../../styles/Note.module.sass';
import { MdSettings } from 'react-icons/md';
import { useState } from 'react';

interface IIdeaNoteProps {
  name: string;
  description: string;
  isList: boolean;
}

const IdeaNote = ({ name, description, isList }: IIdeaNoteProps) => {
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

  function getRandomNumBetween(min: number, max: number) {
    return Math.random() * (max - min) + min;
  }

  return isList ? (
    <tr>
      <td className={styles[color]}>Personal</td>
      <td>{name}</td>
      <td>{description}</td>
    </tr>
  ) : (
    <li>
      <div
        className={styles.note + ' ' + styles[color]}
        onMouseLeave={() => setIsSettingsActive(false)}
        style={{ transform: `rotate(${getRandomNumBetween(-3, 3)}deg)` }}
      >
        {isSettingsActive && (
          <div className={styles.settings}>
            Colors:
            <ul>
              {availableColors.map((color, i) => {
                return (
                  <li key={i}>
                    <div
                      className={styles[color]}
                      onClick={() => setColor(color)}
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
    </li>
  );
};

export default IdeaNote;
