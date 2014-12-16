$(function(){
    $('#formA input[name="emailcsv"]').fileupload({
        dataType: 'json',
        done: function (e, data) {

          $.ajax({
            url: '/file/getPeople',
            type: 'GET',
            success: function(data){
              console.log(data);
            }
          });

        }
    });

    $('#formB input[name="emailcsv"]').fileupload({
      dataType: 'json',
      done: function (e, data) {

        $.ajax({
          url: '/file/getPeople',
          type: 'GET',
          success: function(data){
            console.log(data);
          }
        });

      }
    });

    $('.button').click(function(){
      $.ajax({
        url: '/file/getDuplicates',
        type: 'GET',
        success: function(data){
          $('.result').html(JSON.stringify(data));
        }
      });
    });

});
