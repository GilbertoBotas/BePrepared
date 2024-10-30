import { MapPin } from "lucide-react";
import "./styles.css";
import { ComponentProps } from "react";

interface TextAreaProps extends ComponentProps<"textarea"> {
  label: string;
}

export function TextAreaWithIcon({ label, name, ...props }: TextAreaProps) {
  return (
    <div id="textarea-with-icon-block">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <MapPin size={16} />
      <textarea name={name} id={name} placeholder={label} {... props} />
    </div>
  );
}
