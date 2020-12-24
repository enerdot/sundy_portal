import GlobalStyled from 'style/GlobalStyled';

interface PageTemplateInterface {
	children: any;
}

const PageTemplate = (props: PageTemplateInterface): JSX.Element => {
	const { children } = props;
	return (
		<GlobalStyled.Body>
			<GlobalStyled.Container>{children}</GlobalStyled.Container>
		</GlobalStyled.Body>
	);
};

PageTemplate.defaultProps = {
	children: '',
};

export default PageTemplate;
