import {forwardRef, useContext, ElementType} from 'react';
import {ErrorMessage} from '@hookform/error-message';
import FormContext from './FormContext';
import {classNames} from '../../utils';

interface FormControlProps {
	type?: string;
	id?: string;
	name: string;
	readOnly?: boolean;
	disabled?: boolean;
	as?: ElementType;
	value?: string | string[] | number;
	size?: "sm" | "md";
	errors: object
}
const FormControl = forwardRef<HTMLInputElement, FormControlProps>(({
																	type,
																	id,
																	name,
																	readOnly,
																	as: Component = 'input',
																	size = 'md',
																	errors,
																	...props
																}, ref) => {
	const {controlId} = useContext(FormContext);

	return (
		<>
			<div className="flex items-center">
				<Component
					{...props}
					ref={ref}
					id={id || controlId}
					name={name}
					type={type}
					readOnly={readOnly}
					className={
						classNames(
							'disabled:bg-gray-100 bg-white block w-full border border-gray-300 rounded-md shadow-sm focus:outline-none sm:text-sm',
							errors?.[name] ? 'border-red-300 focus:ring-red-500 focus:border-red-500' : undefined,
							!errors?.[name] ? 'border-gray-300 focus:ring-primary-500 focus:border-primary-500' : undefined,
							size === 'md' ? 'py-2 px-3' : undefined,
							size === 'sm' ? 'py-1 px-2' : undefined
						)
					}
				/>
			</div>
			{
				errors ?
					<ErrorMessage
						errors={errors}
						name={name}
						render={({messages, message}) => {
							if (message) {
								return (<p className="text-red-500" key={type}>{message}</p>)
							} else if (messages) {
								return Object.entries(messages).map(([type, message]) => (
									<p className="text-red-500" key={type}>{message}</p>
								));
							}
						}}
					/>
					: null
			}
		</>
	)
})

export default FormControl;