import {useState, useEffect} from "react";
import PropTypes from "prop-types";
import {gql, useMutation, useQuery} from "@apollo/client";
import SelectMenu from "../../../components/SelectMenu";
import SpeakerItem from "./SpeakerItem";

const GET_PERSONS = gql`
	query GetPersons {
		persons {
			id, name
		}
	}
`;

const GET_SPEAKERS_BY_TALK = gql`
	query GetSpeakersByTalk($id: Long!) {
		talk(id: $id) {
			speakers {
				id, name
			}
		}
	}
`;

const ADD_SPEAKER_TO_TALK = gql`
	mutation AddSpeakerToTalk($talkId: Long!, $speakerId: Long!) {
		addSpeakerToTalk(talkId: $talkId, speakerId: $speakerId) {
			id, title, summary, speakers {
				id, name
			}
		}
	}
`;

const AddSpeakersToTalk = ({id}) => {
	const [selectedSpeaker, setSelectedSpeaker] = useState();
	const {
		loading: personsLoading,
		error: personsError,
		data: {persons = []} = {}
	} = useQuery(GET_PERSONS);

	const {
		loading: talkSpeakersLoading,
		error: talkSpeakersError,
		data: {talk: {speakers: talkSpeakers = []} = {}} = {}
	} = useQuery(GET_SPEAKERS_BY_TALK, {
		skip: !id,
		variables: {id},
	});

	useEffect(() => {
		if (persons?.length > 0) setSelectedSpeaker({
			id: persons[0]?.id,
			title: persons[0]?.name
		});
	}, [persons]);

	const [addSpeakerToTalk, {}] = useMutation(ADD_SPEAKER_TO_TALK, {
		update(cache, {data: {addSpeakerToTalk}}) {
			const speakersToAdd = addSpeakerToTalk?.speakers;
			cache.writeQuery({
				query: GET_SPEAKERS_BY_TALK,
				variables: {id},
				data: {
					talk: {
						speakers: [...speakersToAdd]
					}
				}
			})
		}
	})

	const onSelectedSpeaker = async (speaker) => {
		setSelectedSpeaker(speaker);
		await addSpeakerToTalk({
			variables: {talkId: id, speakerId: speaker?.id}
		})
	}

	return (
		<div className="bg-white px-4 py-5 shadow sm:rounded-lg sm:px-6">
			<div className="bg-white px-4 py-5 sm:p-2">
				<h2 className="text-lg font-medium text-gray-900">
					Talks
				</h2>
				<div className="mt-6">
					<SelectMenu
						label="Add talk to conference"
						options={persons.filter((t => talkSpeakers.some(ct => ct.id !== t.id))).map(({id, name}) => ({
							id,
							title: name
						}))}
						selected={selectedSpeaker}
						setSelected={onSelectedSpeaker}
					/>
					<ul role="list" className="mt-2 divide-y divide-gray-200 max-h-96 overflow-auto">
						{
							talkSpeakers.map((talk) => <SpeakerItem {...talk}/>)
						}
					</ul>
				</div>
			</div>
		</div>
	)
}

AddSpeakersToTalk.propTypes = {
	id: PropTypes.string,
};

export default AddSpeakersToTalk;