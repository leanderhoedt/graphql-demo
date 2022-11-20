import {Dialog, Transition} from '@headlessui/react';
import {Fragment, useState} from "react";
import {
	PresentationChartLineIcon,
	BuildingLibraryIcon,
	UserIcon,
	XMarkIcon,
} from '@heroicons/react/24/outline';
import {useRouter} from "next/router";
import NavBarItem from "./NavBarItem";
import {classNames} from "../../utils";

/**
 * Component for showing the navigation items of the entities
 *
 * @Component
 */
const NavBar = () => {
	const [sidebarOpen, setSidebarOpen] = useState(false);
	const navigation = [
		{
			name: 'Conferences',
			href: '/conferences',
			icon: BuildingLibraryIcon,
		}, {
			name: 'Talks',
			href: '/talks',
			icon: PresentationChartLineIcon
		}, {
			name: 'Persons',
			href: '/persons',
			icon: UserIcon,
		}
	];

	const router = useRouter();

	return (
		<>
			<Transition.Root show={sidebarOpen} as={Fragment}>
				<Dialog as="div" className="relative z-40 md:hidden" onClose={setSidebarOpen}>
					<Transition.Child
						as={Fragment}
						enter="transition-opacity ease-linear duration-300"
						enterFrom="opacity-0"
						enterTo="opacity-100"
						leave="transition-opacity ease-linear duration-300"
						leaveFrom="opacity-100"
						leaveTo="opacity-0"
					>
						<div className="fixed inset-0 bg-gray-600 bg-opacity-75"/>
					</Transition.Child>

					<div className="fixed inset-0 z-40 flex">
						<Transition.Child
							as={Fragment}
							enter="transition ease-in-out duration-300 transform"
							enterFrom="-translate-x-full"
							enterTo="translate-x-0"
							leave="transition ease-in-out duration-300 transform"
							leaveFrom="translate-x-0"
							leaveTo="-translate-x-full"
						>
							<Dialog.Panel className="relative flex w-full max-w-xs flex-1 flex-col bg-white pt-5 pb-4">
								<Transition.Child
									as={Fragment}
									enter="ease-in-out duration-300"
									enterFrom="opacity-0"
									enterTo="opacity-100"
									leave="ease-in-out duration-300"
									leaveFrom="opacity-100"
									leaveTo="opacity-0"
								>
									<div className="absolute top-0 right-0 -mr-14 p-1">
										<button
											type="button"
											className="flex h-12 w-12 items-center justify-center rounded-full focus:bg-gray-600 focus:outline-none"
											onClick={() => setSidebarOpen(false)}
										>
											<XMarkIcon className="h-6 w-6 text-white" aria-hidden="true"/>
											<span className="sr-only">Close sidebar</span>
										</button>
									</div>
								</Transition.Child>
								<div className="flex flex-shrink-0 items-center px-4">
									<img
										className="h-8 w-auto"
										src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
										alt="Easywire"
									/>
								</div>
								<div className="mt-5 h-0 flex-1 overflow-y-auto">
									<nav className="flex h-full flex-col">
										<div className="space-y-1">
											{navigation.map((item) => (
												<a
													key={item.name}
													href={item.href}
													className={classNames(
														router?.pathname?.startsWith(item.href)
															? 'bg-primary-50 border-primary-600 text-primary-600'
															: 'border-transparent text-gray-600 hover:bg-gray-50 hover:text-gray-900',
														'group border-l-4 py-2 px-3 flex items-center text-base font-medium'
													)}
													aria-current={item.current ? 'page' : undefined}
												>
													{item?.icon ?
														<item.icon
															className={classNames(
																item.current ? 'text-primary-500' : 'text-gray-400 group-hover:text-gray-500',
																'mr-4 flex-shrink-0 h-6 w-6'
															)}
															aria-hidden="true"
														/>
														: null
													}
													{item.name}
												</a>
											))}
										</div>
									</nav>
								</div>
							</Dialog.Panel>
						</Transition.Child>
						<div className="w-14 flex-shrink-0" aria-hidden="true">
							{/* Dummy element to force sidebar to shrink to fit close icon */}
						</div>
					</div>
				</Dialog>
			</Transition.Root>
			<div className="hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col">
				{/* Sidebar component, swap this element with another sidebar if you like */}
				<nav className="flex flex-grow flex-col overflow-y-auto border-r border-gray-100 bg-gray-50 pt-5 pb-4">
					<div className="flex flex-shrink-0 items-center px-4">
						<img
							className="h-8 w-auto"
							src="https://tailwindui.com/img/logos/mark.svg?color=orange&shade=600"
							alt="Easywire"
						/>
					</div>
					<div className="mt-5 flex-grow">
						<div className="space-y-1">
							{
								navigation.map((item) => (
									<NavBarItem
										key={item?.name}
										{...item}
										current={router?.pathname?.startsWith(item.href)}
									/>
								))
							}
						</div>
					</div>
				</nav>
			</div>
		</>
	)
}

export default NavBar;