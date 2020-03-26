$(function() {

	Module.init();

});

var Module = {
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
		$('#pictureURL').attr('src', GlobalConfig.pictureRelativePath + data.address);
		//
		$('#updateDateTimeText').val(data.updateDateTime);
		//var target = $('#labelDisplayArea');
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
		var html = '<button id="labelUnit' + item.id + '" type="button" class="btn btn-default disabled" style="cursor:default; margin-right:5px;">';
		html += '<i class="fa fa-tag" style="color:#FFB733; "></i>' + item.labelName + '<span style="cursor:pointer;" onclick="Module.deleteLabel(\'' + item.id + '\')">&times;</span>';
		html += '</button>';
		target.after(html);
	},
	requestData: function(pictureId) {
		var targetData = [];
		if ("design" == GlobalConfig.currentModel) {
			return test_pictureInfo;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "getPicture",
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
	addLabel: function() {
		var labelInfo = {
			labelName: $('#labelNameText').val()
		};
		if (GlobalMethod.isEmpty(labelInfo.labelName)) {
			swal({
				title: '标签不能为空',
				type: 'error'
			});
			return undefined;
		}
		if (labelInfo.labelName.length > 10) {
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
		Module.pictureInfo.updateDateTime = $('#updateDateTimeText').val();

		if ("design" == GlobalConfig.currentModel) {
			swal({
				title: "照片信息保存成功！",
				text: '',
				type: "success"
			});
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "updatePicture",
			type: 'POST',
			cache: false,
			//async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: Module.pictureInfo,
			success: function(data) {
				if (data.result == 'success') {
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
			url: GlobalConfig.serverAddress + "deletePicture",
			type: 'POST',
			cache: false,
			//async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: {
				pictureId: Module.pictureInfo.pictureId
			},
			success: function(data) {
				if (data.result == 'success') {
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