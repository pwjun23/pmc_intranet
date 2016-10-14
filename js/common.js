$(document).ready(function(){
/* 좌측메뉴 세팅*/
	var $lnb_Li = $('.nav-sidebar li');
	var $currentPageTitle = $('.main h2:eq(0)').html().replace(/ /g, '');
	$lnb_Li.each(function(index){
		var $this = $(this);
		var $targetName = $this.children('a').html().replace(/ /g,'');
		
		if($currentPageTitle === $targetName){
			$this.addClass('active');
		}
	});




  /* 텍스트 편집기 세팅 summernote */
	$('#headerNoticeText').summernote({
		lang: 'ko-KR', 
		fontNames: ['돋움', '나눔고딕','Dotum','NanumGothic'],
		toolbar: [
		    // [groupName, [list of button]]
		    ['style', ['bold', 'italic', 'underline', 'clear']],		    
		    ['fontname',['fontname']],
		    ['fontsize', ['fontsize']],
		    ['color', ['color']],
		    ['para', ['ul', 'ol', 'paragraph']],
		    ['height', ['height']],
		    ['picture', ['picture']],
		    ['table', ['table']],
		    ['fullscreen', ['fullscreen']],
		    ['codeview', ['codeview']],
		    ['help', ['help']]

		  ],
		height:"200px"
	});

	/* 유효성 검사 jqueryvalidation */
	$("#form-setting").validate({
	 submitHandler: function(form) {	    
	  }
	});

	/* 탭 초기 */
	//$('#tab-setting li:nth-child(3) a').tab('show');
	
	/* 팝오버 세팅 */
	$(function () {
	  $('[data-toggle="popover"]').popover({
	  	delay: { "show": 100, "hide": 100 }
	  })
	})

  /* 상세검색 버튼 숨기기 */

  var $btnDetailSearch=$('.btn-detailSearch');
  var $collapseDetailSearch=$('#collapseDetailSearch');

  $btnDetailSearch.on('click',function(){
    console.log($collapseDetailSearch.css('display') === 'none');
    if($collapseDetailSearch.css('display') === 'none'){
      $(this).hide();
    }else{
      $(this).show();
    }
  })

  /* 폰트 사이즈 비교 */
  $(document).keydown(
    )

});
