import PropTypes from "prop-types";
import {useQuery} from "@apollo/client";
import Properties from "../../../components/Properties";
import {gql} from "@apollo/client";
import AddSpeakersToTalk from "./AddSpeakersToTalk";

const GET_TALK = gql`
	query GetTalk($id: Long!) {
		talk(id: $id) {
			id, title, summary
		}
	}
`;

const TalkDetails = ({id}) => {
	const {loading, error, data: {talk} = {}} = useQuery(GET_TALK, {
		skipp: !id,
		variables: {id},
	});
	// There's no method to update talk properties
	// const [updateTalk, {}]=useMutation();

	const submit = (talk) => {
		console.log(talk);
		//updateTalk(talk);
	}

	return (
		<div className="space-y-4">
			<Properties
				title={talk?.title}
				onSubmit={submit}
				fields={[
					{
						name: 'title',
						title: 'Title',
						editor: 'text',
					}, {
						name: 'summary',
						title: 'Summary',
						editor: 'textarea',
					}
				]}
				values={{...talk}}
			/>
			<AddSpeakersToTalk
				id={id}
			/>
		</div>
	)
}

TalkDetails.propTypes = {
	id: PropTypes.string
}

export default TalkDetails;