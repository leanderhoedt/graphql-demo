import {useEffect, useState} from 'react';
import {gql, useQuery} from "@apollo/client";
import Button from '../../../components/Button';
import Table from '../../../components/Table';
import TalkDetails from "./TalkDetails";
import CreateTalkModal from "./CreateTalkModal";

const columnDefinitions = [
	{
		field: 'title',
		title: 'Title',
	}, {
		field: 'summary',
		title: 'Summary',
	}
]

const GET_TALKS = gql`
  query GetTalks {
		talks {
			id, title, summary
		}
	}
`;


const TalksOverview = () => {
	const [selectedTalks, setSelectedTalks] = useState([]);
	const [showCreateTalk, setShowCreateTalk] = useState(false);
	const {
		loading,
		error,
		data: {
			talks = []
		} = {}
	} = useQuery(GET_TALKS);

	useEffect(() => {
		if (talks?.length > 0) {
			setSelectedTalks([talks[0].id]);
		}
	}, [talks]);
  return(
		<>
			<div className="px-4 sm:px-6 lg:px-8">
				<div className="sm:flex sm:items-center">
					<div className="sm:flex-auto">
						<h1 className="text-xl font-semibold text-gray-900">
							Talks
						</h1>
						<p className="mt-2 text-sm text-gray-700">
							A list of all the talks including their title, summary, speakers.
						</p>
					</div>
					<div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
						<Button
							variant="primary"
							onClick={() => setShowCreateTalk(true)}
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
									data={talks}
									selected={selectedTalks}
									setSelected={setSelectedTalks}
								/>
							</main>

							<aside className="hidden w-96 overflow-y-auto border-l border-gray-200 bg-white px-8 py-2 lg:block">
								<TalkDetails
									id={selectedTalks[0]}
								/>
							</aside>

						</div>

					</div>
				</div>
			</div>
			<CreateTalkModal
				open={showCreateTalk}
				setOpen={setShowCreateTalk}
			/>
		</>
	)
}

export default TalksOverview;