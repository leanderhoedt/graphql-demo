import React, { forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import FormContext from './FormContext';

const FormLabel = forwardRef(
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
		const { controlId } = useContext(FormContext);
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

FormLabel.propTypes = {
	as: PropTypes.string,
	htmlFor: PropTypes.string,
	required: PropTypes.bool,
	children: PropTypes.element
};

export default FormLabel;