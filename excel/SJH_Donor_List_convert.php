<?php
$doc = new DOMDocument();
$doc->formatOutput = true;
$fp = fopen('SJH_Donor_List.csv','r') or die("can't open file");
$header = fgetcsv($fp);
  
$donors = $doc->createElement( "donors" );
$doc->appendChild( $donors );
$count = -1;
$tree = array();

while ($row = fgetcsv($fp)) {
	if (strpos($row[0], '$') !== FALSE){
		$tree[$row[0]] = array();
		} else {
			$person = array();
			$person['firstname'] = $row[0];
			$person['lastname'] = $row[1];
			$person['spousefirstname'] = $row[2];
			$person['spouselastname'] = $row[3];
			end($tree);
			$key = key($tree); 
			$tree[$key][] =  $person;		
			}	
	}

foreach($tree as $category){
	$catTitle = $doc->createElement( "category" );
	//$catTitle->appendChild($doc->createTextNode();	
	}

/*while ($row = fgetcsv($fp)) {
	if (strpos($row[0], '$') !== FALSE){
		$catTitle = $doc->createElement( "category" );
		$catTitle->appendChild($doc->createTextNode($row[0]));	
		$donors->appendChild( $catTitle );
		} else {
			$catTitle = $doc->createElement( "donor" );
			
			$firstName = $doc->createElement( "firstname" );
			$firstName->appendChild($doc->createTextNode($row[0]));

			$lastName = $doc->createElement( "lastname" );
			$lastName->appendChild($doc->createTextNode($row[1]));
			
			$spouseFirstName = $doc->createElement( "spouseFirstName" );
			$spouseFirstName->appendChild($doc->createTextNode($row[2]));

			$spouseLastName = $doc->createElement( "spouseLastName" );
			$spouseLastName->appendChild($doc->createTextNode($row[3]));

			$catTitle->appendChild($firstName);
			$catTitle->appendChild($lastName);
			$catTitle->appendChild($spouseFirstName);
			$catTitle->appendChild($spouseLastName);

			$donors->appendChild( $catTitle );
			
			}

}
	echo $doc->saveXML();
	$doc->save("SJH_Donor_List.xml")*/
  ?>