
jQuery(document).ready(function() {

    /*
        send form to google form
    */
    $("[name='my-checkbox']").bootstrapSwitch();
    $('input[name="my-checkbox"]').on('switchChange.bootstrapSwitch', function(event, state) {
        if (state) { //this is true if the switch is on
            $('.query-form').show();
            $('.submit-form').hide();
        } else {
            $('.submit-form').show();
            $('.query-form').hide();
        }
    });

    $('.submit-form').on('submit', function(e) {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover this imaginary file!",
            type: "warning",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            closeOnCancel: false,
            showLoaderOnConfirm: true
        }, function(isConfirm) {
            if (isConfirm) {
                setTimeout(function () {
                    postToGoogle();
                }, 2000);
            } else {
                swal("Cancelled", "", "error");
            }
        });
        return false;
    });

    $('.query-form').on('submit', function(e) {
        swal({
            title: "An input!",
            text: "Write something interesting:",
            type: "input",
            showCancelButton: true,
            confirmButtonClass: "btn-danger",
            confirmButtonText: "Yes, delete it!",
            cancelButtonText: "No, cancel plx!",
            closeOnConfirm: false,
            animation: "slide-from-top",
            inputPlaceholder: "Write something",
            showLoaderOnConfirm: true
        }, function(inputValue) {
            if (inputValue === false)
                return false;
            if (inputValue === "") {
                swal.showInputError("You need to write something!");
                return false;
            }
            setTimeout(function () {
                // to do: getFromGoogle();
                swal("Good job!", "You wrote: " + inputValue, "success");
            }, 2000);
        });
        return false;
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
                    swal({
                        title: "感 謝 您 的 訂 購!",
                        text: "",
                        type: "success",
                        closeOnConfirm: false,
                    }, function (){
                        window.location.reload(true);
                    });
                    
                },
                200: function() {
                    console.log("failed")
                    //Success Message
                    swal({
                        title: "訂 購 失 敗!",
                        text: "",
                        type: "error",
                        closeOnConfirm: false,
                    }, function (){
                        window.location.replace("#contact");
                    });
                }
            }
        });
    }
});
