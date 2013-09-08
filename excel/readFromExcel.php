<!--!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
<title>Untitled Document</title>
</head>

<body -->
<?php 
header('Content-type: text/xml');
header('Pragma: public');
header('Cache-control: private');
header('Expires: -1');
echo "<?xml version=\"1.0\" encoding=\"utf-8\"?>";
//echo '<xml>';

$fp = fopen('donor_list_1.csv','r') or die("can't open file");

$count = 0;

// get the first (header) line
$header = fgetcsv($fp);

// get the rest of the rows
$data = array();
while ($row = fgetcsv($fp)) {
	$arr = array();
  	foreach ($header as $i => $col){
    	$arr[$col] = $row[$i];
  		$data[] = $arr;
  		if ($arr['First'] != ""){
			if (strpos($arr['First'], '$') !== false){
				if ($count > 0) {echo '</category>';}
				echo '<category>';
				echo '<title>' . $arr['First'] . '</title>';
			} else if ($arr['Spouse Last'] == "" && $arr['Spouse First'] == ""){
				echo '<person>' . $arr['First'] . ' '. $arr['Last'] . '</person>';
			} else if ($arr['Spouse Last'] == "" && $arr['Spouse First'] !== ""){
				echo '<person>' . $arr['Spouse First'] . ' and ' . $arr['First'] . ' ' . $arr['Last'] . '</person>';	
			} else if ($arr['Spouse Last'] !== "" && $arr['Spouse First'] !== ""){
				echo '<person>' . $arr['Spouse First'] . ' ' . $arr['Spouse Last'] . ' and ' . $arr['First'] . ' ' . $arr['Last'] . '</person>';
			}
			//echo '<br>';
		}
	}
	echo '</category>';
}


//echo '</xml>';
?>

<!--/body>
</html -->