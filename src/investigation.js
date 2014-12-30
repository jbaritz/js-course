(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here

    $.get('/FBI/API/case',function(data){
      var caseDetail = JSON.parse(data);

      // defining auxiliar variables
      var examinationsResults = [];
      var suspectsHash = {};

      // defining auxiliar functions
      var addSuspect = function(suspectsHash,suspect,evidenceData){
        if(suspectsHash[suspect.s_id]){
          suspectsHash[suspect.s_id].count++;
          suspectsHash[suspect.s_id].evidences.push({
            accuracy : evidenceData.accuracy,
            weight : evidenceData.weight
          });
        } else {
          suspectsHash[suspect.s_id] = {
            count : 1,
            name : suspect.name,
            evidences : [{
              accuracy : evidenceData.accuracy,
              weight : evidenceData.weight
            }]
          };

        }
      };

      var requestSuspectsList = function(requestData,evidenceData){
        $.get('/FBI/API/suspectsList',requestData,function(data){
          for(var j in data){
            addSuspect(suspectsHash,data[j],evidenceData);
            console.log('hash',suspectsHash);
          };
        },'json');
      };

      // defining callback function to get suspect list
      var getSuspectLists = function(){
        for(var i in examinationsResults){
          var requestData = {
            caseId : caseDetail.id,
            characteristics : examinationsResults[i].conclusion
          };
          requestSuspectsList(requestData,examinationsResults[i]);
        };
      };

      for(var i in caseDetail.evidences){
        switch(caseDetail.evidences[i].evidenceType) {
          case 'witness' :
            var requestData = {
              caseId : caseDetail.id,
              who : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/interview',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;
          case 'items' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/itemLaboratory',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;
          case 'injuries' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/medicalAnalysis',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;
          case 'media' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/mediaLaboratory',requestData,function(data){
              examinationsResults.push(data);
              if(examinationsResults.length === 7){
                getSuspectLists();
              }
            },'json');
            break;
          default :
            break;
        };
      };
    });

    result.textContent = 'he or she still being unknown  :('
  };

})();































