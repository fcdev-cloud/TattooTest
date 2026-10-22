<?php

if ( ! defined( 'ABSPATH' ) ) {
	exit; // Exit if accessed directly.
}

// Add security headers to site. Prevent resource blocks
function update_headless_security_headers() {
    header('Cross-Origin-Embedder-Policy: unsafe-none', true);
    header('Cross-Origin-Resource-Policy: cross-origin', true);
}

add_action('send_headers', 'update_headless_security_headers', 10);

// Disable block editor
add_filter( 'use_block_editor_for_post', '__return_false', 100 );

add_action( 'after_setup_theme', function(){
    add_theme_support( 'post-thumbnails' );
});

//Remove editor field support
add_action( 'init', function() {
    // Remove from standard Pages
    remove_post_type_support( 'page', 'editor' );
}, 100 );


function var_error_log($object = null) {
    ob_start();                    // Start buffer capture
    var_dump($object);             // Dump the values
    $contents = ob_get_contents(); // Put the buffer into a variable
    ob_end_clean();                // End and clear capture buffer
    error_log($contents);          // Log the contents to the PHP error log
}

// Convert Image files to webp on upload
add_filter('wp_handle_upload', 'convert_uploaded_image_to_webp');
function convert_uploaded_image_to_webp($upload) {
    // Check if there was an error during upload
    if (isset($upload['error']) && $upload['error']) {
        return $upload;
    }

    $file_path = $upload['file'];
    $file_type = wp_check_filetype($file_path);
    $allowed_extensions = ['jpg', 'jpeg', 'png'];

    if (in_array(strtolower($file_type['ext']), $allowed_extensions)) {
        
        $image_editor = wp_get_image_editor($file_path);

        if (!is_wp_error($image_editor)) {
            $path_info = pathinfo($file_path);
            $dirname   = $path_info['dirname'];
            $filename  = $path_info['filename'];

            $webp_file_path = $dirname . '/' . $filename . '.webp';

            $image_editor->set_quality(70);
            $saved_image = $image_editor->save($webp_file_path, 'image/webp');

            if (!is_wp_error($saved_image) && file_exists($saved_image['path'])) {
                
                @unlink($file_path);

                // Re-route WordPress attachment parameters to the new WebP details
                $upload['file'] = $saved_image['path'];
                $upload['url']  = str_replace(basename($upload['url']), basename($saved_image['path']), $upload['url']);
                $upload['type'] = 'image/webp';
            }
        }
    }

    return $upload;
}


function acf_wysiwyg_palette( $init ) {
    $custom_colors = '
        "000000", "Black",
        "FFFFFF", "White",
        "FFCE00", "Brand Yellow"
    ';

    $init['textcolor_map'] = '[' . $custom_colors . ']';
    

    return $init;
}

add_filter( 'tiny_mce_before_init', 'acf_wysiwyg_palette' );


//GSD Image Sizes

add_action('after_setup_theme', 'image_sizes');

function image_sizes() {
    add_image_size('media-content-1-small', 235, 369, false); 
    add_image_size('media-content-1-large', 481, 757, false);

    add_image_size('media-content-2', 175, 389, false);

    add_image_size('media-content-3', 585, 967, false);
    add_image_size('media-content-4', 687, 335, false);

    add_image_size('cta-small', 376, 687, false);
    add_image_size('cta-large', 1920, 821, false);
}



function register_team_members_cpt() {
    $labels = array(
        'name'               => _x( 'Team Members', 'post type general name' ),
        'singular_name'      => _x( 'Team Member', 'post type singular name' ),
        'menu_name'          => _x( 'Team Members', 'admin menu' ),
        'name_admin_bar'     => _x( 'Team Member', 'add new on admin bar' ),
        'add_new'            => _x( 'Add New', 'team member' ),
        'add_new_item'       => __( 'Add New Team Member' ),
        'new_item'           => __( 'New Team Member' ),
        'edit_item'          => __( 'Edit Team Member' ),
        'view_item'          => __( 'View Team Member' ),
        'all_items'          => __( 'All Team Members' ),
        'search_items'       => __( 'Search Team Members' ),
        'parent_item_colon'  => __( 'Parent Team Members:' ),
        'not_found'          => __( 'No team members found.' ),
        'not_found_in_trash' => __( 'No team members found in Trash.' )
    );

    $args = array(
        'labels'             => $labels,
        'public'             => true,
        'publicly_queryable' => true,
        'show_ui'            => true,
        'show_in_menu'       => true,
        'query_var'          => true,
        'rewrite'            => array( 'slug' => 'team-members' ),
        'capability_type'    => 'post',
        'has_archive'        => true,
        'hierarchical'       => false,
        'menu_position'      => 20,
        'menu_icon'          => 'dashicons-businessperson',
        'show_in_rest'       => true,
        'show_in_graphql'     => true,
        'graphql_single_name' => 'teamMember',
        'graphql_plural_name' => 'teamMembers',
        'supports'           => array( 'title', 'thumbnail', 'excerpt' )
    );

    register_post_type( 'team_member', $args );
}
add_action( 'init', 'register_team_members_cpt' );




// Graph QL Last Name Metadata Query
add_filter('graphql_PostObjectsConnectionOrderbyEnum_values', function($values) {
	$values['LAST_NAME'] = [
		'value'       => 'last_name_sort',
		'description' => __('Order entries alphabetically by last name', 'tattoo_test'),
	];
	return $values;
});

add_filter('graphql_post_object_connection_query_args', function($query_args, $source, $args, $context, $info) {
	if (isset($args['where']['orderby'])) {
		foreach ($args['where']['orderby'] as $orderby) {
			if ('last_name_sort' === $orderby['field']) {
				$order = $orderby['order'] ?? 'ASC';

				$query_args['meta_query'] = [
					'last_name_alpha'  => [
						'key'     => 'last_name',
						'compare' => 'EXISTS',
					],
					'first_name_alpha' => [
						'key'     => 'first_name',
						'compare' => 'EXISTS',
					],
				];

				$query_args['orderby'] = [
					'last_name_alpha'  => $order,
					'first_name_alpha' => $order,
				];
			}
		}
	}
	return $query_args;
}, 10, 5);