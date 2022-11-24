import React, {forwardRef, useContext, ReactElement} from 'react';
import FormContext from './FormContext';

interface FormLabelProps {
    as?: string;
    htmlFor?: string;
    required?: boolean;
    children?: ReactElement;
}

/**
 * Component for rendering the label inside FormGroup
 *
 * @param Component
 * @param children
 * @param required
 * @param htmlFor
 * @param props
 * @param ref
 * @constructor
 */
const FormLabel = forwardRef<HTMLInputElement, FormLabelProps>(
    (
        {
            as: Component = 'label',
            children,
            required = false,
            htmlFor,
            ...props
        },
        ref,
    ) => {
        const {controlId} = useContext(FormContext);
        htmlFor = htmlFor || controlId;

        return (
            <Component
                ref={ref}
                className="block text-sm font-medium text-gray-700"
                htmlFor={htmlFor}
                {...props}
            >
                {children}{' '}{required ? <span className="text-red-500">*</span> : null}
            </Component>
        );
    }
);

export default FormLabel;