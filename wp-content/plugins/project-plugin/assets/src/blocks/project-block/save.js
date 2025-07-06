import { useBlockProps, InnerBlocks } from '@wordpress/block-editor';

const Save = ( { attributes } ) => {
	return attributes.id ? (
		<div { ...useBlockProps.save() }>
			<InnerBlocks.Content />
		</div>
	) : (
		<></>
	);
};

export default Save;
