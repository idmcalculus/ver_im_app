$(document).ready(function () {
    $('[name = "payment"]').change(function () {
        if ($('#payment-report').is(":checked")) {
            $('#payment-field').show(300);
        } else {
            $('#payment-field').hide(400);
        }
    });

    var maxField = 3; //Input fields increment limitation
    var addButton = $('#add-more'); //Add button selector
    var wrapper = $('.job-respon'); //Input field wrapper
    var fieldHTML = '<div class="form-group"><div class="row">' +
        '<div class="col-md-11 pr-0"><input type="text" class="form-control" name="field_name[]" value=""></div>' +
        '<a href="javascript:void(0);" class="remove_button"><i class="fa fa-minus"></i></a>' +
        '</div></div>'; //New input field html
    var x = 1; //Initial field counter is 1

    //Once add button is clicked
    $(addButton).click(function(e){
        e.preventDefault();
        //Check maximum number of input fields
        if(x < maxField){
            x++; //Increment field counter
            $(wrapper).append(fieldHTML);
        }
        if(x === maxField) {
            $('#add-more').hide(300);
        }
    });

    //Once remove button is clicked
    $(wrapper).on('click', '.remove_button', function(e){
        e.preventDefault();
        $(this).parent('div').remove(); //Remove field html
        x--; //Decrement field counter
        $('#add-more').show(300);
    });

    //Flatpicker(datepicker)
    $('.calender').flatpickr({
        minDate: "today",
        altFormat: "M j, Y",
        //altFormat: "M j, Y h:iK",
    });

    $('#applicants, #userTable, #categoryTable').DataTable();
});

function readURL(input) {
    if(input.files && input.files[0]) {
        let reader = new FileReader();
        reader.onload = function (e) {
            $('#invest-preview').attr('src', e.target.result);
        };

        reader.readAsDataURL(input.files[0]);
    }
}
