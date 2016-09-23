
jQuery(document).ready(function() {

    /*
        send form to google form
    */
    $('.submit-form').on('submit', function(e) {
        postToGoogle();
        // window.location.replace("#team");
    });

    function postToGoogle() {
        var purchaser = document.getElementById("Purchaser").value;
        var receiver = document.getElementById("Receiver").value;
        var email = document.getElementById("Email").value;
        var phone = document.getElementById("Phone").value;
        var address = document.getElementById("Address").value;
        var message = document.getElementById("Message").value;

        $.ajax({
            url: "https://docs.google.com/forms/d/e/1FAIpQLSfW6_dHtCd2YeVODlGjVX2S5u3zAgIGzhxueTNp9ofmYOQDxQ/formResponse",
            data: {
                "entry.1432076687": purchaser,
                "entry.1523642760": receiver,
                "entry.1132965730": email,
                "entry.2003493896": phone,
                "entry.1228450244": address,
                "entry.1568875704": message,
            },
            type: "POST",
            //dataType: "xml",
            statusCode: {
                0: function() {
                    console.log("successful")
                    //Success message
                    alert('感 謝 您 的 訂 購!');
                },
                200: function() {
                    console.log("failed")
                    //Success Message
                    alert('訂 購 失 敗!');
                }
            }
        });
    }
});
