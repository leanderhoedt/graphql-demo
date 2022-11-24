import {useLayoutEffect, useRef, useState} from "react";
import HeaderItem from "./HeaderItem";
import Row from "./Row";
import Checkbox from "../Checkbox";
import Button from "../Button";

interface TableProps {
	columns: {
		field: string,
			title: string
	}[];
	data: unknown[] // also needs required ID field !!;
	selected?: string[];
	setSelected?(...args: unknown[]): unknown;
}

/**
 * Table component to render columns with header and render the data
 *
 * @param columns - render headers and custom cells
 * @param data - render items
 * @param selected - show selected item
 * @param setSelected - alter the selected items
 * @returns {JSX.Element}
 * @constructor
 */
const Table = ({
								 columns,
								 data = [],
								 selected = [],
								 setSelected
							 }: TableProps) => {
	const checkbox = useRef();
	const [checked, setChecked] = useState(false);
	const [indeterminate, setIndeterminate] = useState(false);

	useLayoutEffect(() => {
		const isIndeterminate = selected.length > 0 && selected.length < data.length;
		setChecked(selected.length === data.length);
		setIndeterminate(isIndeterminate);
		if (checkbox?.current) {
			checkbox.current.indeterminate = isIndeterminate;
		}
	}, [selected, checkbox]);

	const toggleAll = () => {
		setSelected(checked || indeterminate ? [] : data.map(({id}) => id));
		setChecked(!checked && !indeterminate);
		setIndeterminate(false);
	}

	return (
		<>
			<div className="inline-block min-w-full max-w-full py-2 align-middle md:px-6 lg:px-8">
				<div className="relative overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
					{selected.length > 0 && (
						<div className="absolute top-0 left-12 flex h-12 items-center space-x-3 bg-gray-50 sm:left-16">
							<Button
								size="xs"
							>
								Delete all
							</Button>
						</div>
					)}
					<table className="min-w-full w-full table-fixed divide-y divide-gray-300">
						<thead className="bg-gray-50">
						<tr>
							<th scope="col" className="relative w-12 px-6 sm:w-16 sm:px-8">
								<Checkbox
									ref={checkbox}
									checked={checked}
									onChange={toggleAll}
								/>
							</th>
							{
								columns.map((item) => (
									<HeaderItem
										key={item?.field}
										title={item?.title}
									/>
								))
							}
						</tr>
						</thead>
						<tbody className="divide-y divide-gray-200 bg-white">
						{
							data.map((value, index) => (
								<Row
									key={value?.id}
									columns={columns}
									value={value}
									selected={selected}
									setSelected={setSelected}
									onClick={setSelected}
								/>
							))
						}
						</tbody>
					</table>
				</div>
			</div>
		</>
	)
}

export default Table;