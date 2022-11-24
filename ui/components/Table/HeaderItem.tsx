interface HeaderItemProps {
    title: string;
}

const HeaderItem = ({title}: HeaderItemProps) => {
    return (
        <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900">
            {title}
        </th>
    )
}

export default HeaderItem;