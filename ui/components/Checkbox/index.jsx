import PropTypes from "prop-types";
import {forwardRef} from "react";

const Checkbox = forwardRef(({value, checked, onChange}, ref) => (
	<input
		ref={ref}
		type="checkbox"
		className="cursor-pointer absolute left-4 top-1/2 -mt-2 h-4 w-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500 sm:left-6"
		value={value}
		checked={checked}
		onChange={onChange}
	/>
))

Checkbox.propTypes = {
	value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
	checked: PropTypes.bool,
	onChange: PropTypes.func
}

export default Checkbox;