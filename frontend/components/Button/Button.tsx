import { ButtonHTMLAttributes, ReactElement, ReactNode } from "react";
import styles from "./Button.module.scss";

export interface IButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement & HTMLAnchorElement> {
  variant?:
    | "primary"
    | "primary-outline"
    | "secondary"
    | "secondary-outline"
    | "tertiary"
    | "tertiary-outline"
    | "ghost"
    | "ghost-light";
  href?: string;
  children: ReactNode;
}

const Button = ({
  variant = "primary",
  href,
  children,
  className,
  ...rest
}: IButtonProps) => {
  const Tag: "button" | "a" = href ? "a" : "button";
  return (
    <Tag
      type="button"
      className={`${styles.Button} ${
        styles[`Button__${variant}`]
      } ${className}`}
      {...rest}
    >
      {children}
    </Tag>
  );
};

export default Button;
