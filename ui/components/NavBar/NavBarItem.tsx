import {ElementType} from "react";
import {classNames} from "../../utils";

interface NavBarItemProps {
 name: string;
 href: string;
 current?: boolean;
 icon?: ElementType;
}

/**
 * Component for rendering a NavBar Item
 *
 * @param name
 * @param href
 * @param current
 * @param icon
 * @returns {JSX.Element}
 * @constructor
 */
const NavBarItem = ({
 name,
 href,
 current,
 icon
}: NavBarItemProps) => {
    return(
        <a
            href={href}
            className={classNames(
                current
                    ? 'bg-primary-50 border-primary-600 text-primary-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-50',
                'cursor-pointer group border-l-4 py-2 px-3 flex items-center text-sm font-medium'
            )}
        >
            {
                icon ?
                    <icon
                        className={classNames(
                            current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
                            'mr-3 flex-shrink-0 h-6 w-6'
                        )}
                        aria-hidden="true"
                    />
                    : null
            }
            {name}
        </a>
    )
}

export default NavBarItem;
