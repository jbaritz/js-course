(function(){

  var invetigateButton = document.querySelector('button');
  var result = document.querySelector('h3');

  invetigateButton.onclick = function (event){

    // your code goes here

    $.get('/FBI/API/case',function(data){
      var caseDetail = JSON.parse(data);
    });

    result.textContent = 'he or she still being unknown  :('
  };

})();































