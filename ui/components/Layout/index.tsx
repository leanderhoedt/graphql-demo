import {ReactNode} from "react";
import Head from "next/head";
import NavBar from "../NavBar";

interface LayoutProps {
    children: ReactNode[] | ReactNode;
}

/**
 * Component which will be rendered on every page, and contains the elements that need to be rendered
 *
 * @param children
 * @returns {JSX.Element}
 * @constructor
 */
const Layout = ({children}: LayoutProps) => {
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

export default Layout;
