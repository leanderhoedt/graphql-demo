import {ChangeEvent, ReactNode} from "react";
import {classNames} from '../../utils';

interface ButtonProps {
    className?: string;
    variant?: "primary" | "danger";
    children?: ReactNode[] | ReactNode;
    startIcon?: ReactNode[] | ReactNode;

    onClick?: (e: ChangeEvent<HTMLInputElement>) => void;

    type?: "submit" | "button";
    size?: "xs" | "sm" | "md" | "lg" | "xl";
    disabled?: boolean
}


const Button = ({
                    className,
                    children,
                    variant,
                    startIcon,
                    size = 'md',
                    disabled,
                    ...props
                }: ButtonProps) => {
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
                disabled ? 'cursor-auto' : undefined,
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

export default Button;