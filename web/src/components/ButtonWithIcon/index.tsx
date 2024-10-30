import { LucideIcon } from "lucide-react";
import './styles.css';
import { ComponentProps } from "react";
interface ButtonProps extends ComponentProps<'button'> {
    text: string;
    Icon: LucideIcon;
    size?: "normal" | "small";
}
export function ButtonWithIcon({ text, Icon, size = 'normal', ...props}: ButtonProps) {
    return <button type="button" id="button-with-icon-block" className={size} {...props}>
        <Icon size={size === 'small' ? 20 : 24}/>
        <span>{text}</span>
    </button>
}