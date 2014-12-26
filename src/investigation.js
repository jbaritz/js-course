(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here

    $.get('/FBI/API/case',function(data){
      var caseDetail = JSON.parse(data);
      for(var i in caseDetail.evidences){
        switch(caseDetail.evidences[i].evidenceType) {
          case 'witness' :
            var requestData = {
              caseId : caseDetail.id,
              who : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/interview',requestData,function(data){
              console.log('interview',data);
            });
            break;
          case 'items' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/itemLaboratory',requestData,function(data){
              console.log('item',data);
            });
            break;
          case 'injuries' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/medicalAnalysis',requestData,function(data){
              console.log('medical',data);
            });
            break;
          case 'media' :
            var requestData = {
              caseId : caseDetail.id,
              what : caseDetail.evidences[i].evidenceDescription
            };
            $.post('/FBI/API/mediaLaboratory',requestData,function(data){
              console.log('media',data);
            });
            break;
          default :
            break;
        };
      };
    });

    result.textContent = 'he or she still being unknown  :('
  };

})();































