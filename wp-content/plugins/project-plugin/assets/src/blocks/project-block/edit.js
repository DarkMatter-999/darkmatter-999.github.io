import {
	useBlockProps,
	InspectorControls,
	InnerBlocks,
} from '@wordpress/block-editor';
import { ComboboxControl, PanelBody } from '@wordpress/components';
import { __ } from '@wordpress/i18n';

import './editor.css';
import { useState, useEffect, useRef } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

const Edit = ( { attributes, setAttributes } ) => {
	const { title, excerpt, thumbnail, thumbnailUrl, link, id } = attributes; // eslint-disable-line no-unused-vars

	const [ postId, setPostId ] = useState( id );

	const [ searchKey, setSearchKey ] = useState( title );
	const [ debouncedSearchKey, setDebouncedSearchKey ] = useState( searchKey );
	const debounceRef = useRef( null );

	useEffect( () => {
		if ( debounceRef.current ) {
			clearTimeout( debounceRef.current );
		}

		debounceRef.current = setTimeout( () => {
			setDebouncedSearchKey( searchKey );
		}, 500 );

		return () => {
			clearTimeout( debounceRef.current );
		};
	}, [ searchKey ] );

	const searchResults = useSelect(
		( select ) => {
			if ( ! debouncedSearchKey || debouncedSearchKey.length < 2 ) {
				return [];
			}

			const projects = select( 'core' ).getEntityRecords(
				'postType',
				'dm_project',
				{
					search: debouncedSearchKey,
					per_page: 5,
				}
			);

			if ( projects && projects.length ) {
				return projects.map( ( post ) => ( {
					label: post.title.raw,
					value: post.id,
				} ) );
			}

			return [];
		},
		[ debouncedSearchKey ]
	);

	const project = useSelect(
		( select ) => {
			if ( ! postId || isNaN( postId ) ) {
				return null;
			}

			return select( 'core' ).getEntityRecord(
				'postType',
				'dm_project',
				postId
			);
		},
		[ postId ]
	);

	const imageUrl = useSelect(
		( select ) => {
			if ( ! project?.featured_media ) {
				return null;
			}
			return select( 'core' ).getMedia( project.featured_media );
		},
		[ project?.featured_media ]
	);

	useEffect( () => {
		if ( ! postId ) {
			return;
		}

		if ( project ) {
			setAttributes( {
				title: project?.title?.raw,
				excerpt: project?.excerpt?.raw,
				thumbnail: `${ project?.featured_media }`,
				thumbnailUrl: imageUrl?.source_url,
				link: project.link,
				externalLink: project?.meta?.dm_project_link,
				id: postId,
			} );
		} else if ( id !== postId ) {
			setAttributes( {
				id: postId,
			} );
		}
	}, [ project, postId, imageUrl, id ] ); // eslint-disable-line react-hooks/exhaustive-deps

	let template = [];

	const onChangePostId = ( value ) => {
		setPostId( value );
	};

	const onChangeSearchKey = ( value ) => {
		setSearchKey( value );
	};

	const isNotFound = postId && project === undefined;
	const hasProjectData = !! project && id && !! imageUrl?.source_url;

	if ( hasProjectData ) {
		template = [
			[
				'core/media-text',
				{
					mediaId: project.featured_media,
					mediaUrl: imageUrl.source_url,
					mediaType: 'image',
					imageFill: true,
				},
				[
					[
						'core/heading',
						{
							content: `<a href="${ project.link }">${ project.title.raw }</a>`,
							level: 3,
						},
					],
					[ 'core/paragraph', { content: project.excerpt.raw } ],
					[
						'core/button',
						{
							text: __( 'View Project', 'dm-project-plugin' ),
							url: project.meta?.dm_project_link,
						},
					],
				],
			],
		];
	}

	return (
		<div { ...useBlockProps() }>
			<InspectorControls>
				<PanelBody>
					<ComboboxControl
						__next40pxDefaultSize
						__nextHasNoMarginBottom
						label={ __( 'Search Projects', 'dm-project-plugin' ) }
						value={ postId }
						onChange={ onChangePostId }
						onFilterValueChange={ onChangeSearchKey }
						options={ searchResults }
					/>
				</PanelBody>
			</InspectorControls>

			{ hasProjectData ? (
				<InnerBlocks
					key={ postId }
					allowedBlocks={ [ 'core/media-text' ] }
					template={ template }
					templateLock="all"
				/>
			) : (
				<div
					className="dm-project-placeholder"
					style={ {
						padding: '20px',
						border: '1px dashed #ccc',
						textAlign: 'center',
						minHeight: '100px',
						display: 'flex',
						alignItems: 'center',
						justifyContent: 'center',
						fontSize: '14px',
						color: '#555',
						backgroundColor: '#f0f0f0',
					} }
				>
					{ postId // eslint-disable-line no-nested-ternary
						? isNotFound
							? __( 'Project ID not found.', 'dm-project-plugin' )
							: __(
									'Enter a valid Project ID in the Inspector Controls.',
									'dm-project-plugin'
							  )
						: __(
								'Please enter a Project ID in the Inspector Controls to display content.',
								'dm-project-plugin'
						  ) }
				</div>
			) }
		</div>
	);
};

export default Edit;
