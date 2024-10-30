import { ComponentProps } from 'react'
import './styles.css'

interface InputProps extends ComponentProps<'input'> {
    label: string
}
export function Input({ label, name, type = 'text', ...props }: InputProps) {
    return (
        <div id="input-block">
            <label htmlFor={name} className='sr-only'>{ label }</label>
            <input type={type} name={name} placeholder={ label } {... props}/>
        </div>
    )
}