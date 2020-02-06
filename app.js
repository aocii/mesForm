var form;
var inputs = [];
var outputs = [];
var objwithOrder=[];
var objIndex = 0;
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

    var newTr = document.createElement("tr");
    var newTd = '<td>' + obj.name + '</td><td>' + obj.unit + '</td><td>' + obj.isMandatory +
        '</td><td>' + obj.isMulti + '</td><td>' + form.dd.value + '</td>';
    $(newTr).append(newTd);
    newTr.addEventListener("click", function () {
        
        form.name.value = $(this.childNodes)[0].textContent;
        form.unit.value = $(this.childNodes)[1].textContent;
        form.mandatory.value = $(this.childNodes)[2].textContent;
        form.multi.value = $(this.childNodes)[3].textContent;
        form.dd.value = $(this.childNodes)[4].textContent;
        $(this).remove();

        console.log($(this))


    });
    $(tbl).append(newTr);


    objwithOrder.push([obj,objIndex]);
    console.log(objwithOrder);
    inputs.push(obj);

    console.log(inputs)
    form.reset();


};