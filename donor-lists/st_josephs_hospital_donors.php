<?php
// allow cross domain
header("access-control-allow-origin: *");

//create output object
$doc = new DOMDocument();
//create donor category button array
$catContainer = array();

//create donor category list container
$donorListContainer = array();

//get csv file
$fp = fopen('SJH_Donor_List.csv','r') or die("can't open file");

$count = 0;

//cycle through csv rows
while ($row = fgetcsv($fp)) {
	// if node conains a $ sign //add it to categories
	if (strpos($row[0], '$') !== FALSE){
		// create noew entry in category container
		$donorListContainer[$row[0]] = array();
	} else {
		$person = array();
		$person['firstname'] = $row[0];
		$person['lastname'] = $row[1];
		$person['spousefirstname'] = $row[2];
		$person['spouselastname'] = $row[3];
		end($donorListContainer);
		$key = key($donorListContainer); 
		$donorListContainer[$key][] = $person;
	}
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
        <li><?php 
			switch($person){
			// case Company (last name only)
			case (($person['firstname'] == '') && ($person['lastname'] != '') && ($person['spousefirstname'] == '') && ($person['spouselastname'] == '')):
				echo $person['lastname'];
			break;	
			// case single donor (only first and last name)
			case (($person['firstname'] != '') && ($person['lastname'] != '') && ($person['spousefirstname'] == '') && ($person['spouselastname'] == '')):
				echo $person['firstname'].' '.$person['lastname'];
			break;	
			// case couple with matching last names
			case (($person['firstname'] != '') && ($person['lastname'] != '') && ($person['spousefirstname'] != '') && ($person['spouselastname'] == '')):
				echo $person['firstname'].' and '.$person['spousefirstname'].' '.$person['lastname'];
			break;	
			// case couple with differing last names
			case (($person['firstname'] != '') && ($person['lastname'] != '') && ($person['spousefirstname'] != '') && ($person['spouselastname'] != '')):
				echo $person['firstname'].' '.$person['lastname'].' and '.$person['spousefirstname'].' '.$person['spouselastname'];
			break;	
			}
			

		?></li>
        <?php endforeach; ?>
    </ul>
<?php $count++; endforeach; ?>
</div>