$(function(){
    $('#formA input[name="emailcsv"]').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
        }
    });

    $('#formB input[name="emailcsv"]').fileupload({
        dataType: 'json',
        done: function (e, data) {
            console.log(data);
        }
    });
});
