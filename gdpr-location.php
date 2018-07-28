<?PHP


$eu_iso = array("BE", "BG", "CZ","DK","DE","EE", "IE", "EL","ES","FR","HR", "IT", "CY","LV","LT","LU", "HU", "MT","NL","AT" ,"FR","HR", "IT", "PL","PT","RO","SI", "SK", "FI","SE","UK");

if( in_array($_SERVER["GEOIP_COUNTRY_CODE"], $eu_iso) ){
  $data = array("gdpr"=>true, "country_name"=>$_SERVER["GEOIP_COUNTRY_NAME"], "country_code"=>$_SERVER["GEOIP_COUNTRY_CODE"], "continent_code"=>$_SERVER["GEOIP_CONTINENT_CODE"]);

}else{
  $data = array("gdpr"=>false); 
}



header("Access-Control-Allow-Origin:*",true);
header('Content-Type: application/json',true);
header("Cache-Control:no-cache, must-revalidate, max-age=0",true);
header("robots:noindex",true);
header_remove("pragma");
echo json_encode($data);