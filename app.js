var ProcessParameters = { Inputs: [], Outputs: [] };
var template = `
<div class="processparameter mt-3">
                                <div class="container">
                                    <div class="row processparameter-header" >
                                        <div class="col-12">
                                            <span>Ahmet</span>
                                            <div class="card-action-bar">
                                                <a  class="float-rigth" >
                                                    <i class="fa fa-trash-alt"></i>
                                                </a>
                                                <a data-toggle="collapse" class="float-rigth" data-target="">
                                                    <i class="fa fa-pencil"></i>
                                                </a>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="collapse">
                                        <div class="row">
                                            <div class="col-sm-6">
                                                <label>Adı</label>
                                                <input type="text" class="form-control" name="card-mes-name-input-field">
                                            </div>
                                            <div class="col-sm-6">
                                                <label>Görünen Adı</label>
                                                <input type="text" class="form-control" name="card-mes-name-input-field">
                                            </div>
                                            <div class="col-sm-6">
                                                <label>Format</label>
                                                <div class="input-group mb-3">
                                                    <select class="custom-select" name="card-mes-select-input-field">
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
                                                <p class="card-mes-text-p">Zorunlu</p>
                                                <label class="switch custom-mes-switch">
                                                    <input type="checkbox" name="card-mes-required-input-field">
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            <div class="col-sm-2">
                                                <p class="card-mes-text-p">Çoklanabilir</p>
                                                <label class="switch custom-mes-switch">
                                                    <input type="checkbox" name="card-mes-multiple-input-field">
                                                    <span class="slider round"></span>
                                                </label>
                                            </div>
                                            <div class="col-sm-6">
                                                <div class="row selections-container" style="display:none">             
                                                    <div class="mb-2 col-12 row">
                                                        <div class="col-9">
                                                            <label>Seçim</label>
                                                         </div>
                                                         <div class="col-3">
                                                            
                                                         </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="row">
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
                            </div>
`;
var DDtemplate = `
<div class="selection-item mb-2 col-12 row">
    <div class="col-9">
         <input type="text" class="form-control" id="dropdown-input-field">
     </div>
     <div class="col-3">
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
        Selection: null,
    };
};


$(".processparameters-container .new-processparameter").click(function () {
    var templateObj = $(template);

    templateObj.find(".save-processparameter").click(function () {
        var container = $(this).closest(".processparameter");
        var obj = createObj();
        obj.Name = container.find("input[name=card-mes-name-input-field]").val();
        obj.DisplayName = container.find("input[name=card-mes-name-input-field]").val();
        obj.Type = container.find("select[name=card-mes-select-input-field]").val();
        obj.Unit = container.find("input[name=card-mes-unit-input-field]").val();

        obj.Selection = [];
        var selections = container.find(".selections-container .selection-item input");
        for (var i = 0; i < selections.length; i++) {
            obj.Selection.push({ Value: $(selections[i]).val(), Text: $(selections[i]).val() });
        }
        obj.Required = container.find("input[name=card-mes-required-input-field]")[0].checked;
        obj.Clonable = container.find("input[name=card-mes-multiple-input-field]")[0].checked;
        ProcessParameters.Inputs.push(obj);


    });

    templateObj.find(".processparameter-header .fa-trash-alt ").on("click", function () {
        var objName = $(this).closest(".processparameter").find("input").first().val();

        for (i = 0; i < ProcessParameters.Inputs.length; i++) {
            if (ProcessParameters.Inputs[i].Name == objName) {
                ProcessParameters.Inputs.splice(i, 1);
                $(".processparameter")[i].remove();
            };
        };
        
    });

    templateObj.find(".processparameter-header .fa-pencil ").on("click", function () {

        $(this).closest(".processparameter").find(".collapse").toggle();

        

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

    templateObj.prependTo($(".processparameters-container"));

    //$(".processparameter").find("input").first().val()

    //$(".processparameter").on("click")
});



