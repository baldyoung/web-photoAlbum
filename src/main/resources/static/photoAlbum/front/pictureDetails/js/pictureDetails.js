$(function() {

	Module.init();

});

var Module = {
	temp : 0,
	pictureInfo: undefined,
	init: function() {
		var pictureId = GlobalMethod.getArgsFromLocationHref("picture");
		if (undefined == pictureId) {
			swal({
				title: '获取图片信息失败',
				type: 'error'
			});
			return;
		}
		var data = Module.requestData();
		Module.loadData(data);
	},
	loadData: function(data) {
		Module.pictureInfo = data;
		//data.labelList = data.tagList;
		//var temp = data.imageInfo;
		//data.imageInfo = (undefined != temp) ? temp.substring(0, 10) : "";
		$('#pictureURL').attr('src', GlobalConfig.pictureRelativePath + data.imageFileName);
		$('#updateDateTimeText').val(data.imageInfo);
		var i, item, html;
		if (data.labelList == undefined) data.labelList = [];
		data = data.labelList;
		for (i = 0; i < data.length; i++) {
			item = data[i];
			Module.addLabelDisplayUnit(item);
		}
	},
	addLabelDisplayUnit: function(item) {
		var target = $('#labelDisplayArea');
		var html = '<button id="labelUnit' + item.tagId + '" type="button" class="btn btn-default disabled" style="cursor:default; margin-right:5px;">';
		html += '<i class="fa fa-tag" style="color:#FFB733; "></i>' + item.tagName + '<span style="cursor:pointer;" onclick="Module.deleteLabel(\'' + item.tagId + '\')">&times;</span>';
		html += '</button>';
		target.after(html);
	},
	requestData: function() {
		var targetData = {};
		if ("design" == GlobalConfig.currentModel) {
			return test_pictureInfo;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/image/imageInfo",
			type: 'GET',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: {
				imageId : GlobalMethod.getArgsFromLocationHref("picture")
			},
			success: function(data) {
				if (data.code == '0') {
					targetData = data.data;
					targetData.labelList = targetData.tagList;
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
	addLabel: function() {
		var labelInfo = {
			id : Module.temp ++,
			tagName: $('#labelNameText').val()
		};
		if (GlobalMethod.isEmpty(labelInfo.tagName)) {
			swal({
				title: '标签不能为空',
				type: 'error'
			});
			return undefined;
		}
		if (labelInfo.tagName.length > 10) {
			swal({
				title: '标签不能超过10个字',
				type: 'error'
			});
			return undefined;
		}
		var list = Module.pictureInfo.labelList;
		list[list.length] = labelInfo;

		Module.addLabelDisplayUnit(labelInfo);
		$('#labelNameText').val('');
		$('#closeBtn').click();
	},
	updateData: function() {
		if (undefined == Module.pictureInfo) {
			return;
		}
		Module.pictureInfo.imageInfo = $('#updateDateTimeText').val();
		var temp = Module.pictureInfo.labelList;
		var i, item, list=[];
		for(i=0; i<temp.length; i++) {
			item = temp[i];
			list[list.length] = item.tagName
		}
		Module.pictureInfo.tagList = list;
		temp = Module.pictureInfo;
		var tempLabelList = temp.labelList;
		temp.labelList = null;
		if ("design" == GlobalConfig.currentModel) {
			swal({
				title: "照片信息保存成功！",
				text: '',
				type: "success"
			});
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/image/update",
			type: 'POST',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: temp,
			success: function(data) {
				if (data.code == '0') {
					swal({
						title: "照片信息保存成功！",
						text: '',
						type: "success"
					});
				} else {
					swal({
						title: "修改照片信息失败",
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
		Module.pictureInfo.labelList = tempLabelList;
	},
	deleteLabel: function(id) {
		$('#labelUnit' + id).remove();
		var list = Module.pictureInfo.labelList;
		var i;
		for (i = 0; i < list.length; i++) {
			if (list[i].id == id) {
				list.splice(i, 1);
				return;
			}
		}

	},
	deleteThis: function() {
		if (undefined == Module.pictureInfo) {
			return;
		}
		if ("design" == GlobalConfig.currentModel) {
			swal({
				title: '删除成功',
				type: 'success'
			})
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/image/delete",
			type: 'POST',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: {
				imageId: Module.pictureInfo.imageId
			},
			success: function(data) {
				if (data.code == '0') {
					swal({
						title: '删除成功',
						type: 'success'
					})
					GlobalMethod.goBack();
				} else {
					swal({
						title: "删除标签失败",
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

var test_pictureInfo = {
	pictureId: '109k32',
	title: '上海一日游',
	address: '1.jpg',
	updateDateTime: '2020-02-22 12:23:32',
	labelList: [{
		id: '124',
		labelName: '朋友'
	}, {
		id: '1324',
		labelName: '家人'
	}, {
		id: '1244',
		labelName: '北方人'
	}]
}