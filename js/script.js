
var script = (function () {

  var toggleActive = function () {
    $('.map-header').toggleClass('active');
    $('.form-header').toggleClass('active');
  };

  var openMap = function () {
    $('.part-two').css('margin-top', '0px');
    $('.part-one .map-container').css('opacity', '1');
    $('.form').css('height', '0px');
    toggleActive();
  };

  var clearForm = function () {
    // Clear fields
    $('form').find("input[type=text], input[type=email], textarea").val("");
  };

  var openForm = function (province) {
    $('.part-two').css('margin-top', '-470px');
    $('.part-one .map-container').css('opacity', '0');
    $('.form').css('height', '500px');
    toggleActive();
    // Change province input value
    $('input[name=province]').val(province);
  };

  var showSentMsg = function () {
    $('.sent-msg').css('opacity', '1');
  };

  var sendMsg = function (e) {
    e.preventDefault();

    $.ajax({
      type: 'post',
      url: 'php/form.php',
      data: $('form').serialize(),
      success: function (info) {
        // Show that form was sent, to the user
        showSentMsg();
      }
    });

    clearForm();
  };

  var onMouseOver = function (obj) {
    $(obj).mouseover(function (e) {
        $('#' + e.currentTarget.id).css('display', 'block');
        $('#' + e.currentTarget.id).css('outline', 'none');
    });
  };

  var onMouseOut = function (obj) {
    $(obj).mouseout(function (e) {
        $('#' + e.currentTarget.id).css('display', 'none');
    });
  };

  var onMouseClick = function (obj) {
    $(obj).click(function (e) {
      var id = e.currentTarget.id;
      var province = id.replace(/-/g, ' ');
      openForm(province);
      // Hide sent message if changing province
      $('.sent-msg').css('opacity', '0');
    });
  };

  var setupEventListeners = function() {

    // Open map to edit province
    $('.map-header').click(openMap);

    // Submit form
    $('form').on('submit', sendMsg);

    // For every province
    $('#Map area').each(function () {

        // Show map outline on hover
        onMouseOver(this);

        // Get rid of map outline when not hovered
        onMouseOut(this);

        // Get province name & go to contact form
        onMouseClick(this);

    });
  };

  return {
    init: function() {
      console.log('App has started.');
      setupEventListeners();
    }
  }
})();

script.init();
