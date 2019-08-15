$(document).ready(function(){
    $('.delete').on('click', deleteUser);
});
function deleteUser(){
 var confirmation = confirm("are you sure?");
 if(confirmation) {
     $.ajax({
         type:'DELETE',
         url: '/users/delete/'+$('.delete').data('id')
     }).done(function(response){
        window.location.replace('/');
     });
 }    else {
     return false;
 }
}