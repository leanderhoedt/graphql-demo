import PropTypes from 'prop-types';
import {useForm, Controller} from 'react-hook-form';
import {Dialog} from '@headlessui/react';
import {gql, useMutation} from "@apollo/client";
import Modal from '../../../components/Modal';
import FormGroup from '../../../components/forms/FormGroup';
import FormLabel from '../../../components/forms/FormLabel';
import FormControl from '../../../components/forms/FormControl';

const CREATE_CONFERENCE = gql`
	mutation AddConference($conference: InputConference!) {
		addConference(conference: $conference) {
			id,
			name,
			city
		}
	}
`;

const CreateConferenceModal = ({open, setOpen}) => {
	const {control, handleSubmit} = useForm();

	const updateConferencesCache = (cache, {data: {addConference}}) => {
		cache.modify({
			fields: {
				conferences(existingConferences = []) {
					const newConferenceRef = cache.writeFragment({
						data: addConference,
						fragment: gql`
							fragment NewConference on conferences {
								id
								name
								city
							}
						`
					});
					return [newConferenceRef, ...existingConferences];
				}
			}
		})
	}

	const [createConference, {data, loading, error}] = useMutation(CREATE_CONFERENCE, {update: updateConferencesCache});

	const submit = async (conference) => {
		try {
			await createConference({variables: {conference: {...conference}}});
			setOpen(false);
		} catch (e) {
			alert(e);
		}
	}

	return (
		<Modal
			open={open}
			setOpen={setOpen}
			sizeClassName="sm:max-w-sm"
			submitBtn={{type: 'submit'}}
			onSubmit={handleSubmit(submit)}
		>
			<div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
				<div className="sm:flex sm:items-start">
					<div className="mt-3 text-center sm:mt-0 sm:text-left w-full">
						<Dialog.Title as="h3" className="text-lg font-medium leading-6 text-gray-900">
							Create Conference
						</Dialog.Title>
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								<div className="grid grid-cols-6 gap-2">
									<FormGroup>
										<FormLabel>
											Name
										</FormLabel>
										<Controller
											name="name"
											control={control}
											render={({field}) => (
												<FormControl
													{...field}
													placeholder="Name"
												/>
											)}
										/>
									</FormGroup>
									<FormGroup>
										<FormLabel>
											City
										</FormLabel>
										<Controller
											name="city"
											control={control}
											render={({field}) => (
												<FormControl
													{...field}
													placeholder="City"
												/>
											)}
										/>
									</FormGroup>
								</div>
							</p>
						</div>
					</div>
				</div>
			</div>
		</Modal>
	)
}

CreateConferenceModal.propTypes = {
	open: PropTypes.bool,
	setOpen: PropTypes.func,
}

export default CreateConferenceModal;