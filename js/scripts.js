
jQuery(document).ready(function() {

    /*
        send form to google form
    */
    $("[name='my-checkbox']").bootstrapSwitch({
        onColor: "primary",
        offColor: "info",
        onText: "Request",
        offText: "Review",
        labelText: "Order",
        size: "large",
    });
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
                    google.load('visualization', '1.0', {'packages':['corechart'], 'callback': getFromGoogle});
                }, 2000);
            } else {
                swal("Cancelled", "", "error");
            }
        });
        return false;
    });

    function getFromGoogle() {
      var opts = {sendMethod: 'auto'};
      var phone = document.getElementById("QPhone").value;

      // Replace the data source URL on next line with your data source URL.
      var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1HFJtE_3F6upJR_gIR9u9f4q1tF4POK9t385WCAMo9Hw/edit#gid=631696526', opts);

      // Optional request to return only column C and the sum of column B, grouped by C members.
      query.setQuery("select * where E = '" + phone + "'");

      // Send the query with a callback function.
      query.send(handleQueryResponse);
    }

    function handleQueryResponse(response) {
      // Called when the query response is returned.
        if (response.isError()) {
           // alert('Error in query: ' + response.getMessage() + ' ' + response.getDetailedMessage());
           return;
        }

        var data = response.getDataTable();
        var numrows = data.getNumberOfRows();
        var table = '';

        for (var row=0; row < numrows; row++) {

            var date = data.getValue(row, 0);
            // var purchaser = data.getValue(row, 1);
            // var receiver = data.getValue(row, 2);
            // var email = data.getValue(row, 3);
            // var phone = data.getValue(row, 4);
            // var address = data.getValue(row, 5);
            // var payment = data.getValue(row, 6);
            // var terms = data.getValue(row, 7);
            // var pomelo = data.getValue(row, 8);
            // var peiyu = data.getValue(row, 9);
            // var remark = data.getValue(row, 10);

            table += 'Date: ' + date + '\n';
        }
        if (table === "")
            swal("Good job!", "查無資料", "error");
        else
            swal("Good job!", table, "success");
    }

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
