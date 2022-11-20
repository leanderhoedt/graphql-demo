import PropTypes from "prop-types";

const CellItem = ({type, value}) => {
	return(
		<td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 truncate">
			{value}
		</td>
	)
}

CellItem.propTypes = {
	type: PropTypes.string,
	value: PropTypes.any
}

export default CellItem;