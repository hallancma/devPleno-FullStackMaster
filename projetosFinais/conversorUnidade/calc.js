$(function() {
  $('#calc').click(function() {
    const milhas = parseFloat($('#milhas').val());
    console.log(milhas);
    const metros = 1690.34 * milhas;
    $('#metros').val(metros.toFixed(2));
  });
});
