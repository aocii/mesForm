var form;
var inputs = [];
var outputs = [];
var obj = {
    name: "",
    unit: "",
    dropdown: [],
    NumberOrText: "",
    isMandatory: Boolean,
    isMulti: Boolean,

}
var tbl = document.getElementById("tbl");

form = document.getElementById("operation");

form.onsubmit = function (e) {
    e.preventDefault();
    obj.name = form.name.value;
    obj.unit = form.unit.value;

    if (form.mandatory.checked == true) {
        obj.isMandatory = true;
    } else {
        obj.isMandatory = false;
    }

    if (form.multi.checked == true) {
        obj.isMulti = true;
    } else {
        obj.isMulti = false;

    }

    if (form.dd.value == "dropdown") {
        obj.dropdown.push(form.dd.value);
    } else if (form.dd.value == "number") {
        obj.NumberOrText = "number";
    } else {
        obj.NumberOrText = "text";
    }

    
    var newTd = '<tr><td>' + obj.name + '</td><td>' + obj.unit + '</td><td>' + obj.isMandatory + 
    '</td><td>' + obj.isMulti + '</td><td>' + form.dd.value + '</td></tr>';
    $(tbl).append(newTd);
    newTd.


    inputs.push(obj);
    console.log(inputs)
    form.reset();
};