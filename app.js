var form;
var inputs = [];
var outputs = [];
var name = "";
var unit = "";
var dropdown = [];
var NumberOrText = "";
var isMandatory = Boolean;
var isMulti = Boolean;
var indexOfObj = -1;

function createObj(name, unit, dropdown, NumberOrText, isMandatory, isMulti){
    this.name = name;
    this.unit= unit;
    this.dropdown = dropdown;
    this.NumberOrText = NumberOrText;
    this.isMandatory = isMandatory;
    this.isMulti = isMulti;
};


var tbl = document.getElementById("tbl");

form = document.getElementById("operation");

form.onsubmit = function (e) {
    e.preventDefault();
    indexOfObj++;

    if (form.mandatory.checked == true) {
        isMandatory = true;
    } else {
        isMandatory = false;
    }

    if (form.multi.checked == true) {
        isMulti = true;
    } else {
        isMulti = false;

    }

    if (form.dd.value == "dropdown") {
        dropdown = form.dd.value;
    } else if (form.dd.value == "number") {
        NumberOrText = "number";
    } else {
        NumberOrText = "text";
    }

    var newObj = "obj"+indexOfObj.toString();

    newObj = new createObj(form.name.value,form.name.value,dropdown,isMandatory,isMulti);

    var newTr = document.createElement("tr");
    var newTd = '<td>' + newObj.name + '</td><td>' + newObj.unit + '</td><td>' + newObj.isMandatory +
        '</td><td>' + newObj.isMulti + '</td><td>' + form.dd.value + '</td>';
    $(newTr).append(newTd);
    newTr.addEventListener("click", function () {
         
        for(i=0;i<$("#tbl tr").length;i++){
            
            if($("#tbl tr")[i].innerText==$(this)[0].innerText){
                console.log($("#tbl tr")[i].innerText);
                console.log($(this)[0].innerText)
                inputs.splice(i,1);
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