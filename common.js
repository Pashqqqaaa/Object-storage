jQuery(document).ready(function() {
    jQuery(".modalbox").fancybox();
    jQuery("#contact").submit(function() {return false;});
    jQuery("#send").on("click", function() {
        var emailval = jQuery("#email").val();
        var namevl = jQuery("#name").val();
        var msgval = jQuery("#msg").val();
        var msglen = msgval.length;
        var mailvalid = validateEmail(emailval);
        if(mailvalid == false) {
            jQuery("#email").addClass("error");
        }
        else if(mailvalid == true) {
            jQuery("#email").removeClass("error");
        }
        if(mailvalid == false) {
            jQuery("#name").addClass("error");
        }
        else if(mailvalid == true){
            jQuery("#name").removeClass("error");
        }
        if(msglen < 4) {
            jQuery("#msg").addClass("error");
        }
        else if(msglen >= 4){
            jQuery("#msg").removeClass("error");
        }
        if(mailvalid == true && msglen >= 4) {
// если обе проверки пройдены
// сначала мы скрываем кнопку отправки
            $("#send").replaceWith("<em>отправка...</em>");
            jQuery.ajax({
                type: 'POST',
                url: 'sendmessage.php',
                data: jQuery("#contact").serialize(),
                success: function(data) {
                    if(data == "true") {
                        jQuery("#contact").fadeOut("fast", function(){
                            jQuery(this).before("<p><strong>Ваше сообщение отправлено</strong></p>");
                            setTimeout("jQuery.fancybox.close()", 1000);
                        });
                    }
                }
            });
        }
    });
});