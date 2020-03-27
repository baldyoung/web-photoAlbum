$(function() {

	Module.init();
});

var uploaderX;
var Module = {
	temp: 1,
	picturesInfo: {
		labelList: []
	},
	init: function() {
		var data = Module.requestData();
		Module.loadData(data);
	},
	loadData: function(data) {
		var target = $('#albumSelect');
		var i, item, html = '';
		for (i = 0; i < data.length; i++) {
			item = data[i];
			html += '<option value="' + item.albumId + '" >' + item.albumName + '</option>';
		}
		target.append(html);
	},
	requestData: function() {
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
	addLabelUnit: function() {
		var item = {
			id: Module.temp++,
			labelName: $('#labelNameText').val()
		};
		if (GlobalMethod.isEmpty(item.labelName)) {
			swal('标签名不能为空', '', 'error');
			return;
		}
		if (item.labelName.length > 10) {
			swal('标签名不能超过10个字', '', 'error');
			return;
		}
		$('#labelNameText').val('');
		var target = $('#labelFlag');
		var i, html;
		var list = Module.picturesInfo.labelList;
		list[list.length] = item;
		html = Module.createLabelUnitHTML(item);
		target.after(html);
		$('#closeBtn').click();
	},
	createLabelUnitHTML: function(item) {
		var html = '<button id="tLabel' + item.id + '" type="button" class="btn btn-default disabled" style="cursor:default; margin-right:5px;">';
		html += '<i class="fa fa-tag" style="color:#FFB733; "></i>' + item.labelName + '<span style="cursor:pointer;" onclick="Module.deleteLabel(\'' + item.id + '\')">&times;</span></button>';
		return html;
	},
	packageData: function() {
		var albumId = $("#albumSelect option:selected").val();
		if (-1 == albumId) {
			swal('请选择相册', '', 'error');
			return undefined;
		}
		Module.picturesInfo.albumId = albumId;
		Module.picturesInfo.updateDateTime = $('#updateDateTimeText').val();
		return Module.picturesInfo;
	},
	deleteLabel: function(tId) {
		$('#tLabel' + tId).remove();
		var list = Module.picturesInfo.labelList;
		var i;
		for (i = 0; i < list.length; i++) {
			if (tId == list[i].id) {
				list.splice(i, 1);
				return;
			}
		}
	},
	submitData: function() {
		if (undefined == Module.packageData()) {
			return;
		}
		if ("design" == GlobalConfig.currentModel) {
			swal({
					title: "上传成功！",
					text: "",
					type: "success",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "确定",
					closeOnConfirm: false,
					closeOnCancel: false
				},
				function(isConfirm) {
					if (isConfirm) {
						location.reload();
					}
				});
			return;
		}
		uploaderX.upload();
	}
}

var test_albumList = [{
	albumId: '100101',
	albumName: '盆友'
}, {
	albumId: '100102',
	albumName: '家人'
}, {
	albumId: '100103',
	albumName: '青岛一日游'
}];

jQuery(function() {
	var $ = jQuery, // just in case. Make sure it's not an other libaray.

		$wrap = $('#uploader'),

		// 图片容器
		$queue = $('<ul class="filelist"></ul>')
		.appendTo($wrap.find('.queueList')),

		// 状态栏，包括进度和控制按钮
		$statusBar = $wrap.find('.statusBar'),

		// 文件总体选择信息。
		$info = $statusBar.find('.info'),

		// 上传按钮
		$upload = $wrap.find('.uploadBtn'),

		// 没选择文件之前的内容。
		$placeHolder = $wrap.find('.placeholder'),

		// 总体进度条
		$progress = $statusBar.find('.progress').hide(),

		// 添加的文件数量
		fileCount = 0,

		// 添加的文件总大小
		fileSize = 0,

		// 优化retina, 在retina下这个值是2
		ratio = window.devicePixelRatio || 1,

		// 缩略图大小
		thumbnailWidth = 110 * ratio,
		thumbnailHeight = 110 * ratio,

		// 可能有pedding, ready, uploading, confirm, done.
		state = 'pedding',

		// 所有文件的进度信息，key为file id
		percentages = {},

		supportTransition = (function() {
			var s = document.createElement('p').style,
				r = 'transition' in s ||
				'WebkitTransition' in s ||
				'MozTransition' in s ||
				'msTransition' in s ||
				'OTransition' in s;
			s = null;
			return r;
		})(),

		// WebUploader实例
		uploader;

	if (!WebUploader.Uploader.support()) {
		alert('Web Uploader 不支持您的浏览器！如果你使用的是IE浏览器，请尝试升级 flash 播放器');
		throw new Error('WebUploader does not support the browser you are using.');
	}

	// 实例化
	uploader = WebUploader.create({
		pick: {
			id: '#filePicker',
			label: '点击选择图片'
		},
		dnd: '#uploader .queueList',
		paste: document.body,

		accept: {
			title: 'Images',
			extensions: 'gif,jpg,jpeg,bmp,png',
			mimeTypes: 'image/*'
		},

		// swf文件路径
		swf: BASE_URL + '/Uploader.swf',

		disableGlobalDnd: true,

		chunked: true,
		// server: 'http://webuploader.duapp.com/server/fileupload.php',
		server: GlobalConfig.serverAddress + 'addPictures',
		fileNumLimit: 300,
		fileSizeLimit: 50 * 1024 * 1024, // 200 M
		fileSingleSizeLimit: 10 * 1024 * 1024 // 50 M
	});

	uploaderX = uploader;

	// 添加“添加文件”的按钮，
	uploader.addButton({
		id: '#filePicker2',
		label: '继续添加'
	});

	// 当有文件添加进来时执行，负责view的创建
	function addFile(file) {
		var $li = $('<li id="' + file.id + '">' +
				'<p class="title">' + file.name + '</p>' +
				'<p class="imgWrap"></p>' +
				'<p class="progress"><span></span></p>' +
				'</li>'),

			$btns = $('<div class="file-panel">' +
				'<span class="cancel">删除</span>' +
				'<span class="rotateRight">向右旋转</span>' +
				'<span class="rotateLeft">向左旋转</span></div>').appendTo($li),
			$prgress = $li.find('p.progress span'),
			$wrap = $li.find('p.imgWrap'),
			$info = $('<p class="error"></p>'),

			showError = function(code) {
				switch (code) {
					case 'exceed_size':
						text = '文件大小超出';
						break;

					case 'interrupt':
						text = '上传暂停';
						break;

					default:
						text = '上传失败，请重试';
						break;
				}

				$info.text(text).appendTo($li);
			};

		if (file.getStatus() === 'invalid') {
			showError(file.statusText);
		} else {
			// @todo lazyload
			$wrap.text('预览中');
			uploader.makeThumb(file, function(error, src) {
				if (error) {
					$wrap.text('不能预览');
					return;
				}

				var img = $('<img src="' + src + '">');
				$wrap.empty().append(img);
			}, thumbnailWidth, thumbnailHeight);

			percentages[file.id] = [file.size, 0];
			file.rotation = 0;
		}

		file.on('statuschange', function(cur, prev) {
			if (prev === 'progress') {
				$prgress.hide().width(0);
			} else if (prev === 'queued') {
				$li.off('mouseenter mouseleave');
				$btns.remove();
			}

			// 成功
			if (cur === 'error' || cur === 'invalid') {
				console.log(file.statusText);
				showError(file.statusText);
				percentages[file.id][1] = 1;
			} else if (cur === 'interrupt') {
				showError('interrupt');
			} else if (cur === 'queued') {
				percentages[file.id][1] = 0;
			} else if (cur === 'progress') {
				$info.remove();
				$prgress.css('display', 'block');
			} else if (cur === 'complete') {
				$li.append('<span class="success"></span>');
			}

			$li.removeClass('state-' + prev).addClass('state-' + cur);
		});

		$li.on('mouseenter', function() {
			$btns.stop().animate({
				height: 30
			});
		});

		$li.on('mouseleave', function() {
			$btns.stop().animate({
				height: 0
			});
		});

		$btns.on('click', 'span', function() {
			var index = $(this).index(),
				deg;

			switch (index) {
				case 0:
					uploader.removeFile(file);
					return;

				case 1:
					file.rotation += 90;
					break;

				case 2:
					file.rotation -= 90;
					break;
			}

			if (supportTransition) {
				deg = 'rotate(' + file.rotation + 'deg)';
				$wrap.css({
					'-webkit-transform': deg,
					'-mos-transform': deg,
					'-o-transform': deg,
					'transform': deg
				});
			} else {
				$wrap.css('filter', 'progid:DXImageTransform.Microsoft.BasicImage(rotation=' + (~~((file.rotation / 90) % 4 + 4) % 4) + ')');
				// use jquery animate to rotation
				// $({
				//     rotation: rotation
				// }).animate({
				//     rotation: file.rotation
				// }, {
				//     easing: 'linear',
				//     step: function( now ) {
				//         now = now * Math.PI / 180;

				//         var cos = Math.cos( now ),
				//             sin = Math.sin( now );

				//         $wrap.css( 'filter', "progid:DXImageTransform.Microsoft.Matrix(M11=" + cos + ",M12=" + (-sin) + ",M21=" + sin + ",M22=" + cos + ",SizingMethod='auto expand')");
				//     }
				// });
			}

		});

		$li.appendTo($queue);
	}

	// 负责view的销毁
	function removeFile(file) {
		var $li = $('#' + file.id);

		delete percentages[file.id];
		updateTotalProgress();
		$li.off().find('.file-panel').off().end().remove();
	}

	function updateTotalProgress() {
		var loaded = 0,
			total = 0,
			spans = $progress.children(),
			percent;

		$.each(percentages, function(k, v) {
			total += v[0];
			loaded += v[0] * v[1];
		});

		percent = total ? loaded / total : 0;

		spans.eq(0).text(Math.round(percent * 100) + '%');
		spans.eq(1).css('width', Math.round(percent * 100) + '%');
		updateStatus();
	}

	function updateStatus() {
		var text = '',
			stats;

		if (state === 'ready') {
			text = '选中' + fileCount + '张图片，共' +
				WebUploader.formatSize(fileSize) + '。';
		} else if (state === 'confirm') {
			stats = uploader.getStats();
			if (stats.uploadFailNum) {
				text = '已成功上传' + stats.successNum + '张照片，' +
					stats.uploadFailNum + '张照片上传失败，<a class="retry" href="#">重新上传</a>失败图片或<a class="ignore" href="#">忽略</a>'
			}

		} else {
			stats = uploader.getStats();
			text = '共' + fileCount + '张（' +
				WebUploader.formatSize(fileSize) +
				'），已上传' + stats.successNum + '张';

			if (stats.uploadFailNum) {
				text += '，失败' + stats.uploadFailNum + '张';
			}
		}

		$info.html(text);
	}

	function setState(val) {
		var file, stats;

		if (val === state) {
			return;
		}

		$upload.removeClass('state-' + state);
		$upload.addClass('state-' + val);
		state = val;

		switch (state) {
			case 'pedding':
				$placeHolder.removeClass('element-invisible');
				$queue.parent().removeClass('filled');
				$queue.hide();
				$statusBar.addClass('element-invisible');
				uploader.refresh();
				break;

			case 'ready':
				$placeHolder.addClass('element-invisible');
				$('#filePicker2').removeClass('element-invisible');
				$queue.parent().addClass('filled');
				$queue.show();
				$statusBar.removeClass('element-invisible');
				uploader.refresh();
				break;

			case 'uploading':
				$('#filePicker2').addClass('element-invisible');
				$progress.show();
				$upload.text('暂停上传');
				break;

			case 'paused':
				$progress.show();
				$upload.text('继续上传');
				break;

			case 'confirm':
				$progress.hide();
				$upload.text('开始上传').addClass('disabled');

				stats = uploader.getStats();
				if (stats.successNum && !stats.uploadFailNum) {
					setState('finish');
					return;
				}
				break;
			case 'finish':
				stats = uploader.getStats();
				if (stats.successNum) {
					alert('上传成功');
				} else {
					// 没有成功的图片，重设
					state = 'done';
					location.reload();
				}
				break;
		}

		updateStatus();
	}

	uploader.onUploadProgress = function(file, percentage) {
		var $li = $('#' + file.id),
			$percent = $li.find('.progress span');

		$percent.css('width', percentage * 100 + '%');
		percentages[file.id][1] = percentage;
		updateTotalProgress();
	};

	uploader.onFileQueued = function(file) {
		fileCount++;
		fileSize += file.size;

		if (fileCount === 1) {
			$placeHolder.addClass('element-invisible');
			$statusBar.show();
		}

		addFile(file);
		setState('ready');
		updateTotalProgress();
	};

	uploader.onFileDequeued = function(file) {
		fileCount--;
		fileSize -= file.size;

		if (!fileCount) {
			setState('pedding');
		}

		removeFile(file);
		updateTotalProgress();

	};

	uploader.on('all', function(type) {
		var stats;
		switch (type) {
			case 'uploadFinished':
				setState('confirm');
				break;

			case 'startUpload':
				setState('uploading');
				break;

			case 'stopUpload':
				setState('paused');
				break;

		}
	});
	//上传成功后调用
	uploader.on('uploadSuccess', function(file, response) {
		//console.log("上传成功后，后台返回")
		//console.log(response)
		if (response.result == 'success') { //添加商品信息提交成功
			swal({
					title: "上传成功！",
					text: "",
					type: "success",
					confirmButtonColor: "#DD6B55",
					confirmButtonText: "确定",
					closeOnConfirm: false,
					closeOnCancel: false
				},
				function(isConfirm) {
					if (isConfirm) {
						location.reload();
					}
				});
			// ---------------------------------------------------------- 上传完成后调用
		}
		uploader.removeFile(file);

	});
	//上传前调用
	uploader.on('uploadBeforeSend', function(obj, data) {
		//console.log('uploader befor ')
		//console.log(newProductInf)
		//传入表单参数
		var list = [];
		var targetList = Module.picturesInfo.labelList;
		var i, item;
		for (i = 0; i < targetList.length; i++) {
			item = targetList[i];
			list[i] = item.labelName;
		}
		data = $.extend(data, {
			albumId: Module.picturesInfo.albumId,
			labelList: list,
			udpateDateTime: Module.picturesInfo.updateDateTime
		});
	});

	uploader.onError = function(code) {
		alert('Eroor: ' + code);
	};

	$upload.on('click', function() {
		if ($(this).hasClass('disabled')) {
			return false;
		}

		if (state === 'ready') {
			uploader.upload();
		} else if (state === 'paused') {
			uploader.upload();
		} else if (state === 'uploading') {
			uploader.stop();
		}
	});

	$info.on('click', '.retry', function() {
		uploader.retry();
	});

	$info.on('click', '.ignore', function() {
		// alert( 'todo' );
		location.reload();
	});

	$upload.addClass('state-' + state);
	updateTotalProgress();
});