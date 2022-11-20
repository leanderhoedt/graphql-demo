import PropTypes from "prop-types";
import Head from "next/head";
import NavBar from "../NavBar";

/**
 * Component which will be rendered on every page, and contains the elements that need to be rendered
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Index = ({children}) => {
	return (
		<>
			<Head>
				<title>Aptus GraphQL Demo</title>
				<meta name="description" content="Admin application"/>
			</Head>
			<NavBar/>
			<div className="md:pl-64">
				<main className="py-8 xl:py-10">
					{children}
				</main>
			</div>
		</>
	)
}

Index.propTypes = {
	children: PropTypes.element.isRequired
}

export default Index;