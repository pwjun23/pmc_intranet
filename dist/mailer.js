function RBox() {
  var args = RBox.arguments;
  var boxSelector = args[0];
  var memberList;
  var self = this;
  
  var bHtml = '';
  bHtml += ' <div class="wO">\n';
  bHtml += '  <div class="vC"></div>\n';
  bHtml += '  <div class="vA">\n';
  bHtml += '    <div class="vS">\n';
  bHtml += '    </div>\n';
  bHtml += '    <textarea rows="1" class="vO" name="to" style="width: 200px;"></textarea>\n';
  bHtml += '  </div>\n';
  bHtml += ' </div>\n';
  $(boxSelector).html(bHtml);
  $(boxSelector+" .wO .vA textarea").width(parseInt($(boxSelector+" .wO .vA textarea").css("min-width"),10)>($(boxSelector+" .wO").width()-$(boxSelector+" .wO .vC").width()-20)?$(boxSelector+" .wO").width()-10:($(boxSelector+" .wO").width()-$(boxSelector+" .wO .vC").width()-20));
  
  this.setMemberList = function(memberList) {
    self.memberList = memberList;
  }

  this._getSearchMemberList = function(key) {
    var searchList = [];
    for(var i=0;i<self.memberList.length;i++) {
      if(self.memberList[i].name.indexOf(key)>=0 || self.memberList[i].dept.indexOf(key)>=0 || self.memberList[i].email.indexOf(key)>=0) searchList[searchList.length] = self.memberList[i];
    }
    return searchList;
  }
  
  this._showMemberList = function(key) {
    var $obj = $(boxSelector+" .vA");
    
    if(key.length<=0) {
      $obj.children(".vS").hide();
      $obj.children(".vS").html('');
      return;
    }
    
    var searchList = self._getSearchMemberList(key);
    
    if(searchList.length==0) {
      $obj.children(".vS").hide();
      $obj.children(".vS").html('');
    } else {
       var mlistHtml = '';
       for(var i=0; i<searchList.length;i++) {
         mlistHtml += '<div class="mInfo">\n';
         mlistHtml += '  <div class="name">'+searchList[i].name+'</div>\n';
         mlistHtml += '  <div class="dept">'+searchList[i].dept+'</div>\n';
         mlistHtml += '  <input type="hidden" class="smiid" value="'+searchList[i].id+'"/>\n';
         mlistHtml += '  <input type="hidden" class="sminame" value="'+searchList[i].name+'"/>\n';
         mlistHtml += '  <input type="hidden" class="smidept" value="'+searchList[i].dept+'"/>\n';
         mlistHtml += '  <input type="hidden" class="smiemail" value="'+searchList[i].email+'"/>\n';
         mlistHtml += '</div>\n';
       }

       $obj.children(".vS").html('<div class="container">'+mlistHtml+'</div>');
       $obj.children(".vS").show();
       $obj.children(".vS").children(".container").children(".mInfo").eq(0).addClass("selected");
       
    }
  };

  this._selectMove = function(direction) {
    var $cur = $(boxSelector+" .wO .vA .vS .container").children(".mInfo.selected");
    var $mInfos = $(boxSelector+" .wO .vA .vS .container").children(".mInfo");
    var idx = $mInfos.index($cur);
    if(direction=='up') {
      idx = (idx>=$mInfos.length-1 ? idx : idx+1);
    } else {
      idx = (idx<=0 ? idx : idx-1);
    }
    $mInfos.removeClass("selected");
    $mInfos.eq(idx).addClass("selected");
  };
  
  this._selectChoice = function() {
    var $obj = $(boxSelector+" .wO");
    var addHtml = '';
    var $choiceObj = $obj.children(".vA").children(".vS").children(".container").children(".mInfo.selected");
    if(!$obj.children(".vA").children(".vS").children(".container").children(".mInfo.selected").is(".mInfo")) return;
    addHtml += '<div class="vR">\n';
    addHtml += '  <span class="vN">\n';
    addHtml += '    <div class="vT"><span>'+$choiceObj.children(".sminame").val()+' ('+$choiceObj.children(".smidept").val()+')</span>\n';
    addHtml += '      <input type="hidden" name="authId" value="'+$choiceObj.children(".smiid").val()+'"/>\n';
    addHtml += '      <input type="hidden" name="authName" value="'+$choiceObj.children(".sminame").val()+'"/>\n';
    addHtml += '      <input type="hidden" name="authDept" value="'+$choiceObj.children(".smidept").val()+'"/>\n';
    addHtml += '      <input type="hidden" name="authEmail" value="'+$choiceObj.children(".smiemail").val()+'"/>\n';
    addHtml += '    </div>\n';
    addHtml += '    <div class="vM">\n';
    addHtml += '    </div>\n';
    addHtml += '  </span>\n';
    addHtml += '</div>\n';
    
    $obj.children(".vA").children(".vS").hide();
    $obj.children(".vA").children(".vS").html('');
    $obj.children(".vA").children("textarea").val("");
    
    $obj.children(".vC").append(addHtml);
    console.log($obj.width()+','+$obj.children(".vC").width()+'/'+$obj.children(".vA").children("textarea").css("min-width"));
    $obj.children(".vA").children("textarea").width(parseInt($obj.children(".vA").children("textarea").css("min-width"),10)>($obj.width()-$obj.children(".vC").width()-20)?$obj.width()-10:($obj.width()-$obj.children(".vC").width()-20));
  }
  
  $(boxSelector).on("keyup","textarea.vO",function(e) {
    if(e.keyCode==40) {
      self._selectMove('up');
    } else if(e.keyCode==38) {
      self._selectMove('down');
    } else if(e.keyCode==13) {
      self._selectChoice($(this).parent());
    } else {
      self._showMemberList($(this).val());
    }
  }).on("keydown","textarea.vO",function(e) {
    if(e.keyCode==13) {
      e.preventDefault();
      return false;
    } else if(e.keyCode==8 && $(this).val().length==0) {
	    $(this).parent().parent().children(".vC").children(".vR:last").remove();
	  }
  });
  
  $(boxSelector).on("click",".vC .vM",function() {
    $(this).parent().parent().remove();
  });
  
  $(boxSelector).on("mouseover",".vS .mInfo",function() {
    $(this).siblings().removeClass("selected");
    $(this).addClass("selected");
  }).on("click",".vS .mInfo",function() {
    self._selectChoice($(this).parent().parent().parent());
  });
  
}
