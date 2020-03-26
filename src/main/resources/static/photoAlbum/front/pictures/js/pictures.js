


$(function(){
	OptionModule.init();
	
	
});


var OptionModule = {
	manageBtnStatus : 'see', // see : 浏览, mng : 管理
	pictureListBuffer : [],
	init : function() {
		var status = GlobalMethod.getArgsFromLocationHref('status');
		if (status == 'mng') {
			OptionModule.manageBtnStatus = 'mng';
			OptionModule.updateUnitDisplayStatus();
		}
		var data = OptionModule.requestData();
		OptionModule.loadData(data);
	},
	loadData : function(data) {
		var target = $('#pictureDisplayArea');
		var i, item, html;
		for(i=0; i<data.length; i++) {
			item = data[i];
			if (OptionModule.manageBtnStatus == 'see') {
				html = OptionModule.createSEEPictureUnitHTML(item);
				target.append(html);
			}else if (OptionModule.manageBtnStatus == 'mng') {
				html = OptionModule.createMNGPictureUnitHTML(item);
				target.append(html);
			}
		}
		
	},
	createSEEPictureUnitHTML : function(item) {
		var html = '<a href="../../common/resource/Img/'+item.address+'" title="'+item.title+'" data-gallery="">';
			html += '<img src="../../common/resource/Img/'+item.simpleAddress+'"></a>';
		return html;
	},
	createMNGPictureUnitHTML : function(item) {
		var html = '<a href="../pictureDetails/pictureDetails.html?picture='+item.pictureId+'" title="'+item.title+'" >';
			html += '<img src="../../common/resource/Img/'+item.simpleAddress+'"></a>';
		return html;
	},
	requestData : function() {
		var targetData = [];
		if ("design" == GlobalConfig.currentModel) {
			return test_pictureList;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "getPictureList",
			type: 'POST',
			cache: false,
			//async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: {},
			success: function(data) {
				if (data.result == 'success') {
					targetData = data.data;
				} else {
					swal({
						title: "获取相片数据失败",
						text: data.desc,
						type: "error"
					});
				}
			},
			error: function() {
				swal({
					title: "服务器连接失败",
					text: "请检查网络是否通畅！",
					type: "warning"
				});
			}
		});
		return targetData;
	},
	clickManageBtn : function() { // 改变相片浏览方式
		if (OptionModule.manageBtnStatus == 'see') {
			OptionModule.manageBtnStatus = 'mng';
			
		} else if (OptionModule.manageBtnStatus == 'mng') {
			OptionModule.manageBtnStatus = 'see';
			
		}
		GlobalMethod.replaceURL('?status='+OptionModule.manageBtnStatus);
		return;
		// OptionModule.updateUnitDisplayStatus();
	},
	updateUnitDisplayStatus : function() {
		if (OptionModule.manageBtnStatus == 'see') {
			$('#manageBtn i').removeClass('fa-square');
			$('#manageBtn i').addClass('fa-square-o');
			//$('.lightBoxGallery a').attr('data-gallery', '');
			
			return;
		}
		if (OptionModule.manageBtnStatus == 'mng') {
			$('#manageBtn i').removeClass('fa-square-o');
			$('#manageBtn i').addClass('fa-square');
			//$('.lightBoxGallery a').removeAttr('data-gallery');
			
			return;
		}
	}
}




var test_pictureList = [
{
	pictureId : '10010',
	title : '上海100日游',
	simpleAddress : '1.jpg',
	address : '1.jpg'
}, {
	pictureId : '10010',
	title : '上海100日游',
	simpleAddress : '2.jpeg',
	address : '2.jpeg'
}, {
	pictureId : '10010',
	title : '上海100日游',
	simpleAddress : '3.jpeg',
	address : '3.jpeg'
}, {
	pictureId : '10010',
	title : '上海100日游',
	simpleAddress : '4.jpg',
	address : '4.jpg'
}]
