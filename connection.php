<?php

	$dbhost = "localhost";
	$dbuser = "root";
	$dbpass = "";
	$dbname = "precision_ai";

	if(!$con = mysqli_connect($dbhost,$dbuser,$dbpass,$dbname)){
		die("failed to connect!");
	}
