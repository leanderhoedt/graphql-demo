import {Controller} from "react-hook-form";
import PropTypes from "prop-types";
import FormControl from "../forms/FormControl";
import FormGroup from "../forms/FormGroup";
import FormLabel from "../forms/FormLabel";

const PropertyEditor = ({name, editor = 'text', title, ...props}) => {
	let components = {
		text: ({control, editorParams}) => {
			return (
				<Controller
					name={name}
					control={control}
					render={({field}) => {
						return (
							<FormControl
								{...props}
								{...editorParams}
								{...field}
							/>
						)
					}}
				/>
			)
		},
		textarea: ({control, editorParams}) => {
			return (
				<Controller
					name={name}
					control={control}
					render={({field}) => {
						return (
							<FormControl
								as="textarea"
								rows={3}
								{...props}
								{...editorParams}
								{...field}
							/>
						)
					}}
				/>
			)
		}
	}

	const Component = components[editor];

	return (
		<FormGroup controlId={name}>
			<FormLabel>{title}</FormLabel>
			<Component
				{...props}
			/>
		</FormGroup>
	)

}

PropertyEditor.propTypes = {
	editor: PropTypes.string,
	title: PropTypes.string,
}

export default PropertyEditor;