import {forwardRef, useMemo} from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';
import {classNames} from '../../utils';

const FormGroup = forwardRef(
	(
		{
			controlId,
			className,
			as: Component = 'div',
			...props
		},
		ref
	) => {
		const context = useMemo(() => ({ controlId }), [controlId]);

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

FormGroup.propTypes = {
	controlId: PropTypes.string,
	className: PropTypes.string,
	as: PropTypes.element
}

export default FormGroup;