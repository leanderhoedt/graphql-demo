interface CellItemProps {
    type?: string;
    value?: any;
}

const CellItem = ({
                      type,
                      value
                  }: CellItemProps) => {
    return (
        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-800 truncate">
            {value}
        </td>
    )
}

export default CellItem;