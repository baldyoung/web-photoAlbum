

$(function(){
	AlbumModule.init();
	
});


var AlbumModule = {
	status : 'add',
	init : function() {
		var id = GlobalMethod.getArgsFromLocationHref('id');
		if (undefined == id) {
			$('#addArea').removeAttr('hidden');
		} else {
			$('#updateArea').removeAttr('hidden');
			AlbumModule.status='update';
			var targetData = AlbumModule.requestData(id);
			AlbumModule.loadData(targetData);
		}
	},
	packageData : function() {
		var data; 
		if ("update" == AlbumModule.status) {
			data = {
				albumName : $('#albumName_u').val(),
				albumInfo : $('#albumInfo_u').val(),
				albumId : GlobalMethod.getArgsFromLocationHref('id')
			};
		} else {
			data = {
				albumName : $('#albumName').val(),
				albumInfo : $('#albumInfo').val()
			};
		}
		return data;
	},
	loadData : function(data) {
		if ("update" == AlbumModule.status) {
			$('#albumName_u').val(data.albumName);
			$('#albumInfo_u').val(data.albumInfo);
		}
	},
	requestData : function(id) {
		var targetData = [];
		if ("design" == GlobalConfig.currentModel) {
			return test_albumInfo;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/album/albumInfo",
			type: 'GET',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: {
				albumId : id
			},
			success: function(data) {
				if (data.code == '0') {
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
	sendData : function() {
		var newAlbumInfo = AlbumModule.packageData();
		if ("design" == GlobalConfig.currentModel) {
			console.log(newAlbumInfo);
			swal('保存成功', '', 'success');
			GlobalMethod.goBack();
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/album/add",
			type: 'POST',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: newAlbumInfo,
			success: function(data) {
				if (data.code == '0') {
					swal('保存成功', '', 'success');
					GlobalMethod.goBack();
				} else {
					swal({
						title: "保存相册数据失败",
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
		
	}
}
