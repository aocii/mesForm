var form;
var inputs = [];
var outputs = [];
var name = "";
var unit = "";

var NumberOrText = "";
var isMandatory = Boolean;
var isMulti = Boolean;
var indexOfObj = -1;

function createObj(name, unit, dropdown, NumberOrText, isMandatory, isMulti) {
    this.name = name;
    this.unit = unit;
    this.dropdown = dropdown;
    this.NumberOrText = NumberOrText;
    this.isMandatory = isMandatory;
    this.isMulti = isMulti;
};


$("#operation >select").change(function () {
    if (this.value == "dropdown") {
        var newInput = document.createElement("input");
        $("#ddArea").append(newInput);
    };
});



var tbl = document.getElementById("tbl");

form = document.getElementById("operation");

form.onsubmit = function (e) {
    e.preventDefault();
    indexOfObj++;
    var dropdown = [];
    var newObj = "obj" + indexOfObj.toString();

    newObj = new createObj(form.name.value, form.name.value, dropdown, isMandatory, isMulti);

    if (form.mandatory.checked == true) {
        newObj.isMandatory = true;
    } else {
        newObj.isMandatory = false;
    }

    if (form.multi.checked == true) {
        newObj.isMulti = true;
    } else {
        newObj.isMulti = false;

    }

    if (form.dd.value == "dropdown") {
        newObj.dropdown.push($("#ddArea > input").val());
    } else if (form.dd.value == "number") {
        newObj.NumberOrText = "number";
    } else {
        newObj.NumberOrText = "text";
    }

    
    var newTr = document.createElement("tr");
    var newTd = '<td>' + newObj.name + '</td><td>' + newObj.unit + '</td><td>' + newObj.isMandatory +
        '</td><td>' + newObj.isMulti + '</td><td>' + form.dd.value + '</td>';
    $(newTr).append(newTd);

    newTr.addEventListener("click", function () {

        for (i = 0; i < $("#tbl tr").length; i++) {

            if ($("#tbl tr")[i].innerText == $(this)[0].innerText) {
                console.log($("#tbl tr")[i].innerText);
                console.log($(this)[0].innerText)
                inputs.splice(i, 1);
                console.log(inputs)
            }

        }

        form.name.value = $(this.childNodes)[0].textContent;
        form.unit.value = $(this.childNodes)[1].textContent;
        form.mandatory.value = $(this.childNodes)[2].textContent;
        form.multi.value = $(this.childNodes)[3].textContent;
        form.dd.value = $(this.childNodes)[4].textContent;
        $(this).remove();

    });

    $(tbl).append(newTr);



    inputs.push(newObj);
    console.log(inputs)
    form.reset();


};

