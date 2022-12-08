//initializers
jQuery(function () {
  $('[data-bs-toggle="popover"]').popover();
});
jQuery(function () {
  $('[data-bs-toggle="tooltip"]').tooltip();
});
jQuery(function () {
  $(phone).mask('(000) 000-0000');
  $(busNumber).mask('(000) 000-0000');
  $(postCode).mask('S0S-0S0');
});

function checkPassLen(pass) {
  if (pass.length < 10) {
    return false;
  }
}

function isPassStrong(pass) {
  return /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])/.test(pass);
}

function isValidPostCode(postcode) {
  if (postcode != /^[A-Za-z]\d[A-Za-z][ -]?\d[A-Za-z]\d$/) {
    return false;
  } else {
    return true;
  }
}

//validate form on submit.
function validateForm() {
  let a = document.forms['aForm']['choosePass'].value;
  let b = document.forms['aForm']['retypePass'].value;
  if (aForm.fname.value == '') {
    alert('Must enter a first name');
    aForm.fname.focus();
    aForm.fname.setAttribute('class', 'form-control is-invalid');
    return false;
  }
  if (aForm.lname.value == '') {
    alert('Must enter a last name');
    aForm.lname.focus();
    aForm.lname.setAttribute('class', 'form-control is-invalid');
    return false;
  }
  if (isValidPostCode(aForm.postCode.value) == false) {
    alert('invalid postal code');
    aForm.postCode.focus();
    aForm.postCode.setAttribute('class', 'form-control is-invalid');
    return false;
  }
  if (a != b) {
    alert('passwords do not match!');
    aForm.choosePass.focus();
    aForm.choosePass.setAttribute('class', 'form-control is-invalid');
    aForm.retypePass.setAttribute('class', 'form-control is-invalid');
    return false;
  }
  if (checkPassLen(b) == false) {
    alert('password must be at least 10 characters long');
    aForm.choosePass.setAttribute('class', 'form-control is-invalid');
    aForm.retypePass.setAttribute('class', 'form-control is-invalid');
    return false;
  }
  if (isPassStrong(b) == false) {
    alert(
      'password must contain at least one number, one lower-case and one upper-case letter'
    );
    aForm.choosePass.setAttribute('class', 'form-control is-invalid');
    aForm.retypePass.setAttribute('class', 'form-control is-invalid');
    return false;
  } else {
    if (confirm('confirm submit')) {
      aForm.submit();
    }
  }
}

//reset form fields bootstrap stuff on reset
function resetFields() {
  const form = document.getElementById('aForm');
  Array.from(form.elements).forEach((element) => {
    if (element.getAttribute('class') == 'form-control is-invalid') {
      element.setAttribute('class', 'form-control');
    }
  });
}

//function to make a table from an object
function makeTable(data, name, placeIn, bsClass) {
  let placement = document.getElementById(placeIn);
  let table = document.createElement('table');
  let _table = placement.appendChild(table);
  if (name != null) {
    _table.setAttribute('name', name);
  }
  if (bsClass != null) {
    _table.setAttribute('class', 'table ' + bsClass);
  }
  let _data = data;
  function generateTableHead(table, data) {
    let thead = table.createTHead();
    let row = thead.insertRow();
    for (key in data[0]) {
      let th = document.createElement('th');
      let text = document.createTextNode(key);
      th.appendChild(text);
      row.appendChild(th);
    }
  }
  function generateTable(table, data) {
    for (let element of data) {
      let row = table.insertRow();
      for (key in element) {
        let cell = row.insertCell();
        if (key == 'image') {
          let imgId = generateString(16);
          let image = document.createElement('img');
          image.setAttribute('src', element[key]);
          image.setAttribute('id', imgId);
          image.setAttribute('class', 'img-fluid rounded');
          image.setAttribute('onclick', openImg(element[key]));
          cell.appendChild(image);
        } else {
          let text = document.createTextNode(element[key]);
          cell.appendChild(text);
        }
      }
    }
  }
  generateTable(_table, _data);
  generateTableHead(_table, _data);
}

function loadDefault() {
  fetch('/customer/main.html')
    .then((response) => response.text())
    .then((text) => (document.getElementsByTagName('html').innerHTML = text));
}

function loadViewHead() {
  fetch('/customer/navBar.html')
    .then((response) => response.text())
    .then((text) => (document.getElementById('viewHead').innerHTML = text));
}

function loadViewFooter() {
  fetch('/customer/viewFooter.html')
    .then((response) => response.text())
    .then((text) => (document.getElementById('viewFooter').innerHTML = text));
}
