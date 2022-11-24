import {forwardRef, useMemo, ReactElement} from 'react';
import FormContext from './FormContext';
import {classNames} from '../../utils';

interface FormGroupProps {
    controlId?: string;
    className?: string;
    as?: ReactElement;
}

const FormGroup = forwardRef<HTMLInputElement, FormGroupProps>(
    (
        {
            controlId,
            className,
            as: Component = 'div',
            ...props
        },
        ref
    ) => {
        const context = useMemo(() => ({controlId}), [controlId]);

        return (
            <FormContext.Provider value={context}>
                <Component
                    className={classNames('col-span-6', className)}
                    {...props}
                    ref={ref}
                />
            </FormContext.Provider>
        );
    }
);

export default FormGroup;