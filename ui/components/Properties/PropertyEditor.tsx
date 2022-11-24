import {Controller} from "react-hook-form";
import FormControl from "../forms/FormControl";
import FormGroup from "../forms/FormGroup";
import FormLabel from "../forms/FormLabel";

interface PropertyEditorProps {
	name: string
	editor?: string;
	title?: string;
}

const PropertyEditor = ({
							name,
							editor = 'text',
							title,
							...props
						}: PropertyEditorProps) => {
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

export default PropertyEditor;