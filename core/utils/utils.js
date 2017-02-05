function msToTime(s) {
  function addZ(n) {
    return (n < 10 ? '0' : '') + n
  }

  var ms = s % 1000
  s = (s - ms) / 1000
  var secs = s % 60
  s = (s - secs) / 60
  var mins = s % 60
  var hrs = (s - mins) / 60

  // return addZ(hrs) + ':' + addZ(mins) + ':' + addZ(secs) + '.' + ms
  return addZ(hrs) + 'h' + addZ(mins)
}

function notifyError(title, msg) {
  if (isEmptyOrNull(msg))
    msg = "";
  $.notify({
    title: '<strong>' + title + '</strong>',
    message: msg
  }, {
    type: 'danger',
    delay: 10000,
    animate: {
      enter: 'animated bounceInDown',
      exit: 'animated bounceOutUp'
    },
    placement: {
      from: 'bottom',
      align: 'center'
    }
  })
};

function notifySuccess(title, msg) {
  if (isEmptyOrNull(msg))
    msg = "";
  $.notify({
    title: '<strong>' + title + '</strong>',
    message: msg
  }, {
    type: 'success',
    delay: 3000,
    animate: {
      enter: 'animated bounceInDown',
      exit: 'animated bounceOutUp'
    },
    placement: {
      from: 'bottom',
      align: 'center'
    }
  })
};

function notifyInfo(title, msg) {
  if (isEmptyOrNull(msg))
    msg = "";
  $.notify({
    title: '<strong>' + title + '</strong>',
    message: msg
  }, {
    type: 'info',
    delay: 5000,
    animate: {
      enter: 'animated bounceInDown',
      exit: 'animated bounceOutUp'
    },
    placement: {
      from: 'bottom',
      align: 'center'
    }
  })
};

// to check if a field is Empty or Null
function isEmptyOrNull(field) {
  if (field === "" || field === null || field === undefined)
    return true;
  else
    return false;
}


function eventFire(el, etype){
  if (el.fireEvent) {
    el.fireEvent('on' + etype);
  } else {
    var evObj = document.createEvent('Events');
    evObj.initEvent(etype, true, false);
    el.dispatchEvent(evObj);
  }
}

// sleep time expects milliseconds
function sleep (time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
