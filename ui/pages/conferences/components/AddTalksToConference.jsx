import {useEffect, useState} from 'react';
import PropTypes from 'prop-types';
import {gql, useMutation, useQuery} from '@apollo/client';
import TalkItem from './TalkItem';
import Index from '../../../components/SelectMenu';

const GET_TALKS_BY_CONFERENCE = gql`
  query GetTalksByConferenceId($id: Long!) {
		conference(id: $id) {
    	talks {
      	id, title
    	}
		}
	}
`;

const GET_TALKS = gql`
	query GetTalks {
		talks {
			id, title, summary
		}
	}
`;

const ADD_TALK_TO_CONFERENCE = gql`
	mutation AddTalkToConference($conferenceId: Long!, $talkId: Long!) {
		addTalkToConference(conferenceId: $conferenceId, talkId: $talkId) {
			id, name, talks { id, title }
		}
	}
`;

const AddTalksToConference = ({id}) => {
	const [selectedTalk, setSelectedTalk] = useState();

	const {
		loading: conferenceTalksLoading,
		error: conferenceTalksError,
		data: {conference: {talks: conferenceTalks = []} = {}} = {}
	} = useQuery(GET_TALKS_BY_CONFERENCE, {
		skip: !id,
		variables: {id},
	});

	const {
		loading: talksLoading,
		error: talksError,
		data: {
			talks = []
		} = {}
	} = useQuery(GET_TALKS);

	const [addTalkToConference, {}] = useMutation(ADD_TALK_TO_CONFERENCE, {
		update(cache, {data: {addTalkToConference}}) {
			const talksToAdd = addTalkToConference?.talks;
			cache.writeQuery({
				query: GET_TALKS_BY_CONFERENCE,
				variables: {id},
				data: {
					conference: {
						talks: [...talksToAdd]
					}
				}
			})
		}
	});

	useEffect(() => {
		if (talks?.length > 0) setSelectedTalk(talks[0]);
	}, [talks]);

	const onSelectedTalk = async (talk) => {
		setSelectedTalk(talk);
		await addTalkToConference({
			variables: {conferenceId: id, talkId: talk?.id}
		});
	}

	return (
		<div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
			<div className="bg-white px-4 py-5 sm:p-2">
				<h2 className="text-lg font-medium text-gray-900">
					Talks
				</h2>
				<div className="mt-6">
					<Index
						label="Add talk to conference"
						options={talks.filter((t => conferenceTalks.some(ct => ct.id !== t.id)))}
						selected={selectedTalk}
						setSelected={onSelectedTalk}
					/>
					<ul role="list" className="mt-2 divide-y divide-gray-200 max-h-96 overflow-auto">
						{
							conferenceTalks.map((talk) => <TalkItem {...talk}/>)
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

AddTalksToConference.propTypes = {
	id: PropTypes.string,
}

export default AddTalksToConference;