import {TrashIcon} from "@heroicons/react/24/outline";

const SpeakerItem = ({id, name}) => (
	<li key={id} className="flex items-center justify-between py-3">
		<div className="flex items-center">
			<p className="ml-4 text-sm font-medium text-gray-900">{name}</p>
		</div>
		<button
			type="button"
			className="mx-2 rounded-md bg-white text-sm font-medium hover:bg-red-50 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
		>
			<TrashIcon
				className="text-red-600 w-5 h-5"
			/><span className="sr-only">{name}</span>
		</button>
	</li>
);

export default SpeakerItem;
