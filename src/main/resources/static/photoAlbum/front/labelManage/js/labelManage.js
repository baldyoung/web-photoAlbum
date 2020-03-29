$(function() {
	LabelModule.init();
});

var LabelModule = {
	init: function() {
		var data = LabelModule.requestData();
		LabelModule.loadData(data);
	},
	loadData: function(data) {
		var target = $('#labelDisplayArea');
		var temp = (data == undefined || data.length == 0) ? '您还没有为图片创建过标签哦^-^' : '';
		target.html(temp);
		var i, item, html;
		for (i = 0; i < data.length; i++) {
			item = data[i];
			item.tagId = i;
			html = LabelModule.createLabelUnitHTML(item);
			target.append(html);
		}
	},
	createLabelUnitHTML: function(item) {
		var html = '<button type="button" class="btn btn-default disabled" style="cursor:default; margin-right:5px; ">';
		html += '<i class="fa fa-tag" style="color:#FFB733; "></i>';
		html += '<span onclick="GlobalMethod.redirectURL(\'/photoAlbum/front/pictures/pictures.html?tagName='+item.tagName+'\')">' + item.tagName + '('+item.amount+')</span>';
		html += '<span style="cursor:pointer;" onclick="LabelModule.deleteAction(\'' + item.tagId + '\', \'' + item.tagName + '\')">&times;</span></button>';
		return html;
	},
	requestData: function() {
		var targetData = [];
		if ("design" == GlobalConfig.currentModel) {
			return test_labelList;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/tag/userTag",
			type: 'GET',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: {},
			success: function(data) {
				if (data.code == '0') {
					targetData = data.data;
				} else {
					swal({
						title: "获取标签数据失败",
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
	deleteAction: function(id, name) {
		swal({
				title: "您确定要删除标签 " + name + " 吗?",
				text: "删除标签不会连带删除照片！",
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
					LabelModule.deleteLabel(id, name);
				} else {
					swal("已取消", "您取消了删除操作！", "error");
				}
			});
	},
	deleteLabel: function(id, name) {
		if ("design" == GlobalConfig.currentModel) {
			swal("删除成功！", "", "success");
			return;
		}
		$.ajax({
			url: GlobalConfig.serverAddress + "/tag/delete",
			type: 'POST',
			cache: false,
			async: false, //设置同步
			dataType: 'json',
			contentType: "application/x-www-form-urlencoded;charset=utf-8",
			data: {
				tagName: name
			},
			success: function(data) {
				if (data.code == '0') {
					LabelModule.init();
					swal("删除成功！", "", "success");
				} else {
					swal({
						title: "标签（" + name + "）删除失败",
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

var test_labelList = [{
	labelId: '10010',
	labelName: '盆友'
}, {
	labelId: '10011',
	labelName: '蓝朋友'
}, {
	labelId: '10012',
	labelName: '家人',
}, {
	labelId: '10013',
	labelName: '美食',
}, {
	labelId: '10014',
	labelName: '月亮',
}, {
	labelId: '10015',
	labelName: '太阳',
}]