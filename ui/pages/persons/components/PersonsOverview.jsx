import {gql, useQuery} from "@apollo/client";

const GET_PERSONS = gql`
	query GetPersons {
		persons {
			id, name, blog, githubAccount
		}
	}
`;

const PersonsOverview = () => {
	const {
		loading,
		error,
		data: {
			persons = []
		} = {}
	} = useQuery(GET_PERSONS);

	return(
		<div className="bg-white">
			<div className="mx-auto max-w-7xl py-12 px-4 text-center sm:px-6 lg:px-8 lg:py-12">
				<div className="space-y-8 sm:space-y-12">
					<div className="space-y-5 sm:mx-auto sm:max-w-xl sm:space-y-4 lg:max-w-5xl">
						<h2 className="text-3xl font-bold tracking-tight sm:text-4xl">Speakers</h2>
						<p className="text-xl text-gray-500">
							All people that will be speaking at all conferences.
						</p>
					</div>
					<ul
						role="list"
						className="mx-auto grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-4 md:gap-x-6 lg:max-w-5xl lg:gap-x-8 lg:gap-y-12 xl:grid-cols-6"
					>
						{persons.map((person) => (
							<li key={person.name}>
								<div className="space-y-4">
									<img className="mx-auto h-20 w-20 rounded-full lg:h-24 lg:w-24" src="https://i.pravatar.cc" alt="" />
									<div className="space-y-2">
										<div className="text-xs font-medium lg:text-sm">
											<h3>{person.name}</h3>
											<p className="text-indigo-600">{person.blog}</p>
											<p className="text-indigo-600">{person.githubAccount}</p>
										</div>
									</div>
								</div>
							</li>
						))}
					</ul>
				</div>
			</div>
		</div>
	)
}

export default PersonsOverview;