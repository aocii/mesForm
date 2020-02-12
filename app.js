//test comment﻿
(function ($) {

    function ProcessParameter(item, options) {


        this.options = $.extend({
            checkboxItemEnabled: false
        }, options);
        this.item = $(item);
        this.init();
    }
    ProcessParameter.prototype = {
        init: function () {

            var template = `<div class="processparameter mt-3">
                                <div class="container">
                                    <div class="row processparameter-header">
                                        <div class="col-12">
                                            <span class="param-name">Add parameter</span>
                                            <div class="card-action-bar">
                                                <a data-toggle="collapse" class="float-rigth" data-target="#collapse11">
                                                    <i class="fa fa-trash-alt deleteParameter"></i>
                                                </a>
                                                <a data-toggle="collapse" class="float-rigth" data-target="#collapse11">
                                                    <i class="far fa-edit editParameter"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="collapse" id="collapse">
                                        <div class="row processparameter-body">
                                            <div class="col-sm-6">
                                                <label>Adı</label>
                                                <input type="hidden" name="parameter-name" />
                                                <input type="text" class="form-control" name="card-mes-name-input-field">
                                            </div>
                                            <div class="col-sm-6">
                                                <label>Görünen Adı</label>
                                                <input type="text" class="form-control" name="card-mes-displayname-input-field">
                                            </div>
                                            <div class="col-sm-6">
                                                <label>Format</label>
                                                <div class="input-group">
                                                    <select class="form-control" name="card-mes-select-input-field">
                                                        <option selected id="card-mes-select-input-field-special">Choose and Add Value</option>
                                                        <option>One</option>
                                                        <option>Two</option>
                                                        <option value="3">Three</option>
                                                    </select>
                                                </div>
                                            </div>
                                            <div class="col-sm-2">
                                                <label>Birim</label>
                                                <input type="text" class="form-control" name="card-mes-unit-input-field">
                                            </div>
                                            <div class="col-sm-2">
                                                <label>Zorunlu</label>
                                                <label class="switch custom-mes-switch">
                                                    <input type="checkbox" name="card-mes-required-input-field">
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            <div class="col-sm-2">
                                                <label>Çoklanabilir</label>
                                                <label class="switch custom-mes-switch">
                                                    <input type="checkbox" name="card-mes-multiple-input-field">
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="row selections-container">
                                            </div></div>
                                        </div>
                                        <div class="row footer">
                                            <div class="col-sm-4"> </div>
                                            <div class="col-sm-4">
                                                <div class="d-flex justify-content-center">
                                                    <input type="button" class="btn save-processparameter" value="Save">
                                                </div>
                                            </div>
                                            <div class="col-sm-4"> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>`
            var DDtemplate = `<div class="mb-2 selection-item col-12 row">
                                                        <div class="col-9">
                                                            <label>Choices</label>
                                                            <input type="text" class="form-control" id="dropdown-input-field">
                                                        </div>
                                                        <div class="col-3">
                                                            <label>&nbsp;</label>
                                                            <div class="row icon-container">
                                                                <div class="col-6">
                                                                    <i class="fas fa-trash-alt remove"></i>
                                                                </div>
                                                                <div class="col-6">
                                                                    <i class="fas fa-plus add"></i>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>`;
            var addButtonTemplate = `<input type="button" class="btn mt-3 new-processparameter" value="Add Parameter">`;




            function createObj() {
                return {
                    Name: null,
                    DisplayName: null,
                    Unit: null,
                    Type: null,
                    Required: null,
                    Clonable: null,
                    Value: null,
                    CloneIndex: null,
                    Selection: null
                };
            }
            function addProcessParameter(newParam) {
                var processParameters = getProcessParameters();

                processParameters.push(newParam);
                $container.data("processparameters", JSON.stringify(processParameters));
            }

            function getProcessParameters() {
                var processParameters = $container.data("processparameters");
                if (processParameters == undefined || null)
                    processParameters = [];
                else
                    processParameters = JSON.parse(processParameters);
                return processParameters;
            }

            function updateProcessParameters(processParameters) {
                $container.data("processparameters", JSON.stringify(processParameters));
            }

            function getProcessParmeterByName(name) {
                var parmeters = getProcessParameters();
                for (var i = 0; i < parmeters.length; i++) {
                    if (parmeters[i].Name == name) {
                        //return parmeters[i];
                        return true;
                    }
                }
                //return null;  bunu niye yaptın ?
                return false;
            }
            function updateProcessParameter(key, processParameter) {
                var processParmeters = getProcessParameters();
                for (var i = 0; i < processParmeters.length; i++) {
                    var param = processParmeters[i];
                    if (param.Name == key) {
                        processParmeters[i] = processParameter;
                        updateProcessParameters(processParmeters);
                        return;
                    }
                }

            }




            var $container = this.item;
            $container.addClass("processparameters-container");
            $container.append($(addButtonTemplate));
            $container.find(".new-processparameter").click(function () {
                var templateObj = $(template);

                $(".collapse").hide();
                $(".processparameter-header").show();

                var nameInput = templateObj.find("input[name=card-mes-name-input-field]");
                nameInput.keypress(function (e) {
                    var k;
                    document.all ? k = e.keyCode : k = e.which;
                    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));

                });


                templateObj.find(".save-processparameter").click(function () {
                    var container = $(this).closest(".processparameter");

                    var obj = createObj();

                    var paramName = container.find("input[name=card-mes-name-input-field]").val();


                    if (getProcessParmeterByName(paramName)) {
                        alert("dikkat gardaşım")

                    } else {
                        obj.Name = paramName;
                    };



                    obj.DisplayName = container.find("input[name=card-mes-displayname-input-field]").val();
                    obj.Type = container.find("select[name=card-mes-select-input-field]").val();
                    obj.Unit = container.find("input[name=card-mes-unit-input-field]").val();

                    obj.Selection = [];
                    var selections = container.find(".selections-container .selection-item input");
                    for (var i = 0; i < selections.length; i++) {
                        obj.Selection.push({ Value: $(selections[i]).val(), Text: $(selections[i]).val() });
                    }
                    obj.Required = container.find("input[name=card-mes-required-input-field]")[0].checked;
                    obj.Clonable = container.find("input[name=card-mes-multiple-input-field]")[0].checked;
                    var objVals = Object.values(obj);
                    function isValsNull(objvals) {
                        for (i = 0; i < objvals.length - 3; i++) {
                            console.log(objvals[i])
                            if (objvals[i] == "" || objvals[i] == null) {
                                console.log(objvals[i])
                                return true;
                            } else {
                                return false;
                            }

                        }
                    }
                    console.log(objVals);
                    var hiddenNameInput = container.find("input[name='parameter-name']");
                    var existedName = hiddenNameInput.val();
                    if (!!existedName) {
                        updateProcessParameter(existedName, obj)
                    } else {
                        if (isValsNull(objVals)) {
                            alert("inputları doldurr");
                        } else {
                            console.log(obj + "----------------");
                            addProcessParameter(obj)
                        }
                    }

                    hiddenNameInput.val(obj.Name);
                    $(this).closest(".collapse").toggle();
                    if (obj.DisplayName != "") {
                        $(this).closest(".processparameter").find(".param-name")[0].innerText = obj.DisplayName;
                    }
                    $(this).closest(".processparameter").find(".processparameter-header").toggle();
                });

                templateObj.find(".processparameter-header .deleteParameter").on("click", function () {
                    var objName = $(this).closest(".processparameter").find("input").first().val();
                    var ProcessParameters = getProcessParameters();
                    if (objName) {
                        for (i = 0; i < ProcessParameters.length; i++) {
                            if (ProcessParameters[i].Name == objName) {
                                ProcessParameters.splice(i, 1);
                                $(this).closest(".processparameters-container").find(".processparameter")[i].remove();
                            }
                        }
                    } else {
                        $(this).closest(".processparameter").remove();
                    }

                    updateProcessParameters(ProcessParameters);


                });

                templateObj.find(".processparameter-header .editParameter ").on("click", function () {
                    $(".collapse").hide();
                    $(".processparameter-header").show();
                    $(this).closest(".processparameter").find(".collapse").toggle();
                    $(this).closest(".processparameter-header").toggle();
                });

                templateObj.find("select[name=card-mes-select-input-field]").on("change", function () {

                    $(this).closest(".processparameter").find(".selections-container").show().find(".selection-item").remove();
                    if ($(this).val() == "3") {
                        $(this).closest(".processparameter").find(".selections-container").append(addSelection());
                    } else {
                        $(this).closest(".processparameter").find(".selections-container").hide();
                    }
                });

                function addSelection() {
                    var selectionTemplate = $(DDtemplate);
                    selectionTemplate.find(".add").click(function () {
                        var tempSelection = addSelection();
                        tempSelection.insertAfter($(this).closest(".selection-item"));
                    });
                    selectionTemplate.find(".remove").click(function () {
                        $(this).closest(".selection-item").remove();
                    });
                    return selectionTemplate;
                }
                templateObj.insertBefore($(this));
                templateObj.find(".collapse").toggle();
                templateObj.find(".processparameter-header").toggle();
            });

        },
        getData: function () {
            var processParameters = this.item.data("processparameters");
            if (processParameters == undefined || null)
                processParameters = [];
            else
                processParameters = JSON.parse(processParameters);
            return processParameters;
        }
    };

    $.fn.ProcessParameter = function (opt) {
        var args = Array.prototype.slice.call(arguments, 1);

        for (var i = 0; i < this.length; i++) {
            var item = $(this), instance = item.data('ProcessParameter');
            if (!instance) {
                // create plugin instance if not created
                item.data('ProcessParameter', new ProcessParameter(this, opt));
            } else {
                // otherwise check arguments for method call
                if (typeof opt === 'string') {
                    return instance[opt].apply(instance, args);
                }
            }
        }
        return this;
    };

    //function checkEntry(e) {
    //    var k;
    //    document.all ? k = e.keyCode : k = e.which;
    //    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
    //}

}(jQuery));


$(".cont").ProcessParameter("getData");
$(".cont2").ProcessParameter("getData")
