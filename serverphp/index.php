<?php
header('Access-Control-Allow-Origin: *');
$target_path = "uploads/";
$backup_path = "backups/";

$filesArray = $_FILES['fileName'];
$fingerprint = $_POST['fingerprint'];

foreach ($filesArray['name'] as $key=>$name) {
    $destName = $target_path.$name;
    $backupName = $backup_path.$fingerprint."_".$name;
    copy($filesArray['tmp_name'][$key], $destName);
    move_uploaded_file($filesArray['tmp_name'][$key], $backupName);
}
//$target_path = $target_path . basename( $_FILES['filename']['name']);
//
//if (move_uploaded_file($_FILES['file']['tmp_name'], $target_path)) {
//    echo "Upload and move success";
//} else {
//echo $target_path;
//    echo "There was an error uploading the file, please try again!";
//}
?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="initial-scale=1, maximum-scale=1, user-scalable=no, width=device-width">
  <title>Devdactic Image Upload</title>
</head>
<body>
<h1>Ionic Image Upload</h1>
<!--  --><?php
//  $scan = scandir('uploads');
//  foreach($scan as $file)
//  {
//    if (!is_dir($file))
//    {
//        echo '<h3>'.$file.'</h3>';
//      echo '<img src="uploads/'.$file.'" style="width: 400px;"/><br />';
//    }
//  }
//  ?>
</body>
</html>