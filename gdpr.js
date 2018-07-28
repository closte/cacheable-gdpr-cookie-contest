jQuery(window).load(function() {
 
    
    
    jQuery.get( "/gdpr-location.php", function( data ) {
      
        if(data.gdpr){
            //Visitor from European Union
            
           
            
            //show the gdpr notification 
            gdprCookieNotice({
                locale: 'en', //This is the default value
                timeout: 500, //Time until the cookie bar appears
                expiration: 365, //This is the default value, in days
                domain: '.closte.com', //If you run the same cookie notice on all subdomains, define the main domain starting with a .
                implicit: true, //Accept cookies on scroll
                statement: 'https://closte.com/legal/privacy-policy', //Link to your cookie statement page
                performance: [], //Cookies in the performance category.
                analytics: ['_ga','_gid','_gat'], //Cookies in the analytics category.
                marketing: [] //Cookies in the marketing category.
});
            
            
            
            
        }else{
            var value = {performance: true, analytics: true, marketing: true};         
            var event = new CustomEvent("gdprCookiesEnabled", {detail: value});
            document.dispatchEvent(event);
        }
  });
    
});