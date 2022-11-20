import {useEffect} from "react";
import PropTypes from "prop-types";
import {useForm} from "react-hook-form";
import Button from "../Button";
import PropertiesForm from "./PropertiesGrid";

/**
 * The Properties component is a panel with a form and submit button
 * This component makes use of react-hook-form
 * @param title
 * @param children
 * @param fields
 * @param values
 * @param submit
 * @returns {JSX.Element}
 * @constructor
 */
const Properties = ({title, children, fields, values, onSubmit}) => {
	const {
		control,
		reset,
		handleSubmit,
		formState:{isDirty}
	} = useForm();

	useEffect(() => {
		if (values) {
			reset({
				...values,
			});
		}
	}, [values, reset]);

	return (
		<form
			className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6"
			onSubmit={handleSubmit(onSubmit)}
		>
			<div className="bg-white px-4 py-5 sm:p-2">
				<h2 className="text-lg font-medium text-gray-900">
					{title}
				</h2>
				<div className="mt-6">
					<PropertiesForm
						control={control}
						fields={fields}
						values={values}
					/>
					{children}
				</div>
			</div>
			<div className="px-4 py-3 text-right sm:px-2">
				<Button
					type="submit"
					variant="primary"
					disabled={!isDirty}
				>
					Save
				</Button>
			</div>
		</form>
	)
}

Properties.propTypes = {
	title: PropTypes.string,
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	fields: PropTypes.array,
	values: PropTypes.object,
	onSubmit: PropTypes.func.isRequired
}

export default Properties;