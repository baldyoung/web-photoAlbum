

$(function(){
	AlbumModule.init();
	
	
});

var AlbumModule = {
	init : function() {
		var albumList = AlbumModule.requestData();
		AlbumModule.loadData(albumList);
	},
	seeTheAlbum : function(albumId) {
		GlobalMethod.redirectURL('../pictures/pictures.html?album='+albumId);
	},
	loadData : function(data) {
		var i, item, html, target = $('#albumDisplayArea');
		for(i=0; i<data.length; i++) {
			item = data[i];
			var html = AlbumModule.createAlbumUnitHTML(item);
			target.append(html);
		}
	},
	createAlbumUnitHTML : function(albumInfo) {
		var html = '<li><div style="cursor:pointer; " ondblclick="AlbumModule.seeTheAlbum(\''+albumInfo.albumId+'\')">';
			html += '<small><p>'+albumInfo.createDateTime+' <i class="fa fa-calendar-plus-o"></i> </p></small>';
			html += '<h4 onclick="AlbumModule.seeTheAlbum(\''+albumInfo.albumId+'\')">'+albumInfo.albumName+'</h4>';
			html += '<p>'+albumInfo.albumInfo+'</p>';
			html += '<a ><i class="fa fa-photo"></i> '+albumInfo.pictureAmount+'</a></div></li>';
		return html;
	},
	requestData : function() {
		var targetData = [];
		if ("design" == GlobalConfig.currentModel) {
			return test_albumList;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/album/all",
			type: 'GET',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: null,
			success: function(data) {
				if (data.code == '0') {
					targetData = data.data;
					var i, item, temp;
					for(i=0; i<targetData.length; i++) {
						item = targetData[i];
						temp = item.updateDateTime;
						item.updateDateTime = temp.substring(0, 10);
						temp = item.createDateTime;
						item.createDateTime = temp.substring(0, 10);
					}
				} else {
					swal({
						title: "获取相册数据失败",
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
	}
}



var test_albumList = [
{
	albumId : '1230',
	albumName : '杭州一日游',
	albumInfo : '',
	pictureAmount : 221,
	lastUpdateDateTime : '2020-02-22 12:22:34'
}, {
	albumId : '1230',
	albumName : '2922东京游',
	albumInfo : '我的天，你敢信，我看见谁了！',
	pictureAmount : 168,
	lastUpdateDateTime : '2020-02-22 12:22:34'
},{
	albumId : '1230',
	albumName : '如果时间可以停留',
	albumInfo : '留下所见',
	pictureAmount : 5657,
	lastUpdateDateTime : '2020-02-22 12:22:34'
},{
	albumId : '1230',
	albumName : '家人们',
	albumInfo : '我最爱的家人们',
	pictureAmount : 660,
	lastUpdateDateTime : '2020-02-22 12:22:34'
}]
