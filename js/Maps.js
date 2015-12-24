var myCenter=new google.maps.LatLng(21.163825, 72.785476);  //Lat,Long of SVNIT

function initialize()
{
var mapProp = {
  center:myCenter,
  zoom:14,
  mapTypeId:google.maps.MapTypeId.ROADMAP
  };														//Map Properties

var map=new google.maps.Map(document.getElementById("googleMap"),mapProp);

var marker=new google.maps.Marker({
  position:myCenter,
  animation:google.maps.Animation.BOUNCE,
  });

marker.setMap(map);
}															//Map Marker,properties

google.maps.event.addDomListener(window, 'load', initialize);
