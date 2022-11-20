import PropTypes from 'prop-types';
import {classNames} from '../../utils';


const Button = ({className, children, variant, startIcon, size = 'md', ...props}) => {
	return (
		<button
			type='button'
			className={classNames(
				'inline-flex items-center border rounded-md shadow-sm font-medium',
				size === 'xs' && 'px-2.5 py-1.5 text-xs',
				size === 'sm' && 'px-3 py-2 text-sm leading-4',
				size === 'md' && 'px-4 py-2 text-sm',
				size === 'lg' && 'px-4 py-2 text-base',
				size === 'xl' && 'px-6 py-3 text-base',
				variant ?
					'border-transparent text-white'
					: 'border-gray-300 text-gray-700 bg-white hover:bg-gray-50 disabled:bg-gray-200',
				variant === 'primary' && 'bg-primary-600 hover:bg-primary-700 focus:ring-primary-500 disabled:bg-primary-200',
				variant === 'danger' && 'bg-red-600 hover:bg-red-700 focus:ring-red-500 disabled:bg-red-200',
				'focus:outline-none focus:ring-2 focus:ring-offset-2',
				props.disabled && 'cursor-auto',
				className,
			)}
			{...props}
		>
			{
				startIcon ?
					<div className="mr-1">
						{startIcon}
					</div>
					: null
			}
			{children}
		</button>
	);
};

Button.propTypes = {
	className: PropTypes.string,
	variant: PropTypes.oneOf(['primary', 'danger']),
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	startIcon: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node
	]),
	onClick: PropTypes.func,
	type: PropTypes.oneOf(['submit', 'button']),
	size: PropTypes.oneOf(['xs', 'sm', 'md', 'lg', 'xl'])
}

export default Button;