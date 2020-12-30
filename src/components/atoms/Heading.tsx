import { Helmet } from 'react-helmet';

interface HeadingInterface {
	title: string;
	ogDescription: string;
	ogTitle: string;
}

const Heading = (props: HeadingInterface) => {
	const { title, ogDescription, ogTitle } = props;

	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:description" content={ogDescription} />
			<meta property="og:title" content={ogTitle} />
		</Helmet>
	);
};
Heading.defaultProps = {
	title: '',
	ogDescription: 'SUNDY PORTAL - CONTENT',
	ogTitle: 'SUNDY PORTAL',
};

export default Heading;
