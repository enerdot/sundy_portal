import { Helmet } from 'react-helmet';

interface HeadingInterface {
	title: string;
	ogDescription: string;
	ogTitle?: string;
	ogUrl: string;
}

const Heading = (props: HeadingInterface) => {
	const { title, ogDescription, ogTitle, ogUrl } = props;

	return (
		<Helmet>
			<title>{title}</title>
			<meta property="og:description" content={ogDescription} />
			<meta property="og:title" content={ogTitle ? ogTitle : title} />
			<meta property="og:url" content={ogUrl} />
		</Helmet>
	);
};
Heading.defaultProps = {
	title: 'SUNDY PORTAL',
	ogDescription: 'SUNDY PORTAL - CONTENT',
	ogUrl: window.location.href,
};

export default Heading;
