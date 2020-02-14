(function ($) {



    function ProcessParameter(item, options) {


        this.options = $.extend({
            checkboxItemEnabled: false
        }, options);
        if (!this.options.ProcessParameters)
            this.options.ProcessParameters = [];
        this.item = $(item);
        this.init();
    }
    ProcessParameter.prototype = {
        init: function () {




            var InputType = {
                Text: "1",
                Number: "2",
                Dropdown: "3",
                Checkbox: "4"
            }
            var template = `
                            <div class="processparameter dragcontent mt-3">
                                <div class="container">
                                    <div class="row processparameter-header">
                                        <div class="col-12">
                                        <i class="dragable fas fa-arrows-alt"></i>
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
                                                        <option selected="selected" id="card-mes-select-input-field-special">Choose and Add Value</option>
                                                        <option value="1">Text</option>
                                                        <option value="2">Number</option>
                                                        <option value="3">Dropdown</option>
                                                        <option value="4">Checkbox</option>
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
                                            <div class="col-sm-3"> </div>
                                            <div class="col-sm-3">
                                                <div class="d-flex justify-content-center">
                                                    <input type="button" class="btn save-processparameter" value="Save">
                                                </div>
                                            </div>
                                            <div class="col-sm-3">
                                                <div class="d-flex justify-content-center">
                                                    <input type="button" class="btn cancel-processparameter" value="cancel">
                                                </div>
                                            </div>
                                            <div class="col-sm-3"> </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `
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
                        return parmeters[i];

                    }
                }
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

            function collapseAll() {
                $container.find(".collapse").removeClass("show");
                $container.find(".processparameter-header").show();
            }

            function saveParameter(processParameter, hiddenNameInput) {
                var existedItem;

                var existedName = hiddenNameInput ? hiddenNameInput.val() : null;
                if (existedName && existedName == processParameter.Name) {
                    existedItem = null;
                }
                else {
                    existedItem = getProcessParmeterByName(processParameter.Name);
                }

                if (existedItem) {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'İsim, başka parametre ismi ile çakışıyor!'
                    });
                    return
                }
                if (existedName)
                    updateProcessParameter(existedName, processParameter)
                else
                    addProcessParameter(processParameter);

                hiddenNameInput.val(processParameter.Name);
                collapseAll();
                $(this).closest(".processparameter").find(".param-name").text(processParameter.DisplayName);
            }

            function addParameter(jsonData) {
                var templateObj = $(template);

                collapseAll();

                var nameInput = templateObj.find("input[name=card-mes-name-input-field]");
                nameInput.keypress(function (e) {
                    var k;
                    document.all ? k = e.keyCode : k = e.which;
                    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || (k >= 48 && k <= 57));

                });

                templateObj.find(".cancel-processparameter").click(function () {
                    var container = $(this).closest(".processparameter");
                    var hiddenNameInput = container.find("input[name='parameter-name']")
                    if (!hiddenNameInput.val()) {
                        container.remove();
                        return;
                    }

                    var existingObj = getProcessParmeterByName(hiddenNameInput.val());
                    var newObj = getJsonForProcessParameter(container);
                    if (JSON.stringify(existingObj) === JSON.stringify(newObj)) {
                        $(this).closest(".collapse").toggle();
                        $(this).closest(".processparameter").find(".processparameter-header").toggle();
                        return;
                    }



                    Swal.fire({
                        title: 'Değişiklikleri var!!',
                        text: "Kaydetmek istiyormusun",
                        icon: 'warning',
                        showCancelButton: true,
                        confirmButtonColor: '#3085d6',
                        cancelButtonColor: '#d33',
                        confirmButtonText: 'Evet'
                    }).then((result) => {
                        if (result.dismiss == "cancel") {
                            container.empty();
                            container.append(addParameter(existingObj).children());
                            $(this).closest(".collapse").toggle();
                            $(this).closest(".processparameter").find(".processparameter-header").toggle();
                            return;

                        } else if (result.dismiss == "continue") {
                            return;
                        }
                        saveParameter(newObj, hiddenNameInput);


                        Swal.fire(
                            'Kaydedildi!',
                            'Parametre güncellemeniz kaydedildi',
                            'success'
                        )
                    });

                });
                templateObj.find(".save-processparameter").click(function () {
                    var container = $(this).closest(".processparameter");
                    var obj = getJsonForProcessParameter(container);
                    saveParameter(obj, container.find("input[name='parameter-name']"));
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
                    //$(".collapse").hide();
                    //$(".cont").find(".collapse").removeClass("show");
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
                //templateObj.find(".collapse").addClass("show");
                //templateObj.find(".processparameter-header").hide();

                if (jsonData) {
                    templateObj.find("input[name=card-mes-name-input-field]").val(jsonData.Name);
                    templateObj.find("input[name=card-mes-displayname-input-field]").val(jsonData.DisplayName);
                    templateObj.find("select[name=card-mes-select-input-field]").val(jsonData.Type);
                    templateObj.find("input[name=card-mes-unit-input-field]").val(jsonData.Unit);

                    if (jsonData.Type == InputType.Dropdown) {
                        var selectionContainer = templateObj.find(".selections-container");
                        for (var i = 0; i < jsonData.Selection; i++) {
                            selectionContainer.append(addSelection(jsonData.Selection[i]));
                        }
                    }
                    templateObj.find("input[name=card-mes-required-input-field]")[0].checked = jsonData.Required;
                    templateObj.find("input[name=card-mes-multiple-input-field]")[0].checked = jsonData.Clonable;
                    templateObj.find("input[name=parameter-name]").val(jsonData.Name);
                    templateObj.find(".param-name").text(jsonData.DisplayName);
                }
                return templateObj;
            }

            function addSelection(val) {
                var selectionTemplate = $(DDtemplate);
                selectionTemplate.find(".selection-item").val(val);
                selectionTemplate.find(".add").click(function () {
                    var tempSelection = addSelection();
                    tempSelection.insertAfter($(this).closest(".selection-item"));
                });
                selectionTemplate.find(".remove").click(function () {
                    $(this).closest(".selection-item").remove();
                });
                return selectionTemplate;
            }

            function getJsonForProcessParameter(container) {

                var obj = createObj();
                var paramName = container.find("input[name=card-mes-name-input-field]").val();

                obj.Name = paramName;
                obj.DisplayName = container.find("input[name=card-mes-displayname-input-field]").val();
                obj.Type = container.find("select[name=card-mes-select-input-field]").val();
                obj.Unit = container.find("input[name=card-mes-unit-input-field]").val();

                obj.Selection = [];
                if (obj.Type == InputType.Dropdown) {

                    var selections = container.find(".selections-container .selection-item input");
                    for (var i = 0; i < selections.length; i++) {
                        obj.Selection.push({ Value: $(selections[i]).val(), Text: $(selections[i]).val() });
                    }
                }

                obj.Required = container.find("input[name=card-mes-required-input-field]")[0].checked;
                obj.Clonable = container.find("input[name=card-mes-multiple-input-field]")[0].checked;
                return obj;
            }

            function reloadProcessParameters(processParameters) {

            }

            function orderJsonFromByElements() {

                var processParameters = [];
                var elements = $container.find(".processparameter");
                for (var i = 0; i < elements.length; i++) {
                    processParameters.push(getJsonForProcessParameter($(elements[i])));
                }
                updateProcessParameters(processParameters);
            }
            var $container = this.item;


            $container.qualistsortable({ onAfterRelease: orderJsonFromByElements })

            $container.addClass("processparameters-container");
            $container.append($(addButtonTemplate));
            $container.find(".new-processparameter").click(function () {
                addParameter().insertBefore($(this));
                $(this).find(".collapse").show();

            });

            var addNewButton = $container.find(".new-processparameter");
            for (var i = 0; i < this.options.ProcessParameters.length; i++) {
                addParameter(this.options.ProcessParameters[i]).insertBefore(addNewButton);
            }
            updateProcessParameters(this.options.ProcessParameters);
            //collapseAll();
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

}(jQuery));





$(document).ready(function () {
    $(".cont").ProcessParameter({
        ProcessParameters: [{ "Name": "ahmet", "DisplayName": "4", "Unit": "", "Type": "2", "Required": false, "Clonable": false, "Value": null, "CloneIndex": null, "Selection": [] }, { "Name": "3", "DisplayName": "3", "Unit": "", "Type": "Choose and Add Value", "Required": false, "Clonable": false, "Value": null, "CloneIndex": null, "Selection": [] }, { "Name": "asd", "DisplayName": "sd", "Unit": "", "Type": "Choose and Add Value", "Required": false, "Clonable": false, "Value": null, "CloneIndex": null, "Selection": [] }, { "Name": "1", "DisplayName": "2", "Unit": "", "Type": "2", "Required": false, "Clonable": false, "Value": null, "CloneIndex": null, "Selection": [] }]
    });
    $(".cont2").ProcessParameter("getData")

});