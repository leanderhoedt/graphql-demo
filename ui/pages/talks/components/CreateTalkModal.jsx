import {Dialog} from "@headlessui/react";
import Modal from "../../../components/Modal";
import FormGroup from "../../../components/forms/FormGroup";
import FormLabel from "../../../components/forms/FormLabel";
import {Controller, useForm} from "react-hook-form";
import FormControl from "../../../components/forms/FormControl";
import {gql, useMutation} from "@apollo/client";
import PropTypes from "prop-types";

const CREATE_TALK = gql`
	mutation AddTalk($talk: InputTalk!) {
		addTalk(talk: $talk) {
			id, title, summary
		}
	}
`;

const CreateTalkModal = ({open, setOpen}) => {
	const {control, handleSubmit} = useForm();

	const updateTalksCache = (cache, {data: {addTalk}}) => {
		cache.modify({
			fields: {
				talks(existingTalks = []) {
					const newTalkRef = cache.writeFragment({
						data: addTalk,
						fragment: gql`
							fragment NewTalk on talks {
								id
								title
								summary
							}
						`
					});
					return [newTalkRef, ...existingTalks];
				}
			}
		})
	}

	const [createTalk, {data, loading, error}] = useMutation(CREATE_TALK, {update: updateTalksCache});

	const submit = async (talk) => {
		try {
			await createTalk({variables: {talk: {...talk}}});
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
							Create Talk
						</Dialog.Title>
						<div className="mt-2">
							<p className="text-sm text-gray-500">
								<div className="grid grid-cols-6 gap-2">
									<FormGroup>
										<FormLabel>
											Title
										</FormLabel>
										<Controller
											name="title"
											control={control}
											render={({field}) => (
												<FormControl
													{...field}
													placeholder="Title"
												/>
											)}
										/>
									</FormGroup>
									<FormGroup>
										<FormLabel>
											Summary
										</FormLabel>
										<Controller
											name="summary"
											control={control}
											render={({field}) => (
												<FormControl
													{...field}
													placeholder="Summary"
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

CreateTalkModal.propTypes = {
	open: PropTypes.bool,
	setOpen: PropTypes.func
}


export default CreateTalkModal;
