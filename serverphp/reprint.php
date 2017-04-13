<?php
/**
 * Created by PhpStorm.
 * User: kkuk6
 * Date: 4/13/2017
 * Time: 9:23 PM
 */
if(isset($_POST['fingerprint'])){
    $fingerprint = $_POST['fingerprint'];

    if (isset($_POST['get_image'])) {
        $scan = scandir('backups');
        $imageUrls = array();
        foreach ($scan as $file) {
            if (!is_dir($file)) {
                if (strstr($file, $fingerprint) != false) {
                    array_push($imageUrls, "../serverphp/backups/" . $file);
                }
            }
        }

        $jsonResult = json_encode($imageUrls);
        echo $jsonResult;

    } else if(isset($_POST['reprint_image'])){
        $scan = scandir('backups');
        $imageUrls = array();
        $error_flag = false;
        foreach ($scan as $file) {
            if (!is_dir($file)) {
                if (strstr($file, $fingerprint) != false) {
                    try {
                        copy('backups/' . $file, "uploads/" . $file);
                    } catch (Exception $e) {
                        $error_flag = true;
                    }
                }
            }
        }

        if($error_flag){
            echo "Error reprint";
        }
        else{
            echo "Success reprint";
        }
    }
}