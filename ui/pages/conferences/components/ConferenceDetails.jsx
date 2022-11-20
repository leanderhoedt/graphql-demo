import {gql, useMutation, useQuery} from "@apollo/client";
import Properties from "../../../components/Properties";
import AddTalksToConference from "./AddTalksToConference";
import PropTypes from "prop-types";

const GET_CONFERENCE = gql`
  query GetConference($id: Long!) {
		conference(id: $id) {
			id, name, city
		}
	}
`;

const ConferenceDetails = ({id}) => {
	const {loading, error, data: {conference} = {}} = useQuery(GET_CONFERENCE, {
		skip: !id,
		variables: {id},
	});
	// There's no method to update conference properties
	// const [updateConference, {}]=useMutation();

	const submit = (conference) => {
		console.log(conference);
		// updateConference();
	}

	if (!id) return null;

	return (
		<div className="space-y-4">
			<Properties
				title={conference?.name}
				onSubmit={submit}
				fields={[
					{
						name: 'name',
						title: 'Name',
						editor: 'text',
					}, {
						name: 'city',
						title: 'City',
						editor: 'text',
					}
				]}
				values={{...conference}}
			/>
			<AddTalksToConference
				id={id}
			/>
		</div>
	)
}

ConferenceDetails.propTypes = {
	id: PropTypes.string
}

export default ConferenceDetails;