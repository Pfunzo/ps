var totalWeekendDays;var totalWeekendDays;var collectedDays;var prTotalNoneWorkingDays;var summNoWDperYear;var summNoWDperMonth;var summNoWHperDay;var summNoWHperWeek;
var collectedMonths;var summTotalWMonths;var pjPercOverheads;var pjPpercProfit;var prTotalWorkingDays;var gloDecProjectRange;var gloDecDailyWorkingHours;var AverageWeeksPMonth;
var woHrsPWeek;var days;var beginDate;var lastDate;
var nwd_daysArray = new Array();var nwd_dateObjectArray = new Array();var nwd_dateObjectArray2 = new Array();var pw_daysArray = new Array();
var pw_dateObjectArray = new Array();var pw_dateObjectArray2 = new Array();var pw_arrayDates = new Array();var nwd_arrayDates = new Array();
var allProjectDaysDateArray = new  Array();var selectedSectionName = new Array();var selectedSectionName_D = new Array();var selectedActivityName_D = new Array();
var actMonths;var actDays;var fullYear = 365;var fullMonth = 30;var fullWeek = 7;var workingDaysProjectDatesArray = new Array(); var rateType;	

$(function() {
                $('input[name="datefilter"]').daterangepicker({
                    autoUpdateInput: false,
                        locale: {
			cancelLabel: 'Clear'
			}
		});

		$('input[name="datefilter"]').on('apply.daterangepicker', function(ev, picker) {
                    $(this).val(picker.startDate.format('MM/DD/YYYY') + ' - ' + picker.endDate.format('MM/DD/YYYY'));
                    var twoDates = $("#globalDecProRangeInput").val();
                    var splitTwoDates = twoDates.split(' - ');
                    beginDate = moment(splitTwoDates[0]); //start date
                    lastDate = moment(splitTwoDates[1]); // another date
                    var duration = moment.duration(lastDate.diff(beginDate));
                    while (beginDate <= lastDate) {
                        allProjectDaysDateArray.push( moment(beginDate).format('MM/DD/YYYY'));
                        beginDate = moment(beginDate).add(1, 'days');
                    };
                    console.log(allProjectDaysDateArray.length); //testing printing dates between
                    days = duration.asDays();
                    var months = duration.asMonths();
                    var years = duration.asYears();
                    collectedDays = allProjectDaysDateArray.length;
                    collectedMonths = Math.floor((allProjectDaysDateArray.length)/30);
                    
                    var actuYrs;
                    var yrsRemainder = Math.floor(collectedDays%365);
                    								
                    if(collectedDays >= fullYear){
                    actuYrs = Math.floor(collectedDays/fullYear);
                    actMonths = Math.floor(yrsRemainder/fullMonth);
                    actDays = Math.floor(yrsRemainder%fullMonth);
                        } else if(collectedDays < fullYear){
                            actuYrs = 0;
                            actMonths = Math.floor(collectedDays/fullMonth);
                            actDays = Math.floor(collectedDays%fullMonth);
                                } else{
                                    actuYrs = 0;
                                    actMonths = 0;
                                    actDays = collectedDays;
                                    }
                    
                    
                    console.log(actMonths);
                    $("#globalDecDurationInputNoYrs").val(actuYrs);
                    $("#globalDecDurationInputNoMths").val(actMonths);
                    $("#globalDecDurationInputNoDays").val(actDays);
                    
                                   
                });

		$('input[name="datefilter"]').on('cancel.daterangepicker', function(ev, picker) {
				  $(this).val('');
			  });

			});
                        
function dateArrayToTimestampArray(dateArray){
   var timestampArray = new Array();
   for(var i=0; i < dateArray.length; i++){
       //timestampArray[i] = dateArray[i].getTime();
       //console.log(dateArray[i]);
        timestampArray.push(new Date(dateArray[i].replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$3-$1-$2')).getTime());
       
   }
    return timestampArray;
}


var selectedDatesArray;
var nwd_days_string = "";
var pw_days_string = "";
var tmp;
$(document).ready(function () {
    var url = "http://54.234.56.15:8091";
    var projectID;

$("#newProject").hide();$("#proSetupPlane").hide();$("#projectSetupHead").hide();$("#projectSetupBody").hide();$("#proSetupSuccessAlertBackground").hide();$("#globalDecisionL1").hide();
$("#globalDecisionL2").hide();$("#globalDecisionL3").hide();$("#globalDecSummBody").hide();$("#globalDecision").hide();$("#tenderForResources").hide();$("#globalDecisionSuccessAlertBackground").hide();
$("#rawBoq").hide();$("#rawBoqBodySuccessLevel1").hide();$("#rawBoqBodySuccessLevel2").hide();$("#rawBoqBodySuccessLevel3").hide();$("#rawBoqSuccessAlertBackground").hide();
$("#testTableContent").hide();$("#pldRpt").hide();
//$("#pricingSheet").hide();
$("#pTenderSheep").hide();$("#rawBoqBodyLevel2").hide();$("#rawBoqBodyLevel3").hide();$("#pricingSheetSummary").hide();$("#pricingSheetCalculateSuccessAlertBackground").hide();
$("#prTotalWDaysInput").prop('disabled', true);$("#noWorkingDaysPYearInput").prop('disabled', true);$("#noWorkingDaysPMonthInput").prop('disabled', true);$("#noHoursPDayInput").prop('disabled', true);
$("#noHoursPWeekInput").prop('disabled', true);$("#averageWeekspMonthInput").prop('disabled', true);$("#noMonthsInput").prop('disabled', true);$("#percOverheadsInput").prop('disabled', true);
$("#percProfitInput").prop('disabled', true);$("#addSelectednwdNWDBtn").hide();$("#addSelectednwdPWBtn").hide();$("#addSelectednwdWDBtn").hide();
$("#globalDecDurationInputNoYrs").prop('disabled', true);$("#globalDecDurationInputNoDays").prop('disabled', true);$("#globalDecDurationInputNoMths").prop('disabled', true);

    $("#newProjectBtn").click(function () {
        $("#splash").hide();$("#newProject").fadeIn(); $("#proSetupPlane").fadeIn();
        $("#proSetupBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#newProBtnText").css("color", "#3f8d8a");
        $("#projectSetupHead").fadeIn();$("#projectSetupBody").fadeIn();
    });
        
        
    $("#proSetupDoneBtn").click(function () {
        $("#addSelectedDaysBtn").prop('disabled', true);
        $("#addSelectedDaysBtn").css("opacity", "0.3");
        var projectName = $('#proSetupProjectNameInput').val();
        var projectNumber = $('#proSetupProjectNumberInput').val();
        var clientName = $('#proSetupclientNameInput').val();
        
        var formDataArray = $("#proSetupForm").serializeArray();
        var formDataJson1 = JSON.stringify(objectifyForm(formDataArray));
        var formDataJson = $.parseJSON(formDataJson1);
        
        if (!projectName){
           $("#proSetupProjectNameInput").css("border", "solid 1px red");
        } else if(!projectNumber){
                $("#proSetupProjectNumberInput").css("border", "solid 1px red");
            } else if(!clientName){
                    $("#proSetupclientNameInput").css("border", "solid 1px red");
                } else{
                    $("#proSetupSuccessAlertBackground").append(
                    "<div id=\"enteredProjectSetup\">" +
                    "<p id=\"homeBtnText\">" +
                    "Project Name: "+ projectName + "</br>" +
                    "Project Number: " + projectNumber + "</br>" +
                    "Client Name: " + clientName + "</br>"
                    + "</p>" +
					"</div>" );
                                
                               /// console.log(formDataJson1);
//                    $.ajax({
//                        type: "POST",
//                        url: url +"/api/v1/project/new?key=ps_backendv1.0_api_key",
//                        data: formDataJson1,
//                        //contentType: "application/json",
//                        headers: {
//                            Accept: "application/json; charset=utf-8",
//                            "Content-Type": "application/json; charset=utf-8"
//                        },
//                        timeout: 2000, // timeout milliseconds
//                        success: function (data, status, xhr) {   // success callback function
//                            $('#errorMessage').empty();
//                            $('#errorMessage').append(JSON.stringify(data) + " Added Succesfully");
//                            projectID = data.id;
//                        },
//                        error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                            $('#errorMessage').empty();
//                            $('#errorMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                        }
//                    }); 
                 
                }
                 $("#proSetupSuccessAlertBackground").slideDown();
                $("#newProject").css("opacity", "0.1"); 
                    
        
    });

    $("#globalDecHeadL1").click(function(){
        $("#globalDecHeadL1").css("background-color", "#0aaaa4");$("#globalDecisionL1").slideDown();$("#globalDecisionL2").hide();
        $("#globalDecisionL3").hide();$("#globalDecSummBody").hide();$("#globalDecHeadL2").css("background-color", "#535353");$("#globalDecHeadL3").css("background-color", "#535353");
        $("#globalDecSumm").css("background-color", "#535353");
    });
    
    $("#globalDecHeadL2").click(function(){$("#globalDecHeadL2").css("background-color", "#0aaaa4");$("#globalDecisionL1").hide();$("#globalDecisionL2").slideDown();
    $("#globalDecisionL3").hide();$("#globalDecSummBody").hide();$("#globalDecHeadL1").css("background-color", "#535353");$("#globalDecHeadL3").css("background-color", "#535353");
    $("#globalDecSumm").css("background-color", "#535353");
    });
    
    $("#globalDecHeadL3").click(function(){
        $("#globalDecHeadL3").css("background-color", "#0aaaa4");$("#globalDecisionL1").hide();$("#globalDecisionL2").hide();$("#globalDecisionL3").slideDown();$("#globalDecSummBody").hide();
        $("#globalDecHeadL1").css("background-color", "#535353");$("#globalDecHeadL2").css("background-color", "#535353");$("#globalDecSumm").css("background-color", "#535353");
    });
    
    $("#globalDecSumm").click(function(){
        $("#globalDecSumm").css("background-color", "#0aaaa4");$("#globalDecisionL1").hide();$("#globalDecisionL2").hide();$("#globalDecisionL3").hide();$("#globalDecSummBody").slideDown();
    $("#globalDecHeadL1").css("background-color", "#535353");$("#globalDecHeadL2").css("background-color", "#535353");$("#globalDecHeadL3").css("background-color", "#535353");
    });
    
    $("#proSetupNextBtn").click(function () {
        $("#proSetupSuccessAlertBackground").hide();$("#proSetupPlane").fadeIn();
        $("#proSetupBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#globalDecisionBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#newProBtnText").css("color", "#3f8d8a");$("#globalDecision").fadeIn();$("#globalDecisionL1").slideDown();$("#globalDecHeadL1").css("background-color", "#0aaaa4");
    });

    $("#globalDecisionL1DoneBtn").click(function () {
        
        pjPercOverheads = $('#globalDecPercOverHInput').val();
        pjPpercProfit = $('#globalDecPercProfInput').val();
        
        if (!pjPercOverheads){
           $("#globalDecPercOverHInput").css("border", "solid 1px red");
        } else if(!pjPpercProfit){
                $("#globalDecPercProfInput").css("border", "solid 1px red");
            } else{
                    $("#globalDecHeadL1").css("background-color", "#535353");
                    $("#globalDecHeadL2").css("background-color", "#0aaaa4");
                    $("#globalDecisionL1").hide();
                    $("#globalDecisionL2").slideDown();                   
                }
    });
     
    $("#globalDecisionL2DoneBtn").click(function () {
        
        gloDecProjectRange = $("#globalDecProRangeInput").val();
        gloDecDailyWorkingHours = $("#globalDecDurationHoursInput").val();
        if (!gloDecProjectRange){
           $("#globalDecProRangeInput").css("border", "solid 1px red");
        } else if(!gloDecDailyWorkingHours){
                $("#globalDecDurationHoursInput").css("border", "solid 1px red");
            } else{
                $("#globalDecHeadL2").css("background-color", "#535353");
                $("#globalDecHeadL3").css("background-color", "#0aaaa4");
                $("#globalDecisionL2").hide();
                $("#globalDecisionL3").slideDown();
                
                tmp = $('#mdp-demo').multiDatesPicker({
                minDate: beginDate._i,
                maxDate: lastDate._i,
                onSelect: function(dateText, inst){
                var selected = $(this).val();
                selectedDatesArray = selected;
                }
                });
            }  
            
           // console.log("F : " + lastDate);
        //console.log("S : " +lastDate._i);
    });
        
    $("#cldrNonWorkingDaysBtn").click(function () {
        tmp.multiDatesPicker('resetDates', 'picked');
        $("#addSelectednwdNWDBtn").show();
        $("#addSelectednwdPWBtn").hide();
        $("#addSelectednwdWDBtn").hide();
    });
   
    $("#addSelectednwdNWDBtn").click(function(){
            nwd_days_string += (nwd_days_string === "" ? "" : ",") + selectedDatesArray;
            nwd_arrayDates = nwd_days_string.split(", ");
            for (var i = 0; i < nwd_arrayDates.length; i++) {
                    var nwdFromString = nwd_arrayDates[i].split("/");
                    var nwdF = new Date(nwdFromString[2], nwdFromString[0] - 1, nwdFromString[1]);
                    nwd_daysArray.push(nwdF.getDate());
                    nwd_dateObjectArray2.push(nwdF);
                    var newDate = new Date();
                    nwd_dateObjectArray.push(newDate.setDate(nwdF.getDate()));
            }
            tmp.multiDatesPicker('addDates', nwd_dateObjectArray2, 'disabled');
            var noneWDays = nwd_dateObjectArray2.length;
            $("#splitRange").val(noneWDays);
            $("#displayText").val(nwd_daysArray[0]);
            totalNoneWDays = nwd_dateObjectArray2.length; //number of none working days
    });
    
    $("#cldrProWeekendDaysBtn").click(function () {
        tmp.multiDatesPicker('resetDates', 'picked');
        $("#addSelectednwdNWDBtn").hide();$("#addSelectednwdPWBtn").show();$("#addSelectednwdWDBtn").hide();    
    });
    
    $("#addSelectednwdPWBtn").click(function(){
            pw_days_string += (pw_days_string === "" ? "" :",") + selectedDatesArray;
            pw_arrayDates = pw_days_string.split(", ");
            for (var j = 0; j < pw_arrayDates.length; j++) {
                    var pwFromString = pw_arrayDates[j].split("/");
                    var pwF = new Date(pwFromString[2], pwFromString[0] - 1, pwFromString[1]);
                    pw_daysArray.push(pwF.getDate());
                    pw_dateObjectArray2.push(pwF);
                    var newDate = new Date();
                    pw_dateObjectArray.push(newDate.setDate(pwF.getDate()));
            }
            tmp.multiDatesPicker('addDates', pw_dateObjectArray2, 'disabled');
            var noneWDays = pw_dateObjectArray2.length;
            $("#splitRange").val(noneWDays);
            $("#displayText").val(pw_daysArray[0]);
            totalWeekendDays = pw_dateObjectArray2.length; //number of none working days
    });
    
    $("#cldrWorkingDaysBtn").click(function () {
        $("#addSelectednwdNWDBtn").hide();$("#addSelectednwdPWBtn").hide();$("#addSelectednwdWDBtn").show(); 
    });

    $("#globalDecisionL3DoneBtn").click(function () {
        $("#globalDecHeadL3").css("background-color", "#535353");$("#globalDecSumm").css("background-color", "#0aaaa4");$("#globalDecisionL3").hide();$("#globalDecSummBody").slideDown();
	prTotalNoneWorkingDays = totalNoneWDays + totalWeekendDays; //this totalWeekendDays is all disabled days, do not be confused
        prTotalWorkingDays = collectedDays - prTotalNoneWorkingDays;
        prAverageWorkingDaysPerMonth = prTotalWorkingDays/actMonths;
        summNoWHperDay = $("#globalDecDurationHoursInput").val();
        woHrsPWeek = summNoWHperDay*5;
        $("#prTotalWDaysInput").val(prTotalWorkingDays);
        $("#noWorkingDaysPMonthInput").val(prAverageWorkingDaysPerMonth.toFixed(1));
        $("#noHoursPDayInput").val(summNoWHperDay);
        $("#averageWeekspMonthInput").val("4.3");
        $("#noHoursPWeekInput").val(woHrsPWeek);
        $("#noMonthsInput").val(actMonths);
//        if(actMonths == 0){
//                        actMonths = 1;
//                    }
//        
        $("#percOverheadsInput").val(pjPercOverheads);
        $("#percProfitInput").val(pjPpercProfit);
        var nwd_remainDaysArray = allProjectDaysDateArray;
        var search_term_1 = nwd_arrayDates;
        var search_term_2 = pw_arrayDates;
        var nwd_a_pwd_remainDaysArray = _.difference(nwd_remainDaysArray, search_term_1);
        workingDaysProjectDatesArray = _.difference(nwd_a_pwd_remainDaysArray, search_term_2);
        //console.log("left  :" + workingDaysProjectDatesArray);
    });
    
    
    
    $("#globalDecisionSummDoneBtn").click(function () {
        $("#globalDecision").hide();$("#newProject").hide();$("#tenForResPlantBody").fadeIn();$("#tenForResPeopleBody").hide();$("#tenForResMaterialBody").hide();
        $("#tenForResFuelBody").hide();$("#tenForResOthersBody").hide();$("#tenForResHeadL1").css("background-color", "#0aaaa4");$("#globalDecisionSuccessAlertBackground").hide();
        $("#tenForResBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});$("#tenderForResources").fadeIn();
        $("#tenForResPlantSaveBtn").show();$("#tenForResPeopleSaveBtn").hide();$("#tenForResMaterialSaveBtn").hide();$("#tenForResFuelSaveBtn").hide();
        
      //var formDataArray = $("#addGlobalDecisionForm").serializeArray();
      var formDataJson1 = "{overheadsPercentage: " + pjPercOverheads + ", profitPercentage: " + pjPpercProfit + ", \n\
                            workingHoursPerDay: " + gloDecDailyWorkingHours + ", startDate: " + beginDate + 
                            ", endDate: " + lastDate + ", workingDays: [" + dateArrayToTimestampArray(workingDaysProjectDatesArray) + 
                            "], projectWeekendDays: [" + dateArrayToTimestampArray(pw_arrayDates) + 
                            "], nonWorkingDays: [" + dateArrayToTimestampArray(nwd_arrayDates) + "]}";
//        $.ajax({
//                type: "POST",
//                url: url + "/api/v1/globalDecision/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: formDataJson1,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addGlobalDecisionMessage').empty();
//                    $('#addGlobalDecisionMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addGlobalDecisionMessage').empty();
//                    $('#addGlobalDecisionMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });        
        
   });
   
   $("#tenForResHeadL1").click(function(){
       $("#tenForResHeadL1").css("background-color", "#0aaaa4"); $("#tenForResHeadL2").css("background-color", "#535353");  $("#tenForResHeadL3").css("background-color", "#535353"); $("#tenForResHeadL4").css("background-color", "#535353");  $("#tenForResHeadL5").css("background-color", "#535353");
       $("#tenForResPlantBody").fadeIn(); $("#tenForResPeopleBody").hide();  $("#tenForResMaterialBody").hide(); $("#tenForResFuelBody").hide(); $("#tenForResOthersBody").hide();
       $("#tenForResPlantSaveBtn").show();$("#tenForResPeopleSaveBtn").hide();$("#tenForResMaterialSaveBtn").hide();$("#tenForResFuelSaveBtn").hide();
       });
   
   $("#tenForResHeadL2").click(function(){
       $("#tenForResHeadL2").css("background-color", "#0aaaa4"); $("#tenForResHeadL1").css("background-color", "#535353"); $("#tenForResHeadL3").css("background-color", "#535353"); $("#tenForResHeadL4").css("background-color", "#535353"); $("#tenForResHeadL5").css("background-color", "#535353");
       $("#tenForResPlantBody").hide(); $("#tenForResPeopleBody").fadeIn(); $("#tenForResMaterialBody").hide(); $("#tenForResFuelBody").hide(); $("#tenForResOthersBody").hide();
	   $("#tenForResPlantSaveBtn").hide();$("#tenForResPeopleSaveBtn").show();$("#tenForResMaterialSaveBtn").hide();$("#tenForResFuelSaveBtn").hide();
   });
   
   $("#tenForResHeadL3").click(function(){
       $("#tenForResHeadL3").css("background-color", "#0aaaa4"); $("#tenForResHeadL1").css("background-color", "#535353"); $("#tenForResHeadL2").css("background-color", "#535353"); $("#tenForResHeadL4").css("background-color", "#535353"); $("#tenForResHeadL5").css("background-color", "#535353");
       $("#tenForResPlantBody").hide(); $("#tenForResPeopleBody").hide(); $("#tenForResMaterialBody").fadeIn(); $("#tenForResFuelBody").hide(); $("#tenForResOthersBody").hide();
       $("#tenForResPlantSaveBtn").hide();$("#tenForResPeopleSaveBtn").hide();$("#tenForResMaterialSaveBtn").show();$("#tenForResFuelSaveBtn").hide();
       });
   
   $("#tenForResHeadL4").click(function(){
       $("#tenForResHeadL4").css("background-color", "#0aaaa4"); $("#tenForResHeadL1").css("background-color", "#535353"); $("#tenForResHeadL2").css("background-color", "#535353"); $("#tenForResHeadL3").css("background-color", "#535353"); $("#tenForResHeadL5").css("background-color", "#535353");
       $("#tenForResPlantBody").hide(); $("#tenForResPeopleBody").hide(); $("#tenForResMaterialBody").hide(); $("#tenForResFuelBody").fadeIn(); $("#tenForResOthersBody").hide();
       $("#tenForResPlantSaveBtn").hide();$("#tenForResPeopleSaveBtn").hide();$("#tenForResMaterialSaveBtn").hide();$("#tenForResFuelSaveBtn").show();
       });
   
   $("#tenForResPlantSaveBtn").click(function(){
        $("#tenForResHeadL2").css("background-color", "#0aaaa4"); $("#tenForResHeadL1").css("background-color", "#535353"); $("#tenForResHeadL3").css("background-color", "#535353"); $("#tenForResHeadL4").css("background-color", "#535353"); $("#tenForResHeadL5").css("background-color", "#535353");
        $("#tenForResPlantBody").hide(); $("#tenForResPeopleBody").fadeIn(); $("#tenForResMaterialBody").hide(); $("#tenForResFuelBody").hide(); $("#tenForResOthersBody").hide();
        $("#tenForResPlantSaveBtn").hide();$("#tenForResPeopleSaveBtn").show();$("#tenForResMaterialSaveBtn").hide();$("#tenForResFuelSaveBtn").hide();
        
        plRowCount = $('#plaPricingSheetTable tr').length;
        $('[name="plQtyPS"]').change(function(){
            for(var a=0; a < 3; a++){
                var plRawSellRate = $('[name="plSellRatePS"]').val();
                var plRawQty = $('[name="plQtyPS"]').val();
                var plPricingRate = plRawQty * plRawSellRate;
                $('[name="plPricingRatePS"]').val(plPricingRate.toFixed(2));

            }
        });
        
        $("#plaPricingSheetTable tr").each(function(){
        $(this).find("td:eq(2)").change(function(){
                for(var a=0; a < plRowCount; a++){
                    var plRawSellRateAuto = $('[name="plSellRatePS_a'+a+'"]').val();
                    var plRawQtyAuto = $('[name="plQtyPS_a'+a+'"]').val();
                    var plPricingRateAuto = plRawSellRateAuto * plRawQtyAuto;
                    $('[name="plPricingRatePS_a'+a+'"]').val(plPricingRateAuto.toFixed(2));
                }
            });
	 });
    });
   
   $("#tenForResPeopleSaveBtn").click(function(){
        $("#tenForResHeadL3").css("background-color", "#0aaaa4"); $("#tenForResHeadL1").css("background-color", "#535353"); $("#tenForResHeadL2").css("background-color", "#535353"); $("#tenForResHeadL4").css("background-color", "#535353"); $("#tenForResHeadL5").css("background-color", "#535353");
        $("#tenForResPlantBody").hide(); $("#tenForResPeopleBody").hide(); $("#tenForResMaterialBody").fadeIn(); $("#tenForResFuelBody").hide(); $("#tenForResOthersBody").hide();
        $("#tenForResPlantSaveBtn").hide();$("#tenForResPeopleSaveBtn").hide();$("#tenForResMaterialSaveBtn").show();$("#tenForResFuelSaveBtn").hide();
        peoRowCount = $('#peoPricingSheetTable tr').length;
        $('[name="peoQtyPS"]').change(function(){
            for(var a=0; a < 3; a++){
                var peoRawSellRate = $('[name="peoSellRatePS"]').val();
                var peoRawQty = $('[name="peoQtyPS"]').val();
                var peoPricingRate = peoRawQty * peoRawSellRate;
                $('[name="peoPricingRatePS"]').val(peoPricingRate.toFixed(2));
            }
        });
        $("#peoPricingSheetTable tr").each(function(){
        $(this).find("td:eq(2)").change(function(){
                for(var a=0; a < peoRowCount; a++){
                    var peoRawSellRateAuto = $('[name="peoSellRatePS_a'+a+'"]').val();
                    var peoRawQtyAuto = $('[name="peoQtyPS_a'+a+'"]').val();
                    var peoPricingRateAuto = peoRawSellRateAuto * peoRawQtyAuto;
                    $('[name="peoPricingRatePS_a'+a+'"]').val(peoPricingRateAuto.toFixed(2));
                }
            });
        });
   });
   
   $("#tenForResMaterialSaveBtn").click(function(){
        $("#tenForResHeadL4").css("background-color", "#0aaaa4"); $("#tenForResHeadL1").css("background-color", "#535353"); $("#tenForResHeadL2").css("background-color", "#535353"); $("#tenForResHeadL3").css("background-color", "#535353"); $("#tenForResHeadL5").css("background-color", "#535353");
        $("#tenForResPlantBody").hide(); $("#tenForResPeopleBody").hide(); $("#tenForResMaterialBody").hide(); $("#tenForResFuelBody").fadeIn(); $("#tenForResOthersBody").hide();
        $("#tenForResPlantSaveBtn").hide();$("#tenForResPeopleSaveBtn").hide();$("#tenForResMaterialSaveBtn").hide();$("#tenForResFuelSaveBtn").show();
        $("#MatPricingSheetTable tr").each(function(){
            console.log("Selling Rate");
        
	});
    });
   
   $("#tenForResFuelSaveBtn").click(function(){
	$("#tenForResHeadL5").css("background-color", "#0aaaa4");$("#tenForResHeadL1").css("background-color", "#535353");$("#tenForResHeadL2").css("background-color", "#535353");$("#tenForResHeadL3").css("background-color", "#535353");$("#tenForResHeadL4").css("background-color", "#535353");
        $("#tenForResPlantBody").hide();$("#tenForResPeopleBody").hide();$("#tenForResMaterialBody").hide();$("#tenForResFuelBody").hide();
	$("#rawBoq").fadeIn();$("#rawBoqBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"}); $("#rawBoqHeadL1").css("background-color", "#0aaaa4");
	$("#tenForResPlantSaveBtn").hide();$("#tenForResPeopleSaveBtn").hide();$("#tenForResMaterialSaveBtn").hide();$("#tenForResFuelSaveBtn").hide();	
        //$("#proSetupBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#fuelPricingSheetTable tr").each(function(){
        $(this).find("td:eq(2)").change(function(){
                for(var a=0; a < 2; a++){
                    var fPetrolSellRate = $('[name="petrolSellRatePS"]').val();
                    var fPetrolQty = $('[name="petrolQtyPS"]').val();
                    var fPetrolPR = fPetrolSellRate * fPetrolQty;
                    $('[name="petrolPricingRatePS"]').val(fPetrolPR.toFixed(2));
                    var fDieselSellRate = $('[name="dieselSellRatePS"]').val();
                    var fDieselQty = $('[name="dieselQtyPS"]').val();
                    var fDieselPR = fDieselSellRate * fDieselQty;
                    $('[name="dieselPricingRatePS"]').val(fDieselPR.toFixed(2));
                }
            });
	});
   });
   
   $("#tenForResHeadL5").click(function(){
       $("#tenForResHeadL5").css("background-color", "#0aaaa4");$("#tenForResHeadL1").css("background-color", "#535353");$("#tenForResHeadL2").css("background-color", "#535353");
       $("#tenForResHeadL3").css("background-color", "#535353");$("#tenForResHeadL4").css("background-color", "#535353");
       $("#tenForResPlantBody").hide();$("#tenForResPeopleBody").hide();$("#tenForResMaterialBody").hide();$("#tenForResFuelBody").hide();$("#rawBoq").fadeIn();
   });
   
    $("#manualBoqBtn").click(function () {
        $("#selectBoqType").hide();$("#manualRawBoqBodyContainer").fadeIn();
    });
    
    $("#globalDecisionDoneBtn").click(function () {
        $("#globalDecisionSuccessAlertBackground").slideDown();
        $("#newProject").css("opacity", "0");
        $("#globalDecision").css("opacity", "0.1");
    });

    $("#globalDecisionNextBtn").click(function () {
        $("#proSetupPlane").fadeIn();
        $("#globalDecisionBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#rawBoqBtn").css({"background-color": "#fff", "border": "1px solid #0aaaa4"});
        $("#newProBtnText").css("color", "#3f8d8a");
        $("#globalDecision").hide();$("#rawBoq").fadeIn();$("#rawBoqHeadL1").css("background-color", "#0aaaa4");$("#rawBoqBodyLevel2").hide();$("#rawBoqBodyLevel3").hide();
        $("#rawBoqBodySuccessLevel1").hide();$("#rawBoqBodySuccessLevel2").hide();$("#rawBoqBodySuccessLevel3").hide();
    });

    $("#rawBoqLevel1DoneBtn").click(function () {
        $("#rawBoqBodySuccessLevel1").hide();$("#rawBoqBodyLevel1").hide();$("#rawBoqHeadL1").css("background-color", "#535353");$("#rawBoqHeadL2").css("background-color", "#0aaaa4");
        $("#rawBoqBodyLevel2").fadeIn();
    });

    $("#rawBoqLevel2DoneBtn").click(function () {
        $("#rawBoqBodySuccessLevel2").slideDown();$("#rawBoqBodyLevel1").css("opacity", "0");$("#rawBoqBodyLevel2").css("opacity", "0.1");
    });

    $("#rawBoqLevel2DoneBtnActDesc").click(function () {
        $("#rawBoqBodySuccessLevel2").hide();$("#rawBoqBodyLevel1").hide();$("#rawBoqBodyLevel2").hide();$("#pricingSheet").fadeIn();
    });

    $("#pricingSheetRightViewSummaryBtn").click(function () {
        $("#proSetupPlane").show();//$("#pricingSheetSummary").show();
        $("#rawBoq").hide();$("#splash").hide();$("#pricingSheet").hide();$("#tenderForResources").hide();
        //$("#testTableContent").show();
        $("#pldRpt").show();
        
    });
    
    $("#pricingSheetRightFooterCalculateBtn").click(function () {
        $("#newProject").hide();$("#pricingSheetCalculateSuccessAlertBackground").fadeIn();
    });

    $("#pricingSheetOkBtn").click(function () {
        $("#pricingSheetCalculateSuccessAlertBackground").hide();$("#pricingSheet").fadeIn();
    });

    $("#pricingSheetRightFooterViewBtn").click(function () {
        $("#newProject").hide();$("#pricingSheetCalculateSuccessAlertBackground").hide();$("#pTenderSheep").fadeIn();
    });


    $("#sectionIdInput").click(function () {
        var selOption = $('#sectionIdInput option:selected');$("#sectionIdTextF").prop('disabled', true);$('#sectionIdTextF').val(selOption.val());
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
        //var counter = 0;
//        if (jQuery.inArray(selOption.text(), selectedSectionName) !== -1) {
//            $("#" + selOption.val()).append(
//                    "<p class=\"sectionNameUpdateListLi\">" + formDataJson.activityName + "(" + formDataJson.activityId + ")" +  "</p>"
//                    );
//            } else {
//                $("#rawBoqLevel1UpdateListTable").append(
//                        "<div id=\"" + selOption.val() + "\"><p class=\"sectionNameUpdateListHead\"> &nbsp;&nbsp;"
//                        + selOption.text() + "</p>"
//                        + "<p class=\"sectionNameUpdateListLi\">" + formDataJson.activityName + "(" + formDataJson.activityId + ")" + "</p></div>"
//                        );
//                        selectedSectionName.push(selOption.text());
//            $("#activityDesSectionNameInput").append(
//                    "<option value=\"" + formDataJson.sectionId + "\" >" + selOption.text() + "</option>"
//                    );
//        }
        var inputSectionName = $("#sectionIdInput option:selected").text();
        var inputSectionID = $("#sectionIdTextF").val();
        var inputActivityName = $("#proBoqActivityNameInput").val();
        var inputActivityID = $("#proBoqActivityIdInput").val();
        
        var sectionActivityJSON = "{sectionName: " + inputSectionName + ", sectionId: " + inputSectionID + 
                                ", activityName: " + inputActivityName + ", activityId: " + inputActivityID + "}";
        
        console.log(JSON.stringify(sectionActivityJSON));
//        $.ajax({
//                type: "POST",
//                url: url + "/api/v1/activity/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: sectionActivityJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#secActivityMessage').empty();
//                    $('#secActivityMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#secActivityMessage').empty();
//                    $('#secActivityMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });
        
    });
    
    var decsSecNameArray = new Array();
    var decsActNameArray = new Array();
    $("#rawBoqLevel2AddBtnActDesc").click(function () {
        
        var decsSecName = $('#activityDesSectionNameInput option:selected');
        var decsActName = $('#activityDesActivityNameInput option:selected');
        var Desc_Input = $("#activityDesBoqInput_D").val();
		
        if((_.contains(decsSecNameArray, decsSecName.text())) && (_.contains(decsActNameArray, decsActName.text()))){
        console.log("Add Desc Only");
        $("#" + decsActName.val()).append(
                    "<p class=\"sectionNameUpdateListLi\"> &nbsp;&nbsp;" + Desc_Input + "</p>"
                );
        } else if((_.contains(decsSecNameArray, decsSecName.text())) && !(_.contains(decsActNameArray, decsActName.text()))){
            console.log("Add Activity and Desc");
            $("#rawBoqLevel2UpdateListTable").append(
                    "<div id=\"" + decsActName.val() + "\">\n\
                    <p class=\"sectionNameUpdateListHeadSub\"> &nbsp;&nbsp;" + decsActName.text() + "</p>\n\
                    <p class=\"sectionNameUpdateListLi\"> &nbsp;&nbsp;" + Desc_Input + "</p>\n\
                    </div>"
                );
            } else{
                    console.log("Add All 3 Tiers");
                    $("#rawBoqLevel2UpdateListTable").append(
                        "<div id=\"" + decsSecName.val() + "\">\n\
                        <p class=\"sectionNameUpdateListHead\"> &nbsp;&nbsp;" + decsSecName.text() + "</p>\n\
                        </div>\n\
                        <div id=\"" + decsActName.val() + "\">\n\
                        <p class=\"sectionNameUpdateListHeadSub\"> &nbsp;&nbsp;" + decsActName.text() + "</p>\n\
                        <p class=\"sectionNameUpdateListLi\"> &nbsp;&nbsp;" + Desc_Input + "</p>\n\
                        </div>"
                    );
            }
            decsSecNameArray.push(decsSecName.text());
            decsActNameArray.push(decsActName.text());
        
    });

    
    
    
//    Tender For Resource
    var DRvsWRName = 0;
    var plCount = 0;
    $("#tenForResPlantAddRowBtn").click(function(){
        $("#tenderForPlantsTable").append(
            "<tr><td><input name=\"plName" + plCount + "\" id=\"tenForResPlantNameInput\"" +  "/>" + "</td><td><input id=\"tenForResPlantRateTypeInput\" type=\"radio\" name=\"PlantFuel" + DRvsWRName + "\"" + " value=\"DryRate\"/>" + "<p id=\"tenForResDryRateText\">DR" + "</p> <input id=\"tenForResPlantRateTypeInput\" type=\"radio\" name=\"PlantFuel" + DRvsWRName + "\"" + " value=\"WetRate\"/>" + "<p id=\"tenForResWetRateText\">WR" 
            + "</p></td><td><input name=\"plRR" + plCount + "\" id=\"tenForResPlantRawRateInput\"  type=\"number\" /></td><td><input name=\"plTrans" + plCount + "\" id=\"tenForResPlantTransCostInput\" type=\"number\"/></td><td><select name=\"plUnit" + plCount + "\" id=\"tenForResPlantUnitOfMInput\"><option value=\"none\">Select</option><option value=\"month\">Month</option><option value=\"day\">Day</option><option value=\"Hour\">Hr</option><option value=\"Bags\">Bags</option></select></td>\n\
            <td><input name=\"plIncrea" + plCount + "\" id=\"tenForResPlantIncreasInput\" type=\"number\"/></td><td align=\"right\" ><input name=\"plSellRate" + plCount + "\" id=\"tenForResPlantTotalCostInput\" disabled/></td></tr>"    
            );
            $("#tenForResPlantAddRowBtn").prop('disabled', true);
            $("#tenForResPlantAddRowBtn").css("opacity", "0.5");
            DRvsWRName++;plCount++;
            $("#tenderForPlantsTable tr").each(function(){
                $(this).find("td:eq(5)").change(function(){
                    for(var i=0; i < plCount; i++){
                        inputPlName = $('[name="plName'+ i +'"]').val();
                        rateType = $('input[name=PlantFuel'+ i +']:checked').val();
                        inputPlRawRate = $('[name="plRR'+ i +'"]').val();
                        inputPlTransC = $('[name="plTrans'+ i +'"]').val();
                        plUnitName = $('select[name=plUnit'+ i +']').val();  //
                        plUnitAbb = $('select[name=plUnit'+ i +'] option:selected').text(); //
                        plRawIncrease = $('[name="plIncrea'+ i +'"]').val();
                        plRawCost = inputPlRawRate * woHrsPWeek * 4.3;
                        plRainRawRate = inputPlRawRate * 0.25;
                        plTransCPMonth = inputPlTransC / collectedMonths;
                        plCostPMonth = plRawCost + plRainRawRate + plTransCPMonth;
                        plIncrease = plCostPMonth*(plRawIncrease/100); 
                        plCostPMonthWInc = plCostPMonth + plIncrease;
			//console.log(plCostPMonthWInc);
                        plSellingRate = plCostPMonthWInc / prAverageWorkingDaysPerMonth;
                        $('[name="plSellRate'+ i +'"]').val(plSellingRate.toFixed(2));
                        var plSellRateForPS = $('[name="plSellRate'+ i +'"]').val();
                        
                    }
                    $("#tenForResPlantAddRowBtn").prop('disabled', false);
                    $("#tenForResPlantAddRowBtn").css("opacity", "1");
//                    $("#plaPricingSheetTable").append(
//                    "<tr><td><input name=\"plNamePS_a" + i + "\" id=\"pricingSheetListPlantResourceInput\" type=\"text\" value=\"" + inputPlName + "\" disabled/></td>" +
//                    "<td><input name=\"plSellRatePS_a" + i +"\" id=\"pricingSheetListPlantSellRateInput\" type=\"number\" value=\"" + plSellRateForPS + "\" disabled/></td>" +
//                    "<td><input name=\"plQtyPS_a" + i + "\" id=\"pricingSheetListPlantQuantityInput\" type=\"number\"/></td>" +
//                    "<td><input name=\"plPricingRatePS_a" + i + "\" id=\"pricingSheetListPlantRateInput\" class=\"plAllwClass\" type=\"number\" disabled/></td></tr>"
//                    );
            
        var finRateType;
        if(rateType === "DryRate"){
            finRateType = 1;
            //console.log("Dry : " + finRateType);
        } else if(rateType === "WetRate"){
            finRateType = 2;
           // console.log("Wet : " + finRateType);
        }
        //console.log("Rate Type : " + finRateType);
        var plantJSON = "{plantName: " + inputPlName + ", plantFuel: " + finRateType + ", rawRate: " + inputPlRawRate + ", transportCost: " + inputPlTransC + 
                            ", sellingRate: " + plSellingRate + ", increase: " + plRawIncrease + 
                            ", UnitOfMeasure: {unitName: " + plUnitName + ", unitAbbreviation: " + plUnitAbb + "}}";
        //console.log(JSON.stringify(plantJSON));
//        $.ajax({
//                type: "POST",
//                url: url + "/api/v1/plant/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: plantJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addPlantMessage').empty();
//                    $('#addPlantMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addPlantMessage').empty();
//                    $('#addPlantMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });
            
            });
        
                
        
        });
            
            
    //var 
            
            
    });
    var peoCount=0;
    $("#tenForResPeopleAddRowBtn").click(function(){
        $("#tenderForPeopleTable").append(
                "<tr><td><input name=\"peoName" + peoCount + "\" id=\"tenForResPeopleNameInput\" type=\"text\"/></td><td><input name=\"peoSalary" + peoCount + "\" id=\"tenForResPeopleSalaryInput\" type=\"number\"/></td><td><input name=\"peoIncease" + peoCount + "\" id=\"tenForResPeopleIncreaInput\" type=\"number\" disabled/></td>\n\
                <td><input name=\"peoLevies" + peoCount + "\" id=\"tenForResPeopleLeviesInput\" type=\"number\" disabled/></td><td><input name=\"peoLeave" + peoCount + "\" id=\"tenForResPeopleLeaveInput\" type=\"number\" disabled/></td><td><input name=\"peoPension" + peoCount + "\" id=\"tenForResPeoplePensionInput\" type=\"number\" disabled/></td>\n\
                \n\
                <td><input name=\"peoMedical" + peoCount + "\" id=\"tenForResPeopleMedicalInput\" type=\"number\"/></td><td><input name=\"peoBonus" + peoCount + "\" id=\"tenForResPeopleBonusInput\" type=\"number\"/></td><td><input name=\"peoAnnualC" + peoCount + "\" id=\"tenForResPeopleAnualCInput\" type=\"number\" disabled/></td>\n\
                <td><input name=\"peoDailyC" + peoCount + "\" id=\"tenForResPeopleDailyCInput\" type=\"number\" disabled/></td></tr>"
            );
    $("#tenForResPeopleAddRowBtn").prop('disabled', true);
    $("#tenForResPeopleAddRowBtn").css("opacity", "0.5");
        peoCount++;
        $("#tenderForPeopleTable tr").each(function(){
            $(this).find("td:eq(7)").change(function(){
                        for(var i=0; i < peoCount; i++){
                        inputPeoName = $('[name="peoName'+ i +'"]').val(); //continue from here, i was adding the increment name, next is declaring sell rate like this one
                        inputPeoIncrease  = $("#tenForResPeopleTopTableIncreaseInput").val();
                        inputPeoLevies  = $("#tenForResPeopleTopTableLeviesInput").val();
                        inputPeoLeave  = $("#tenForResPeopleTopTableLeaveInput").val();
                        inputPeoPension  = $("#tenForResPeopleTopTablePensionInput").val(); 
                        inputPeoRawRate = $('[name="peoSalary'+ i +'"]').val();
                        peoMed = $('[name="peoMedical'+ i +'"]').val();
                        peoBonus = $('[name="peoBonus'+ i +'"]').val();
                        peoIncrease = (parseInt(((inputPeoIncrease/100)*parseInt(inputPeoRawRate))));
                        peoLevies = (parseInt(inputPeoRawRate)+parseInt(peoIncrease))*(inputPeoLevies/100); 
                        peoLeave = ((parseInt(inputPeoRawRate) + parseInt(peoIncrease) + parseInt(peoLevies)) / parseInt(209)) * parseInt(inputPeoLeave);
                        peoPension = (parseInt(inputPeoRawRate) + parseInt(peoIncrease) + parseInt(peoLevies) + parseInt(peoLeave)) * (parseInt(inputPeoPension)/100);
                        peoAnnualfC = parseInt(inputPeoRawRate) + parseInt(peoIncrease) +parseInt(peoLevies) + parseInt(peoLeave) + parseInt(peoPension) + parseInt(peoMed) + parseInt(peoBonus);
                        peoDailyC = peoAnnualfC/209;
                        $('[name="peoIncease'+ i +'"]').val(peoIncrease.toFixed(2));
                        $('[name="peoLevies'+ i +'"]').val(peoLevies.toFixed(2));
                        $('[name="peoLeave'+ i +'"]').val(peoLeave.toFixed(2));
                        $('[name="peoPension'+ i +'"]').val(peoPension.toFixed(2));
                        $('[name="peoAnnualC'+ i +'"]').val(peoAnnualfC.toFixed(2));
                        $('[name="peoDailyC'+ i +'"]').val(peoDailyC.toFixed(2));
                        peoSellRateForPS = $('[name="peoDailyC'+ i +'"]').val();
                        $("#tenForResPeopleAddRowBtn").prop('disabled', false);
                        $("#tenForResPeopleAddRowBtn").css("opacity", "1");
                        }
                        
                
                var peoJSON = "{personName: " + inputPeoName + ", salary: " + inputPeoRawRate + ", increase: " + peoIncrease + ", levies: " + peoLevies + 
                            ", leave: " + peoLeave + ", pension: " + peoPension + ", medical: " + peoMed + ", bonus: " + peoBonus + 
                            ", totalCost: " + peoDailyC + "}";
                    //console.log(JSON.stringify(peoJSON));
//            $.ajax({
//                type: "POST",
//                url: url + "/api/v1/people/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: peoJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addPeopleMessage').empty();
//                    $('#addPeopleMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addPeopleMessage').empty();
//                    $('#addPeopleMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });                    
                    
            });
        });
    });
    
    var matCount=0;
    $("#tenForResMaterialAddRowBtn").click(function(){
        $("#tenderForMaterialTable").append(
                "<tr><td><input name=\"matName" + matCount + "\" id=\"tenForResMaterialNameInput\" type=\"text\"/></td><td><input name=\"matRawRate" + matCount + "\" id=\"tenForResMaterialRawRateInput\" type=\"number\"</td><td><input name=\"matWasteF" + matCount + "\"id=\"tenForResMaterialWastageInput\" type=\"number\"</td>" + 
                "<td><select name=\"matUnit" + matCount + "\" id=\"tenForResMaterialUnitOfMInput\">" +
                "<option value=\"none\">Select</option><option value=\"Cubic_Meters\">m<sup>3</sup></option><option value=\"Square_Meters\">m<sup>2</sup></option><option value=\"Meters\">m</option><option value=\"Bags\">Bags</option><option value=\"Number\">No.</option></select>" +
                "<td><input name=\"matIncrea" + matCount + "\" id=\"tenForResMaterialIncreasInput\" type=\"number\"</td><td><input name=\"matSellingRate" + matCount + "\" id=\"tenForResMaterialSellingRateInput\" type=\"text\" disabled/></td></tr>"
            );
            $("#tenForResMaterialAddRowBtn").prop('disabled', true);
            $("#tenForResMaterialAddRowBtn").css("opacity", "0.5");
        $("#tenderForMaterialTable tr").each(function(){
            $(this).find("td:eq(4)").change(function(){
                        for(var i=0; i < matCount; i++){
                        inputMatName = $('[name="matName'+ i +'"]').val();
                        inputMatRawRate = $('[name="matRawRate'+ i +'"]').val();
                        inputMatWastage = $('[name="matWasteF'+ i +'"]').val();
                        inputMatIncrea = $('[name="matIncrea'+ i +'"]').val();
                        matUnitName = $('select[name=matUnit'+ i +']').val();  //
                        matUnitAbb = $('select[name=matUnit'+ i +'] option:selected').text(); //
                        matSellingRate = (parseInt(inputMatRawRate) * (inputMatWastage/100)) + parseInt(inputMatRawRate) + (((parseInt(inputMatRawRate) * (inputMatWastage/100)) + parseInt(inputMatRawRate)) * (inputMatIncrea/100));
                        $('[name="matSellingRate'+ i +'"]').val(matSellingRate.toFixed(2));
                        sellRateToPricingSheet = $('[name="matSellingRate'+ i +'"]').val();
                        }
                        $("#tenForResMaterialAddRowBtn").prop('disabled', false);
                        $("#tenForResMaterialAddRowBtn").css("opacity", "1");

                var matJSON = "{materialName: " + inputMatName + ", rawRate: " + inputMatRawRate + ", sellingRate: " + matSellingRate + ", wastageFactor: " + inputMatWastage + 
                            ", increase: " + inputMatIncrea + ", UnitOfMeasure:{unitName: "+ matUnitName+ ", unitAbbreviation: " + matUnitAbb + "}}";
                    //console.log(JSON.stringify(matJSON));
//                $.ajax({
//                type: "POST",
//                url: url + "/api/v1/material/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: matJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addMaterialMessage').empty();
//                    $('#addMaterialMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addMaterialMessage').empty();
//                    $('#addMaterialMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });    
                    
            });
        });
		matCount++;
    });
    
        var g = 0;var h= 0;
    $("#priSheetMatAddRowBtn").click(function(){
        
     $("#MatPricingSheetTable").append(
                        "<tr><td><select id=\"selMatName" + g +"\"  class=\"pricingSheetListMaterialResourceInput\"></select></td><td><input name=\"matSellingRateI" + g + "\" id=\"pricingSheetListMaterialSellRateInput\" type=\"number\" disabled/></td><td><input name=\"matQty" + g +"\" id=\"pricingSheetListMaterialQuantityInput\" type=\"number\"/></td><td><input name=\"matPriceRate" + g + "\" id=\"pricingSheetListMaterialRateInput\" class=\"matAllwClass\" type=\"number\" disabled/></td></tr>"
                        ); 

                //$("#selMatName" + g).append("<option value=\"none\">Hi" + g + "</option>");
                $.ajax({
                    
                type: "GET",
                //dataType: "json",
                url: url + "/api/v1/material/get?key=ps_backendv1.0_api_key",
                //data: "key=freeli_v1.0_ndivhuwo_dev",
                timeout: 2000, // timeout milliseconds
                success: function (data, status, xhr) {   // success callback function
                        //$('#message').append(JSON.stringify(data.list));
                    //materialListJSON = data;
                    
                    $("#selMatName"+h).empty(); // remove old options
                    $("#selMatName"+h).append($("<option>", {
                        value: '',
                        text : 'Please Select' 
                        }));

                    $.each(data.list, function (key, value) {
                        //$('#message').append(value.fullName);
                        $("#selMatName"+h).append($("<option>", {
                                value: value.sellingRate,
                                text : value.materialName 
                        })); 
                        //console.log("Value: " + value.sellingRate);
                        //console.log("Text: " + value.materialName);
                        
                    });h++;
                }, 
                error: function (jqXhr, textStatus, errorMessage) { // error callback 
                    $('#secActivityMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
                } 
            }); 
            g++;
        
        $("#MatPricingSheetTable tr").each(function(){
            $(this).find("td:eq(0)").change(function(){
                for(var i=0; i < 100; i++){
                //var selSellRate = $("#selMatName"+i).val();
                var selSellRate = parseFloat($("#selMatName"+i).val());
                //var selSellRate2 = parseInt(selSellRate);
                $('[name="matSellingRateI'+ i +'"]').val(selSellRate.toFixed(2));
                //console.log("Original : "  + selSellRate);
                
            }
            });
            
            $(this).find("td:eq(2)").change(function(){
                for(var a=0; a < 100; a++){
                    var matRawSellRateAuto = $('[name="matSellingRateI' + a + '"]').val();
                    var matRawQtyAuto = $('[name="matQty' + a + '"]').val();
                    var matPricingRateAuto = matRawQtyAuto * matRawSellRateAuto;
                    $('[name="matPriceRate'+a+'"]').val(matPricingRateAuto.toFixed(2));
                    //$('[name="matPriceRate'+a+'"]').val("Hi");
                    console.log("Selling Rate : " + matRawSellRateAuto);
                }
            });
        });
        
    });
    
    
    var plRC=0;var plSC=0;
    $("#priSheetPlantAddRowBtn").click(function(){
        $("#plaPricingSheetTable").append(
            "<tr><td><select id=\"plNamePS_a" + plRC + "\" class=\"pricingSheetListPlantResourceInput\"></select></td>" +
            "<td><input name=\"plSellRatePS_a" + plRC +"\" id=\"pricingSheetListPlantSellRateInput\" type=\"number\" disabled/></td>" +
            "<td><input name=\"plQtyPS_a" + plRC + "\" id=\"pricingSheetListPlantQuantityInput\" type=\"number\"/></td>" +
            "<td><input name=\"plPricingRatePS_a" + plRC + "\" id=\"pricingSheetListPlantRateInput\" class=\"plAllwClass\" type=\"number\" disabled/></td></tr>"
        );

        $.ajax({
            type: "GET",
            //dataType: "json",
            url: url + "/api/v1/plant/get?key=ps_backendv1.0_api_key",
            //data: "key=freeli_v1.0_ndivhuwo_dev",
            timeout: 2000, // timeout milliseconds
            success: function (data, status, xhr) {   // success callback function
                    //$('#message').append(JSON.stringify(data.list));
                //materialListJSON = data;

                $("#plNamePS_a"+plSC).empty(); // remove old options
                $("#plNamePS_a"+plSC).append($("<option>", {
                    value: '',
                    text : 'Please Select' 
                    }));

                $.each(data.list, function (key, value) {
                    //$('#message').append(value.fullName);
                    $("#plNamePS_a"+plSC).append($("<option>", {
                            value: value.sellingRate,
                            text : value.plantName 
                    })); 
                    //console.log("Value: " + value.sellingRate);
                    //console.log("Text: " + value.materialName);

                });plSC++;
            }, 
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                $('#secActivityMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
            } 
        }); 
        plRC++;
        
        $("#plaPricingSheetTable tr").each(function(){
            $(this).find("td:eq(0)").change(function(){
                for(var i=0; i < 100; i++){
                //var selSellRate = $("#selMatName"+i).val();
                var selSellRate = parseFloat($("#plNamePS_a"+i).val());
                //var selSellRate2 = parseInt(selSellRate);
                $('[name="plSellRatePS_a'+ i +'"]').val(selSellRate.toFixed(2));
                //console.log("Original : "  + selSellRate);
                
            }
            });
            
            $(this).find("td:eq(2)").change(function(){
                for(var a=0; a < 100; a++){
                    var matRawSellRateAuto = $('[name="plSellRatePS_a' + a + '"]').val();
                    var matRawQtyAuto = $('[name="plQtyPS_a' + a + '"]').val();
                    var matPricingRateAuto = matRawQtyAuto * matRawSellRateAuto;
                    $('[name="plPricingRatePS_a'+a+'"]').val(matPricingRateAuto.toFixed(2));
                    //$('[name="matPriceRate'+a+'"]').val("Hi");
                    //console.log("Selling Rate : " + matRawSellRateAuto);
                }
            });
        });
    });
    
    
    var peoRC=0;var peoSC=0;
    $("#priSheetPeopleAddRowBtn").click(function(){
        $("#peoPricingSheetTable").append(
            "<tr><td><select id=\"peoNamePS_a" +peoRC+ "\" class=\"pricingSheetListPeopleResource\"></select></td>" +
            "<td><input name=\"peoSellRatePS_a" +peoRC+ "\" id=\"pricingSheetListPeopleSellRateResource\" type=\"number\" disabled/></td>" +
            "<td><input name=\"peoQtyPS_a" +peoRC+ "\" id=\"pricingSheetListPeopleQuantity\" type=\"number\"/></td>" +
            "<td><input name=\"peoPricingRatePS_a" +peoRC+ "\" id=\"pricingSheetListPeopleRate\" class=\"peoAllwClass\" type=\"number\" disabled/></td></tr>"
        );

       $.ajax({
            type: "GET",
            //dataType: "json",
            url: url + "/api/v1/people/get?key=ps_backendv1.0_api_key",
            //data: "key=freeli_v1.0_ndivhuwo_dev",
            timeout: 2000, // timeout milliseconds
            success: function (data, status, xhr) {   // success callback function
                    //$('#message').append(JSON.stringify(data.list));
                //materialListJSON = data;

                $("#peoNamePS_a"+peoSC).empty(); // remove old options
                $("#peoNamePS_a"+peoSC).append($("<option>", {
                    value: '',
                    text : 'Please Select' 
                    }));

                $.each(data.list, function (key, value) {
                    //$('#message').append(value.fullName);
                    $("#peoNamePS_a"+peoSC).append($("<option>", {
                            value: value.totalCost,
                            text : value.personName 
                    })); 
                    //console.log("Value: " + value.sellingRate);
                    //console.log("Text: " + value.materialName);

                });peoSC++;
            }, 
            error: function (jqXhr, textStatus, errorMessage) { // error callback 
                $('#secActivityMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
            } 
        }); 
        peoRC++;
        
       $("#peoPricingSheetTable tr").each(function(){
            $(this).find("td:eq(0)").change(function(){
                for(var i=0; i < 100; i++){
                //var selSellRate = $("#selMatName"+i).val();
                var selSellRate = parseFloat($("#peoNamePS_a"+i).val());
                //var selSellRate2 = parseInt(selSellRate);
                $('[name="peoSellRatePS_a'+ i +'"]').val(selSellRate.toFixed(2));
                //console.log("Original : "  + selSellRate);
                
            }
            });
            
            $(this).find("td:eq(2)").change(function(){
                for(var a=0; a < 100; a++){
                    var matRawSellRateAuto = $('[name="peoSellRatePS_a' + a + '"]').val();
                    var matRawQtyAuto = $('[name="peoQtyPS_a' + a + '"]').val();
                    var matPricingRateAuto = matRawQtyAuto * matRawSellRateAuto;
                    $('[name="peoPricingRatePS_a'+a+'"]').val(matPricingRateAuto.toFixed(2));
                    //$('[name="matPriceRate'+a+'"]').val("Hi");
                    //console.log("Selling Rate : " + matRawSellRateAuto);
                }
            });
        }); 
    });
    
    
    
    //calculations
    $("#tenForResPlantIncreasInput").change(function(){
        inputPlName = $("#tenForResPlantNameInput").val();
        rateType = $('input[name=one]:checked').val();
        inputPlRawRate = $("#tenForResPlantRawRateInput").val();
        inputPlTransC = $("#tenForResPlantTransCostInput").val();
        plUnitName = $("#tenForResPlantUnitOfMInput option:selected").val();
        plUnitAbb = $("#tenForResPlantUnitOfMInput option:selected").text();
        plRawIncrease = $("#tenForResPlantIncreasInput").val();
        plRawCost = inputPlRawRate * woHrsPWeek * 4.3;
        plRainRawRate = inputPlRawRate * 0.25;
        plTransCPMonth = inputPlTransC / collectedMonths;
        plCostPMonth = plRawCost + plRainRawRate + plTransCPMonth;
        plIncrease = plCostPMonth*(plRawIncrease/100); 
        plCostPMonthWInc = plCostPMonth + plIncrease;
        plSellingRate = plCostPMonthWInc / prAverageWorkingDaysPerMonth;
        $("#tenForResPlantTotalCostInput").val(plSellingRate.toFixed(2));

        
        
        var finRateType;
        if(rateType === "DryRate"){
            finRateType = 1;
            //console.log("Dry : " + finRateType);
        } else if(rateType === "WetRate"){
            finRateType = 2;
            //console.log("Wet : " + finRateType);
        }
        //console.log("Rate Type : " + finRateType);
        var plantJSON = "{plantName: " + inputPlName + ", plantFuel: " + finRateType + ", rawRate: " + inputPlRawRate + ", transportCost: " + inputPlTransC + 
                            ", sellingRate: " + plSellingRate + ", increase: " + plRawIncrease + 
                            ", UnitOfMeasure: {unitName: " + plUnitName + ", unitAbbreviation: " + plUnitAbb + "}}";
        //console.log(JSON.stringify(plantJSON));
//        $.ajax({
//                type: "POST",
//                url: url + "/api/v1/plant/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: plantJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addPlantMessage').empty();
//                    $('#addPlantMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addPlantMessage').empty();
//                    $('#addPlantMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });             
    });
    
    $("#tenForResPeopleBonusInput").change(function(){
       inputPeoName = $("#tenForResPeopleNameInput").val();
       inputPeoIncrease  = $("#tenForResPeopleTopTableIncreaseInput").val();
       inputPeoLevies  = $("#tenForResPeopleTopTableLeviesInput").val();
       inputPeoLeave  = $("#tenForResPeopleTopTableLeaveInput").val();
       inputPeoPension  = $("#tenForResPeopleTopTablePensionInput").val(); 
       inputPeoRawRate = $("#tenForResPeopleSalaryInput").val();
       peoMed = $("#tenForResPeopleMedicalInput").val();
       peoBonus = $("#tenForResPeopleBonusInput").val();
       peoIncrease = (parseInt(((inputPeoIncrease/100)*parseInt(inputPeoRawRate))));
       peoLevies = (parseInt(inputPeoRawRate)+parseInt(peoIncrease))*(inputPeoLevies/100); 
       peoLeave = ((parseInt(inputPeoRawRate) + parseInt(peoIncrease) + parseInt(peoLevies)) / parseInt(209)) * parseInt(inputPeoLeave);
       peoPension = (parseInt(inputPeoRawRate) + parseInt(peoIncrease) + parseInt(peoLevies) + parseInt(peoLeave)) * (parseInt(inputPeoPension)/100);
       peoAnnualC = parseInt(inputPeoRawRate) + parseInt(peoIncrease) +parseInt(peoLevies) + parseInt(peoLeave) + parseInt(peoPension) + parseInt(peoMed) + parseInt(peoBonus);
       peoDailyC = peoAnnualC/209;
       $("#tenForResPeopleIncreaInput").val(peoIncrease.toFixed(2));
       $("#tenForResPeopleLeviesInput").val(peoLevies.toFixed(2));
       $("#tenForResPeopleLeaveInput").val(peoLeave.toFixed(2));
       $("#tenForResPeoplePensionInput").val(peoPension.toFixed(2));
       $("#tenForResPeopleAnualCInput").val(peoAnnualC.toFixed(2));
       $("#tenForResPeopleDailyCInput").val(peoDailyC.toFixed(2));
       $("#peoPricingSheetTable").append(
        "<tr><td><input name=\"peoNamePS\" id=\"pricingSheetListPeopleResource\" type=\"text\" value=\"" + inputPeoName+ "\" disabled/></td>" +
        "<td><input name=\"peoSellRatePS\" id=\"pricingSheetListPeopleSellRateResource\" type=\"number\" value=\"" + peoDailyC.toFixed(2) + "\" disabled/></td>" +
        "<td><input name=\"peoQtyPS\" id=\"pricingSheetListPeopleQuantity\" type=\"number\"/></td>" +
        "<td><input name=\"peoPricingRatePS\" id=\"pricingSheetListPeopleRate\" class=\"peoAllwClass\" type=\"number\" disabled/></td></tr>"
        );
        
        var peoJSON = "{personName: " + inputPeoName + ", salary: " + inputPeoRawRate + ", increase: " + peoIncrease + ", levies: " + peoLevies + 
                            ", leave: " + peoLeave + ", pension: " + peoPension + ", medical: " + peoMed + ", bonus: " + peoBonus + 
                            ", totalCost: " + peoDailyC + "}";
        
        //console.log(JSON.stringify(peoJSON));
//            $.ajax({
//                type: "POST",
//                url: url + "/api/v1/people/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: peoJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addPeopleMessage').empty();
//                    $('#addPeopleMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addPeopleMessage').empty();
//                    $('#addPeopleMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });
        
    });
    $("#tenForResMaterialIncreasInput").change(function(){		
	inputMatName = 	$("#tenForResMaterialNameInput").val();
        inputMatRawRate = $("#tenForResMaterialRawRateInput").val();
        matUnitName = $("#tenForResMaterialUnitOfMInput option:selected").val();
        matUnitAbb = $("#tenForResMaterialUnitOfMInput option:selected").text();
        inputMatWastage = $("#tenForResMaterialWastageInput").val();
        inputMatIncrea = $("#tenForResMaterialIncreasInput").val();
        matSellingRate = (parseInt(inputMatRawRate) * (inputMatWastage/100)) + parseInt(inputMatRawRate) + (((parseInt(inputMatRawRate) * (inputMatWastage/100)) + parseInt(inputMatRawRate)) * (inputMatIncrea/100));
        $("#tenForResMaterialSellingRateInput").val(matSellingRate.toFixed(2));

        var matJSON = "{materialName: " + inputMatName + ", rawRate: " + inputMatRawRate + ", sellingRate: " + matSellingRate + ", wastageFactor: " + inputMatWastage + 
                            ", increase: " + inputMatIncrea + ", UnitOfMeasure:{unitName: "+ matUnitName+ ", unitAbbreviation: " + matUnitAbb + "}}";
        //console.log(JSON.stringify(matJSON));            
//            $.ajax({
//                type: "POST",
//                url: url + "/api/v1/material/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: matJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addMaterialMessage').empty();
//                    $('#addMaterialMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addMaterialMessage').empty();
//                    $('#addMaterialMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });

    });
        
    
    
    
    $('[name="petIncreaseF"]').change(function(){
            inputFuelNameP = $('[name="petNamePeF"]').val();
            inputFuelRawRate = $('[name="petRawRateF"]').val();
            inputFuelWastage = $('[name="petWasteFF"]').val();
            inputFuelIncrea = $('[name="petIncreaseF"]').val();
            
            fuelPetrolSellingRate = (parseInt(inputFuelRawRate) * (inputFuelWastage/100)) + parseInt(inputFuelRawRate) + (((parseInt(inputFuelRawRate) * (inputFuelWastage/100)) + parseInt(inputFuelRawRate)) * (inputFuelIncrea/100));
            $('[name="petSellingRateF"]').val(fuelPetrolSellingRate.toFixed(2));
            $("#fuelPricingSheetTable").append(
		"<tr><td><input name=\"petrolNamePS\" id=\"pricingSheetListFuelResourceInput\" type=\"text\" value=\"" + inputFuelNameP + "\"disabled/></td><td><input name=\"petrolSellRatePS\" id=\"pricingSheetListFuelSellRateInput\" type=\"number\" value=\"" + fuelPetrolSellingRate.toFixed(2) + "\"disabled/></td><td><input name=\"petrolQtyPS\" id=\"pricingSheetListFuelQuantityInput\" type=\"number\"/></td><td><input name=\"petrolPricingRatePS\" id=\"pricingSheetListFuelRateInput\" class=\"fuelAllwClass\" type=\"number\" disabled/></td></tr>"
		);
        var petrolJSON = "{fuelName: " + inputFuelNameP + ", rawRate: " + inputFuelRawRate + ", sellingRate: " + fuelPetrolSellingRate + ", wastageFactor: " + inputFuelWastage + 
                            ", UnitOfMeasure:{unitName: Litres, unitAbbreviation: l}}";
        //console.log(JSON.stringify(petrolJSON));
//            $.ajax({
//                type: "POST",
//                url: url + "/api/v1/fuel/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: petrolJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addFuelMessage').empty();
//                    $('#addFuelMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addFuelMessage').empty();
//                    $('#addFuelMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });        
        });
        $('[name="dieIncreaseF"]').change(function(){
            inputFuelNameD = $('[name="petNameDiF"]').val();
            inputFuelRawRate = $('[name="dieRawRateF"]').val();
            inputFuelWastage = $('[name="dieWasteFF"]').val();
            inputFuelIncrea = $('[name="dieIncreaseF"]').val();
            fuelDieselSellingRate = (parseInt(inputFuelRawRate) * (inputFuelWastage/100)) + parseInt(inputFuelRawRate) + (((parseInt(inputFuelRawRate) * (inputFuelWastage/100)) + parseInt(inputFuelRawRate)) * (inputFuelIncrea/100));
            $('[name="dieSellingRateF"]').val(fuelDieselSellingRate.toFixed(2));
            $("#fuelPricingSheetTable").append(
		"<tr><td><input name=\"dieselNamePS\" id=\"pricingSheetListFuelResourceInput\" type=\"text\" value=\"" + inputFuelNameD + "\"disabled/></td><td><input name=\"dieselSellRatePS\" id=\"pricingSheetListFuelSellRateInput\" type=\"number\" value=\"" + fuelDieselSellingRate.toFixed(2) + "\"disabled/></td><td><input name=\"dieselQtyPS\" id=\"pricingSheetListFuelQuantityInput\" type=\"number\"/></td><td><input name=\"dieselPricingRatePS\" id=\"pricingSheetListFuelRateInput\" class=\"fuelAllwClass\" type=\"number\" disabled/></td></tr>"
		);
        var dieselJSON = "{fuelName: " + inputFuelNameD + ", rawRate: " + inputFuelRawRate + ", sellingRate: " + fuelDieselSellingRate + ", wastageFactor: " + inputFuelWastage + 
                            ", UnitOfMeasure:{unitName: Litres, unitAbbreviation: l}}";
        //console.log(JSON.stringify(dieselJSON));
//        $.ajax({
//                type: "POST",
//                url: url + "/api/v1/fuel/new?key=ps_backendv1.0_api_key&projectId=14339355076269816",
//                data: dieselJSON,
//                //contentType: "application/json",
//                headers: {
//                    Accept: "application/json; charset=utf-8",
//                    "Content-Type": "application/json; charset=utf-8"
//                },
//                timeout: 2000, // timeout milliseconds
//                success: function (data, status, xhr) {   // success callback function
//                    $('#addFuelMessage').empty();
//                    $('#addFuelMessage').append(JSON.stringify(data) + " Added Succesfully");
//                },
//                error: function (jqXhr, textStatus, errorMessage) { // error callback 
//                    $('#addFuelMessage').empty();
//                    $('#addFuelMessage').append('Error: ' + errorMessage + " " + JSON.stringify(jqXhr) + " " + textStatus);
//                }
//            });
        });
    var plAllowedCol=0; var peoAllowedCol=0; var matAllowedCol=0; var fuelAllowedCol=0;
        
        
        document.getElementById('pldRpList1').onclick = function() {
            var doc = new jsPDF('p', 'pt');
            var res = doc.autoTableHtmlToJson(document.getElementById('pdfPutTable'));
            var height = doc.internal.pageSize.height;
            //doc.text("text", 50, 50);
            doc.autoTable(res.columns, res.data, {
              startY: 50
            });
            //doc.autoTable(res.columns, res.data, {
            //  startY: doc.autoTableEndPosY() + 50
            //});
            //doc.autoTable(res.columns, res.data, {
            //  startY: height,
            //  afterPageContent: function(data) {
            //    doc.setFontSize(20)
            //    doc.text("After page content", 50, height - data.settings.margin.bottom - 20);
            //  }
            //});
            window.open(doc.output('bloburl'));
        };
        
        var prSectNameArray = new Array();
        var prSectActArray = new Array();
        var prSectDecArray = new Array();
        
        var secidC = "8.3"; 
        var actidC = "8.3.1";
        var desidC = "8.3.1.1";
    
    
        $("#pldRpList1").click(function(){
            
            
            
        });
    
    $("#priSheSummaryConfProAchBtnC").click(function(){
        var rawProAchIn = $("#priSheSummaryConfProAchInput").val();
        $(".plAllwClass").each(function() {
            var value = $(this).val();
            if(!isNaN(value) && value.length !== 0) {
                plAllowedCol += parseFloat(value);
            }
        });
        var plAllowedAct = plAllowedCol/rawProAchIn; 
        $("#plantAllwInput").val(plAllowedAct.toFixed(2));
        plAllowedCol = 0;
        $(".peoAllwClass").each(function() {
            var value = $(this).val();
            if(!isNaN(value) && value.length !== 0) {
                peoAllowedCol += parseFloat(value);
            }
        });
        var peoAllowedAct = peoAllowedCol/rawProAchIn; 
        $("#peopleAllwInput").val(peoAllowedAct.toFixed(2));
        peoAllowedCol = 0;
        $(".matAllwClass").each(function() {
            var value = $(this).val();
            if(!isNaN(value) && value.length !== 0) {
                matAllowedCol += parseFloat(value);
            }
        });
        var matAllowedAct = matAllowedCol/rawProAchIn;
        $("#matAllwInput").val(matAllowedAct.toFixed(2));
        matAllowedCol = 0;
        $(".fuelAllwClass").each(function() {
            var value = $(this).val();
            // add only if the value is number
            if(!isNaN(value) && value.length !== 0) {
                fuelAllowedCol += parseFloat(value);
            }
        });
        var fuelAllowedAct = fuelAllowedCol/rawProAchIn;
        $("#fuelAllwInput").val(fuelAllowedAct.toFixed(2));
        fuelAllowedCol = 0;
        
        
        
        var prSecName = $('#priSheSummarySelection_Sec option:selected');
        var prActName = $('#priSheSummarySelection_Act option:selected');
        var prDecName = $('#priSheSummarySelection_Desc option:selected');
        
        if((_.contains(prSectNameArray, prSecName.text())) && (_.contains(prSectActArray, prActName.text()))){
            console.log("Add/Append New Description Only");
            $("#"+ prActName.val()).append(
                "<tr>\n\
                <td><p></p></td>\n\
                <td><p>" + desidC + "</p></td>\n\
                <td><p>" + prDecName.text() + "</p></td>\n\
                <td><p>ml</p></td>\n\
                <td><p>3</p></td>\n\
                <td><p>R550000</p></td>\n\
                <td><p>R5000</p></td>\n\
                </tr>"
                );
        } else if((_.contains(prSectNameArray, prSecName.text())) && !(_.contains(prSectActArray, prActName.text()))){
            
            $("#pdfPutTable").append(
                "<tbody id=\"" + prActName.val() + "\">\
                <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\n\
                <tr>\n\
                <td><p></p></td>\n\
                <td><p>" + actidC + "</p></td>\n\
                <td><p>" + prActName.text() + "</p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                </tr>" + 
                "<tr>\n\
                <td><p></p></td>\n\
                <td><p>" + desidC + "</p></td>\n\
                <td><p>" + prDecName.text() + "</p></td>\n\
                <td><p>ml</p></td>\n\
                <td><p>3</p></td>\n\
                <td><p>R550000</p></td>\n\
                <td><p>R5000</p></td>\n\
                </tr>\n\
                </tbody>"
                );
        console.log("Add/Append New Activity and New Description Only");
        }else {
            $("#pdfPutTable").append(
                "<tbody id=\"" + prSecName.val() + "\">\n\
                <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\n\
                <tr>\n\
                <td><p>" + secidC + "</p></td>\n\
                <td><p></p></td>\n\
                <td><p>" + prSecName.text() + "</p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                </tr>\n\
                </tbody>" + 
                "<tbody id=\"" + prActName.val() + "\"><\n\
                <tr><td>&nbsp;</td><td></td><td></td><td></td><td></td><td></td><td></td></tr>\n\
                <tr>\n\
                <td><p></p></td>\n\
                <td><p>" + actidC + "</p></td>\n\
                <td><p>" + prActName.text() + "</p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                <td><p></p></td>\n\
                </tr>" + 
                "<tr>\n\
                <td><p></p></td>\n\
                <td><p>" + desidC + "</p></td>\n\
                <td><p>" + prDecName.text() + "</p></td>\n\
                <td><p>ml</p></td>\n\
                <td><p>3</p></td>\n\
                <td><p>R550000</p></td>\n\
                <td><p>R5000</p></td>\n\
                </tr>\n\
                </body>"
                );
            console.log("Add All 3 Tiers");
        }
            prSectNameArray.push(prSecName.text());
            prSectActArray.push(prActName.text());
        
        //$("#putSectionHere").append(prSecName.text());
        
        
        
        
        
    });
    
    
 
});

//calculations
//      1. Plant Selling Rate
var inputPlRawRate;
var plRawRate;
var inputPlTransC;
var plUnitName; var plUnitAbb;

var plTransC;
var plRawCost; // raw rate * hoursperweek * number of weeks
var plRainRawRate; // raw rate * 0.25
var plTransCPMonth; //transport cost / number of months
var plCostPMonth; // plRawCost + plRainRawRate + plTransCPMonth
var plIncrease; // add increase % to plCostPMonth
var plSellingRate; // plCostPMonth / prAverageWorkingDaysPerMonth
var plRowCount;

//      2. People Selling Rate
var inputPeoRawRate;
var inputPeoIncrease;
var inputPeoLevies;
var inputPeoLeave;
var inputPeoPension;
var peoIncrease;
var peoLevies;
var peoLeave;
var peoMed;
var peoBonus;
var peoPension;
var peoAnnualC;
var peoAnnualfC;
var peoDailyC;
var inputPeoName;
var peoRowCount;
var peoSellRateForPS;

//      3. Material Selling Rate
var inputMatName;
var inputMatRawRate;
var inputMatWastage;
var inputMatIncrea;
var matRawRate;
var matWastage;
var matIncrea;
var matSellingRate;
var matPricingRate;
var matRowCount;
var sellRateToPricingSheet;
var matUnitName; var matUnitAbb;

//      4 Fuel Selling Rate
var inputFuelNameP;
var inputFuelNameD;
var fuelPetrolSellingRate;
var fuelDieselSellingRate;
var inputFuelRawRate;
var inputFuelWastage;
var inputFuelIncrea;