$(function() {

	AlbumModule.init();
});

var AlbumModule = {
	init: function() {
		var data = AlbumModule.requestData();
		AlbumModule.loadData(data);
	},
	loadData: function(data) {
		var target = $('#addAlbumBtn');
		var i, item, html;
		for (i = 0; i < data.length; i++) {
			item = data[i];
			html = '<div class="col-sm-3">';
			html += '<div class="album-div" >';
			html += '<p><i onclick="AlbumModule.deleteAlbum(\'' + item.albumId + '\', \''+item.albumName+'\')" class="fa fa-trash-o toRight cursorPointer"></i>';
			html += '<i  onclick="GlobalMethod.redirectURL(\'../addOrUpdateAlbum/addOrUpdateAlbum.html?id=' + item.albumId + '\')" class="fa fa-pencil-square optionItem"></i></p>';
			html += '<h4>' + item.albumName + '</h4>';
			html += '<p>' + item.albumInfo + '</p></div></div>';
			target.before(html);
		}
	},
	requestData: function() {
		var targetData = [];
		if ("design" == GlobalConfig.currentModel) {
			return test_albumList;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "getAlbumList",
			type: 'GET',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: loginData,
			success: function(data) {
				if (data.result == 'success') {
					targetData = data.data;
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
	},
	deleteAlbum: function(albumId, albumName) {

		swal({
				title: "您确定要删除 " + albumName + " 吗?",
				text: "删除后将无法恢复，请谨慎操作！",
				type: "warning",
				showCancelButton: true,
				confirmButtonColor: "#DD6B55",
				confirmButtonText: "确定",
				cancelButtonText: "取消",
				closeOnConfirm: false,
				closeOnCancel: false
			},
			function(isConfirm) {
				if (isConfirm) {
					if ("design" == GlobalConfig.currentModel) {
						swal("删除成功！", "", "success");
						return;
					}
					$.ajax({
						url: GlobalConfig.serverAddress + "deleteAlbum",
						type: 'POST',
						cache: false,
						async: false, //设置同步
						dataType: 'json',
						contentType: "application/x-www-form-urlencoded;charset=utf-8",
						data: {
							id: albumId
						},
						success: function(data) {
							if (data.result == 'success') {
								AlbumModule.init();
								swal("删除成功！", "", "success");
							} else {
								swal({
									title: "相冊（" + albumName + "）删除失败",
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
				} else {
					swal("已取消", "您取消了删除操作！", "error");
				}
			});
	}

}

var test_albumList = [{
	albumId: '1230',
	albumName: '杭州一日游',
	albumInfo: '',
	pictureAmount: 221,
	lastUpdateDateTime: '2020-02-22 12:22:34'
}, {
	albumId: '1230',
	albumName: '2922东京游',
	albumInfo: '我的天，你敢信，我看见谁了！',
	pictureAmount: 168,
	lastUpdateDateTime: '2020-02-22 12:22:34'
}, {
	albumId: '1230',
	albumName: '如果时间可以停留',
	albumInfo: '留下所见',
	pictureAmount: 5657,
	lastUpdateDateTime: '2020-02-22 12:22:34'
}, {
	albumId: '1230',
	albumName: '家人们',
	albumInfo: '我最爱的家人们',
	pictureAmount: 660,
	lastUpdateDateTime: '2020-02-22 12:22:34'
}]