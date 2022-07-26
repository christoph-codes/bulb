import { MdSettings } from "react-icons/md";
import { useState } from "react";
import styles from "./IdeaNote.module.scss";

interface IIdeaNoteProps {
  name: string;
  description: string;
}

const IdeaNote = ({ name, description }: IIdeaNoteProps) => {
  const [isSettingsActive, setIsSettingsActive] = useState(false);
  const [color, setColor] = useState("yellow");
  const availableColors = [
    "yellow",
    "blue",
    "green",
    "purple",
    "pink",
    "orange",
  ];

  const changeColor = (selectedColor: string) => {
    setColor(selectedColor);
  };

  return (
    <article
      className={styles.IdeaNote + " " + styles[color]}
      onMouseLeave={() => setIsSettingsActive(false)}
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
            styles.cog + (isSettingsActive ? " " + styles.cogActive : "")
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
    </article>
  );
};

export default IdeaNote;
