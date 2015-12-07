<?php

   $files = glob("images/*.*");

  for ($i=1; $i<count($files); $i++)

{

$image = $files[$i];
$supported_file = array(
    'gif',
    'jpg',
    'jpeg',
    'png'
);

$ext = strtolower(pathinfo($image, PATHINFO_EXTENSION));
if (in_array($ext, $supported_file)) {
    print $image ."<br />";
    echo '<img src="'.$image .'" alt="Fonts" />'."<br /><br />";
} else {
    continue;
 }

}

?>