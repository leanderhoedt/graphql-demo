import PropTypes from "prop-types";
import {memo} from "react";
import PropertyEditor from "./PropertyEditor";

const PropertiesGrid = ({fields = {}, control}) => {
	return (
		<div className="grid grid-cols-6 gap-2">
			{
				fields.map((field) => <PropertyEditor
						key={field.name}
						control={control}
						{...field}
					/>
				)
			}
		</div>
	)
}

PropertiesGrid.propTypes = {
	fields: PropTypes.arrayOf(PropTypes.shape({
		name: PropTypes.string.isRequired
	})),
	control: PropTypes.object,
}
export default memo(PropertiesGrid);