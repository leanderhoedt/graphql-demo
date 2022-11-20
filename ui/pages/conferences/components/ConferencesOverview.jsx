import {useEffect, useState} from "react";
import {useQuery, gql} from '@apollo/client';
import Button from "../../../components/Button";
import Table from "../../../components/Table";
import ConferenceDetails from "./ConferenceDetails";
import CreateConferenceModal from "./CreateConferenceModal";

const columnDefinitions = [
	{
		field: 'name',
		title: 'Name',
	}, {
		field: 'city',
		title: 'City',
	}
];

const GET_CONFERENCES = gql`
  query GetConferences {
		conferences {
			id, name, city
		}
	}
`;

const ConferencesOverview = () => {
	const [selectedConferences, setSelectedConferences] = useState([]);
	const [showCreateConference, setShowCreateConference] = useState(false);
	const {
		loading,
		error,
		data: {
			conferences = []
		} = {}
	} = useQuery(GET_CONFERENCES);

	useEffect(() => {
		if (conferences?.length > 0) {
			setSelectedConferences([conferences[0].id]);
		}
	}, [conferences]);

	return (
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-xl font-semibold text-gray-900">
							Conferences
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the conferences including their name, city, talks.
						</p>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<Button
							variant="primary"
							onClick={() => setShowCreateConference(true)}
						>
							Add
						</Button>
					</div>
				</div>
				<div className="mt-8 flex flex-col">
					<div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
						<div className="flex flex-1 items-stretch overflow-hidden">

							<main className="flex-1 overflow-y-auto">
								<Table
									columns={columnDefinitions}
									data={conferences}
									selected={selectedConferences}
									setSelected={setSelectedConferences}
								/>
							</main>

							<aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white px-8 py-2 lg:block">
								<ConferenceDetails
									id={selectedConferences[0]}
								/>
							</aside>

						</div>

					</div>
				</div>
			</div>
			<CreateConferenceModal
				open={showCreateConference}
				setOpen={setShowCreateConference}
			/>
		</>
	)
}

export default ConferencesOverview;
export {GET_CONFERENCES}
