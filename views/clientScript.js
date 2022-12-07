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
  fetch('main.html')
    .then((response) => response.text())
    .then((text) => (document.getElementsByTagName('html').innerHTML = text));
}

function loadViewHead() {
  fetch('navBar.html')
    .then((response) => response.text())
    .then((text) => (document.getElementById('viewHead').innerHTML = text));
}

function loadViewFooter() {
  fetch('viewFooter.html')
    .then((response) => response.text())
    .then((text) => (document.getElementById('viewFooter').innerHTML = text));
}

function validate(myform) {
  var Fname = document.getElementById('Fname');
  if (Fname.value == '') {
    alert('First name is required');
    Fname.focus();
    return false;
  }
  var Lname = document.getElementById('Lname');
  if (Lname.value == '') {
    alert('Last name is required');
    Lname.focus();
    return false;
  }
  var addy = document.getElementById('addy');
  if (addy.value == '') {
    alert('Address is required');
    addy.focus();
    return false;
  }
  if (postal.value == '') {
    alert('Postal Code is required');
    postal.focus();
    return false;
  } else {
    myform.postal.value = myform.postal.value.toUpperCase();
    var reg = /^[A-Z]\d[A-Z][-]?\d[A-Z]\d$/;
    if (!reg.test(myform.postal.value)) {
      alert('postal code format is incorrect, must be x9x 9x9');
      myform.postal.focus();
      return false;
    }
  }
  if (city.value == '') {
    alert('City is required');
    city.focus();
    return false;
  }
  if (prov.value == '') {
    alert('Province is required');
    prov.focus();
    return false;
  }
  if (country.value == '') {
    alert('Country is required');
    country.focus();
    return false;
  }
  if (email.value == '') {
    alert('Email is required');
    email.focus();
    return false;
  }
  if (phoneNumber.value == '') {
    alert('phone number is required');
    phoneNumber.focus();
    return false;
  }
  if (busno.value == '') {
    alert(
      'Business phone number is not required, if not applicable to you <br/> type na into the box'
    );
    busno.focus();
    return false;
  }
  if (userid.value == '') {
    alert('you must pick a User ID');
    userid.focus();
    return false;
  }
  if (passw.value == '') {
    alert('password is a required feild');
    passw.focus();
    return false;
  }
}
