
var statesABR = ["AL","AK","AZ","AR","CA","CO","CT","DE","FL","GA","HI","ID","IL","IN","IA","KS",
		"KY","LA","ME","MD","MA","MI","MN","MS","MO","MT","NE","NV","NH","NJ","NM",
		"NY","NC","ND","OH","OK","OR","PA","PR","RI","SC","SD","TN","TX","UT","VT",
		"VI","VA","WA","WV","WI","WY"];
var statesStr = ["ALABAMA","ALASKA","ARIZONA","ARKANSAS","CALIFORNIA","COLORADO","CONNECTICUT","DELAWARE","FLORIDA","GEORGIA","HAWAII","IDAHO","ILLINOIS",
		"INDIANA","IOWA","KANSAS","KENTUCKY","LOUISIANA","MAINE","MARYLAND","MASSACHUSETTS","MICHIGAN","MINNESOTA","MISSISSIPPI","MISSOURI",
		"MONTANA","NEBRASKA","NEVADA","NEW HAMPSHIRE","NEW JERSEY","NEW MEXICO","NEW YORK","NORTH CAROLINA","NORTH DAKOTA","OHIO","OKLAHOMA",
		"OREGON","PENNSYLVANIA","PUERTO RICO","RHODE ISLAND","SOUTH CAROLINA","SOUTH DAKOTA","TENNESSEE","TEXAS","UTAH","VERMONT","VIRGIN ISLANDS",
		"VIRGINIA","WASHINGTON","WEST VIRGINIA","WISCONSIN","WYOMING"];
var mapTypes = ["Satelite","Street","Topo"];

function loadStates(){
	//alert("loading states");
	for (var x = 0; x<52; x++){
	 var newOption = document.createElement("OPTION");
	 newOption.text = statesABR[x];
	 newOption.value = statesStr[x];
	 document.getElementById("stateSelectCMB").options.add(newOption);
	}
 }
 
 function populatetxtGeocoder(){
	 var selIndex = document.getElementById("stateSelectCMB").selectedIndex;
	 comboValue = document.getElementById("stateSelectCMB").options[selIndex].value;
	document.getElementById("txtGeocoder").value = 	comboValue
	geoCode();
	addWMSLayers(document.getElementById("stateSelectCMB").options[selIndex].value);
	//ddKmlLayer(document.getElementById("stateSelectCMB").options[selIndex].text);
	
 }
 
 function loadMapTypes(){
	alert("loading mapTypes");
	for (var x = 0; x<3; x++){
	 var newOption = document.createElement("OPTION");
	 newOption.text = mapTypes[x];
	 newOption.value = mapTypes[x];
	 document.getElementById("MapTypeCMB").options.add(newOption);
	} 
 }
 
 var currentOverlay;
function removeCurrentOverlay(){
	if(currentOverlay != null){
	  map.removeOverlay(currentOverlay);
	}
}



function addWMSLayers(name){
	//var ctaLayer = new google.maps.KmlLayer("http://192.168.1.114:8080/geoserver/EMPRISE-U/wms/kml?layers=Indiana",map);
	

	//alert(name);
	removeCurrentOverlay();
	//var indiana_gravel;
	tile_roadless= new GTileLayer(new GCopyrightCollection("AWP"),1,17);
	
//	these are the layers from your mapserver map file	
	tile_roadless.myLayers =  obtainLayer(name); //'ira_fill2,ira_line,wild_hatch';
	tile_roadless.myMercZoomLevel=5;
	tile_roadless.myFormat='image/png';
	
//	this is the address of your mapserver map	
	tile_roadless.myBaseURL= 'http://192.168.1.114:8080/geoserver/EMPRISE-U/wms?service=WMS&version=1.1.0&request=GetMap&layers=';
	//tile_roadless.myBaseURL= 'http://192.168.1.114:8080/geoserver/EMPRISE-U/wms?SERVICE=WMS&VERSION=1.1.1&REQUEST=GetMap&FORMAT=image/png&TRANSPARENT=TRUE&TILED=true&layers=';
	
		
//	this is the function performed by John Deck's script	
	tile_roadless.getTileUrl=CustomGetTileUrlM; //CustomGetTileUrl;		
	
//	this specifies the opacity of your layer	
	tile_roadless.getOpacity = function() {return 1.0;}

	//map.addControl(new GLargeMapControl());
	//map.addControl(new GMapTypeControl());
//	set the location of the map	 
	//map.setCenter(new GLatLng(35.846760876811366, -106.03317260742188), 10);	

//	add wms layer with GTileLayerOverlay
	var MapserverLayer = new GTileLayerOverlay(tile_roadless);
	map.addOverlay(MapserverLayer);
	currentOverlay = MapserverLayer;
	alert(name)
	

}

		
function obtainLayer(layerName){
	if (layerName != undefined){
		var stateLowerCase = layerName.toLowerCase();
		var theState = stateLowerCase.charAt(0).toUpperCase() + stateLowerCase.slice(1);
		return theState;
	}
}


