<?php

function theme_enqueue_styles() {

	$my_js_ver = date("ymd-Gis", filemtime(plugin_dir_path(__FILE__) . '/dist/app.js'));
	$my_css_ver = date("ymd-Gis", filemtime(plugin_dir_path(__FILE__) . '/dist/app.css'));

	wp_enqueue_style( 'child-style', 
		get_stylesheet_directory_uri() . '/dist/app.css', 
		array( 'fusion-dynamic-css' ),
		$my_css_ver
	);

	# Child script bundle
	wp_enqueue_script(
		'bundle',
		get_stylesheet_directory_uri() . '/dist/app.js',
		array('jquery'),
		$my_js_ver
	);
}
add_action( 'wp_enqueue_scripts', 'theme_enqueue_styles' );

function avada_lang_setup() {
	$lang = get_stylesheet_directory() . '/languages';
	load_child_theme_textdomain( 'Avada', $lang );
}
add_action( 'after_setup_theme', 'avada_lang_setup' );
