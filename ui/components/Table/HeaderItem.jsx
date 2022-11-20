import PropTypes from "prop-types";

const HeaderItem = ({title}) => {
	return (
		<th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
			{title}
		</th>
	)
}

HeaderItem.propTypes = {
	title: PropTypes.string.isRequired
}

export default HeaderItem;