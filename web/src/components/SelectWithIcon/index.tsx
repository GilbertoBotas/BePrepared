import { MapPin } from "lucide-react";
import "./styles.css";
import { ComponentProps } from "react";

interface SelectProps extends ComponentProps<"select"> {
  label: string;
  options: {
    id: string;
    designation: string;
  }[];
}

export function SelectWithIcon({ label, options, name, ...props }: SelectProps) {
  return (
    <div id="select-with-icon-block">
      <label htmlFor={name} className="sr-only">
        {label}
      </label>
      <MapPin size={16} />
      <select name={name} id={name} {... props}>

        <option value="">{label}</option>
        {
            options.map(option => (
                <option value={option.id}>{option.designation}</option>
            ))
        }
      </select>
    </div>
  );
}
