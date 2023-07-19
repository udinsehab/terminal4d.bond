var jsGet = $('script[src*=inforeferral]');
var vtimer = jsGet.attr('Timer');
$(document).ready(function() {
    //if(parseInt(vtimer) > localStorage.getItem("info_referral_exp") && localStorage.getItem("info_referral_exp")){
        localStorage.removeItem("info_referral_exp");
        localStorage.removeItem("info_referral");
    //}
    function infoReferral(){
        if(!localStorage.getItem("info_referral")){
            var dataString = {};
            $.ajax({
                type: 'POST',
                url: 'load_info_referral.php',
                dataType: 'JSON',
                data: dataString,
                success: function(res) {
                    localStorage.setItem("info_referral", JSON.stringify(res));
                    if(!localStorage.getItem("info_referral_exp")){
                        localStorage.setItem("info_referral_exp",parseInt(vtimer)+86400);
                    }
                    loadInfoReferral();
                },
                error: function(res) { 
                    alert(res);
                }
            });
        }else{
            loadInfoReferral();
        } 
    }
    infoReferral();
    function loadInfoReferral(){
        var htmlText1 = JSON.parse(localStorage.getItem("info_referral"));
        document.getElementById('load-info-referral').innerHTML = htmlText1; 
    }
 });