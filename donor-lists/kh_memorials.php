<?php
// allow cross domain
header("access-control-allow-origin: *");

//create donor category list container
$donorListContainer = array(
	'A-E'=> array(),
	'F-K'=> array(),
	'L-Q'=> array(),
	'R-T'=> array(),
	'U-Z'=> array()
);

//get csv file
$fp = fopen('KH_Memorials_thru-12-2012.csv','r') or die("can't open file");

$count = 0;

//cycle through csv rows
while ($row = fgetcsv($fp)) {
	$firstLetter = substr($row[1], 0, 1);
	$cat;
	foreach ($donorListContainer as $key => $value){

		$range = range(substr($key, 0, 1), substr($key, 2, 1));
		if (in_array($firstLetter, $range)){
			$cat = $key;
			break;
		}
	}
	$donorListContainer[$cat][] = $row;	
}



?>
<ul class="donor-grid">
<?php foreach ($donorListContainer as $key => $donorList): ?>
	<li data-for="<?php echo $key; ?>"><?php echo $key; ?></li>
<?php endforeach;  ?>
</ul>
<div class="donor-list-container">
<?php foreach ($donorListContainer as $key => $donorList): ?>
	
	<ul data-list="<?php echo $key; ?>" <?php echo ($count==0)?'class="default donor-active"' : '' ?> data-iscroll>
    	<?php foreach ($donorList as $person): ?>
        <li><?php echo $person[0].' '.$person[1]; ?></li>
        <?php endforeach; ?>
    </ul>
<?php $count++; endforeach; ?>
</div>