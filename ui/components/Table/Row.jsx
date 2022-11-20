import PropTypes from "prop-types";
import CellItem from "./CellItem";
import {classNames} from "../../utils";
import Table from "./index";
import Checkbox from "../Checkbox";

/**
 * Row Component of Table
 *
 * @param columns
 * @param value
 * @param selected
 * @param setSelected
 * @returns {JSX.Element}
 * @constructor
 */
const Row = ({columns, value, selected = [], setSelected}) => {
	const onRowClick = () => {
		if (selected.includes(value.id)) {
			setSelected(selected.filter(p => p !== value.id));
		} else {
			setSelected([...selected, value.id]);
		}
	};

	return (
		<tr className={classNames('cursor-pointer', selected?.includes(value.id) ? 'bg-gray-50' : undefined)} onClick={onRowClick}>
			<td className="relative w-12 px-6 sm:w-16 sm:px-8">
				{
					selected.includes(value.id) && (
						<div className="absolute inset-y-0 left-0 w-0.5 bg-primary-600"/>
					)}
				<Checkbox
					value={value.id}
					checked={selected.includes(value.id)}
					onChange={(e) =>
						setSelected(
							e.target.checked
								? [...selected, value.id]
								: selected.filter((p) => p !== value.id)
						)
					}
				/>
			</td>
			{
				Object.values(columns).map(({field, type}, index) => (
					<CellItem
						key={index}
						value={value[field]}
						type={type}
					/>
				))
			}
		</tr>
	)
}

Row.propTypes = {
	columns: PropTypes.arrayOf(
		PropTypes.shape({
			field: PropTypes.string.isRequired,
			type: PropTypes.string
		}),
	),
	value: PropTypes.object,
	selected: PropTypes.arrayOf(PropTypes.string),
	setSelected: PropTypes.func,
}

export default Row;