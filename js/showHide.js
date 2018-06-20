var selectedSectionName = new Array();
//var selectedSectionName = new Array();
$(document).ready(function () {

    
    


    $("#newProject").hide();
    $("#proSetupPlane").hide();
    $("#projectSetupHead").hide();
    $("#projectSetupBody").hide();
    $("#proSetupSuccessAlertBackground").hide();
    $("#globalDecisionL1").hide();
    $("#globalDecisionL2").hide();
    $("#globalDecisionL3").hide();
    $("#globalDecSummBody").hide();
    $("#globalDecision").hide();
    $("#globalDecisionSuccessAlertBackground").hide();
    $("#rawBoq").hide();
    $("#rawBoqSuccessAlertBackground").hide();
    $("#pricingSheet").hide();
    $("#pTenderSheep").hide();
    $("#rawBoqBodyLevel2").hide();
    
    $("#rawBoqBodyLevel3").hide();
    $("#pricingSheetCalculateSuccessAlertBackground").hide();

    

    $("#newProjectBtn").click(function () {
        $("#splash").hide();
        $("#newProject").fadeIn();
        $("#proSetupPlane").fadeIn();
        $("#proSetupBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#newProBtnText").css("color", "#3f8d8a");
        $("#projectSetupHead").fadeIn();
        $("#projectSetupBody").fadeIn();


    });
        
        
    $("#proSetupDoneBtn").click(function () {
//        var projectName = $('#proSetupProjectNameInput').val();
//        var projectNumber = $('#proSetupProjectNumberInput').val();
//        var clientName = $('#proSetupclientNameInput').val();
//        if (!projectName || !projectNumber  || !clientName){
//           $("#proSetupProjectNameInput").val("Enter Project Name");
//           $("#proSetupProjectNumberInput").val("Enter Project Number");
//           $("#proSetupclientNameInput").val("Enter Client Name");
//        } else{
//            $("#proSetupSuccessAlertBackground").append(
//            "<div id=\"enteredProjectSetup\">" +
//            "<p id=\"homeBtnText\">" +
//                    "Project Name: "+ projectName + "</br>" +
//                    "Project Number: " + projectNumber + "</br>" +
//                    "Client Name: " + clientName + "</br>"
//                    + "</p>" +
//            "</div>"
//                    
//                );
            $("#proSetupSuccessAlertBackground").slideDown();
            $("#newProject").css("opacity", "0.1");
            
//        }
            
    
    });

    $("#proSetupNextBtn").click(function () {
        $("#proSetupSuccessAlertBackground").hide();
        $("#proSetupPlane").fadeIn();
        $("#proSetupBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#globalDecisionBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#newProBtnText").css("color", "#3f8d8a");
        $("#globalDecision").fadeIn();
        $("#globalDecisionL1").slideDown();
        $("#globalDecHeadL1").css("background-color", "#0aaaa4");
       
    });


    $("#globalDecisionL1DoneBtn").click(function () {
        $("#globalDecHeadL1").css("background-color", "#535353");
        $("#globalDecHeadL2").css("background-color", "#0aaaa4");
        $("#globalDecisionL1").hide();
        $("#globalDecisionL2").slideDown();
        
    });
    
    
 
    $("#globalDecisionL2DoneBtn").click(function () {
        
        $("#cldrWorkingDaysBtn").prop('disabled', true);
        $("#cldrWeekendDaysBtn").prop('disabled', true);
        $("#cldrProWeekendDaysBtn").css("opacity", "0.3");
        $("#cldrWorkingDaysBtn").css("opacity", "0.3");
        $("#globalDecHeadL2").css("background-color", "#535353");
        $("#globalDecHeadL3").css("background-color", "#0aaaa4");
        $("#globalDecisionL2").hide();
        $("#globalDecisionL3").slideDown();
        
    });
    
    $("#globalDecisionL3DoneBtn").click(function () {
        $("#globalDecHeadL3").css("background-color", "#535353");
        $("#globalDecSumm").css("background-color", "#0aaaa4");
        $("#globalDecisionL3").hide();
        $("#globalDecSummBody").slideDown();
        
    });
    
    $("#globalDecisionDoneBtn").click(function () {
        $("#globalDecisionSuccessAlertBackground").slideDown();
        $("#newProject").css("opacity", "0");
        $("#globalDecision").css("opacity", "0.1");

    });

    $("#globalDecisionNextBtn").click(function () {
        $("#globalDecisionSuccessAlertBackground").hide();
        $("#proSetupPlane").fadeIn();
        $("#proSetupBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#globalDecisionBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#rawBoqBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#newProBtnText").css("color", "#3f8d8a");
        $("#globalDecision").hide();
        $("#rawBoq").fadeIn();
        $("#rawBoqHeadL1").css("background-color", "#0aaaa4");
        $("#rawBoqBodyLevel2").hide();
        $("#rawBoqBodyLevel3").hide();
        $("#rawBoqBodySuccessLevel1").hide();
        $("#rawBoqBodySuccessLevel2").hide();
        $("#rawBoqBodySuccessLevel3").hide();

    });

    $("#rawBoqLevel1DoneBtn").click(function () {
        $("#rawBoqBodySuccessLevel1").slideDown();
        $("#rawBoqBodyLevel1").css("opacity", "0.1");
    });

    $("#rawBoqLevel1NextBtn").click(function () {
        $("#rawBoqBodySuccessLevel1").hide();
        $("#rawBoqBodyLevel1").hide();
        $("#rawBoqHeadL1").css("background-color", "#535353");
        $("#rawBoqHeadL2").css("background-color", "#0aaaa4");
        //$("#rawBoqBodyLevel3").hide();
        $("#rawBoqBodyLevel2").fadeIn();
    });

    $("#rawBoqLevel2DoneBtn").click(function () {
        $("#rawBoqBodySuccessLevel2").slideDown();
        $("#rawBoqBodyLevel1").css("opacity", "0");
        $("#rawBoqBodyLevel2").css("opacity", "0.1");
        //$("#rawBoqBodySuccessLevel3").slideDown();
    });

    $("#rawBoqLevel2NextBtn").click(function () {
        $("#rawBoqBodySuccessLevel2").hide();
        $("#rawBoqBodyLevel1").hide();
        $("#rawBoqBodyLevel2").hide();
        $("#rawBoqHeadL1").css("background-color", "#535353");
        $("#rawBoqHeadL2").css("background-color", "#535353");
        $("#pricingSheet").fadeIn();
        //$("#rawBoqHeadL3").css("background-color", "#0aaaa4");
        //$("#rawBoqBodyLevel3").fadeIn();
    });

//    $("#rawBoqLevel3DoneBtn").click(function () {
//        $("#rawBoqBodySuccessLevel3").slideDown();
//        $("#rawBoqBodyLevel1").css("opacity", "0");
//        $("#rawBoqBodyLevel2").css("opacity", "0");
//        //$("#rawBoqBodyLevel3").css("opacity","0.1");
//
//    });

//    $("#rawBoqLevel3NextBtn").click(function () {
//        $("#rawBoqBodySuccessLevel3").hide();
//        $("#pricingSheet").fadeIn();
//    });

    $("#pricingSheetRightFooterCalculateBtn").click(function () {
        $("#newProject").hide();
        $("#pricingSheetCalculateSuccessAlertBackground").fadeIn();
    });

    $("#pricingSheetOkBtn").click(function () {
        //$("#newProject").hide();
        $("#pricingSheetCalculateSuccessAlertBackground").hide();
        $("#pricingSheet").fadeIn();
    });

    $("#pricingSheetRightFooterViewBtn").click(function () {
        $("#newProject").hide();
        $("#pricingSheetCalculateSuccessAlertBackground").hide();
        $("#pTenderSheep").fadeIn();
    });


    $("#sectionIdInput").click(function () {
        var selOption = $('#sectionIdInput option:selected');
        $("#sectionIdTextF").prop('disabled', true);
        $('#sectionIdTextF').val(selOption.val());
    });


    function objectifyForm(formArray) {//serialize data function
        var returnArray = {};
        for (var i = 0; i < formArray.length; i++) {
            returnArray[formArray[i]['name']] = formArray[i]['value'];
        }
        return returnArray;
    }



    $("#rawBoqLevel1AddBtn").click(function () {
        var formDataArray = $("#rawBoqLevel1Form").serializeArray();
        var formDataJson1 = JSON.stringify(objectifyForm(formDataArray));
        var formDataJson = $.parseJSON(formDataJson1);
        var selOption = $('#sectionIdInput option:selected');
        console.log(JSON.stringify(formDataJson));
        //console.log(formDataJson.sectionName);
        console.log(selOption.text());  //Section Name
        console.log(formDataJson.sectionId); // Section ID
        console.log(formDataJson.activityName); //Activity Name
        console.log(formDataJson.activityId); //Activity ID
        var counter = 0;
        //$.each(formDataJson, function (i, data) {

//        $("#rawBoqLevel1UpdateListTable").append(
//                (jQuery.inArray(selOption.text(), selectedSectionName) !== -1) ? 
//        "<tr><td>" + formDataJson.activityName + "</td></tr>" :  
//                    "<tr><td class=\"sectionNameUpdateListHead\">" 
//		+ selOption.text() + "</td></tr>"
//                + "<tr><td>" + formDataJson.activityName + "</td></tr>"
//		//+ "<tr><td>" + formDataJson.activityName + "</td></tr>"
//                );
        if (jQuery.inArray(selOption.text(), selectedSectionName) !== -1) {
            $("#" + selOption.val()).append(
                    "<p class=\"sectionNameUpdateListLi\">" + formDataJson.activityName + "</p>"
                    );
        } else {
            $("#rawBoqLevel1UpdateListTable").append(
                    "<div id=\"" + selOption.val() + "\"><p class=\"sectionNameUpdateListHead\"> &nbsp;&nbsp;"
                    + selOption.text() + "</p>"
                    + "<p class=\"sectionNameUpdateListLi\">" + formDataJson.activityName + "</p></div>"
                    );
            selectedSectionName.push(selOption.text());
        }

    });

});