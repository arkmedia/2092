<?php
$doc = new DOMDocument();
$doc->formatOutput = true;
$fp = fopen('donors_reformat.csv','r') or die("can't open file");
$header = fgetcsv($fp);
  
$donors = $doc->createElement( "donors" );
$doc->appendChild( $donors );
$count = -1;

while ($row = fgetcsv($fp)) {
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
	$doc->save("donors_reformat.xml")
  ?>