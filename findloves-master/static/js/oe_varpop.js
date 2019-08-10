/**
	[OElove] (C)2010-2099 PHPCOO.COM Inc.
	This is NOT a freeware, use is subject to license terms
	$Id: oe_varpop.js 2015-03-25 OEdev $
*/

/*
var OE_WIN_WIDTH = $(window).width();
if ($.browser.mozilla) {
	OE_WIN_WIDTH = window.screen.width; //兼容Mozilla
}
*/
var OE_WIN_WIDTH = $("html").width();
var OE_BODY_WIDTH = $("body").width();
var Toast = function(config){
	this.context = config.context == null ? $('body'):config.context;//上下文
	this.message = config.message;//显示内容
	this.time = config.time == null ? 3000 : config.time;//持续时间
	this.left = config.left;//距容器左边的距离
	this.top = config.top;//距容器上方的距离
	this.init();
}
var msgEntity;
Toast.prototype = {
	//初始化显示的位置内容等
	init : function(){
		$("#ToastBox").remove();
		//设置消息体
		var msgDIV = new Array();
		msgDIV.push('<div id="ToastBox" class="oe-toast">');
		msgDIV.push('<span id="ToastText">'+this.message+'</span>');
		msgDIV.push('</div>');

		msgEntity = $(msgDIV.join('')).appendTo(this.context);

		$span_width = msgEntity.width();
		$left_width = (OE_WIN_WIDTH-$span_width)/2;
		//设置消息样式
		//var left = this.left == null ? this.context.width()/2-msgEntity.find('span').width()/2 : this.left;
		//var top = this.top == null ? '20px' : this.top;
		msgEntity.css({left:$left_width});
		msgEntity.hide();
	},
	//显示动画
	show :function(){
		//msgEntity.fadeIn(this.time/2);
		msgEntity.fadeIn(600);
		setTimeout(function(){
			msgEntity.fadeOut(2000);
		}, 2000);
	}	
}
function ToastShow(text, focus, callback) {
	if (typeof(focus) == "undefined") {focus = "";}
	if (typeof(callback) == "undefined") {callback = "";}
	new Toast({context:$('body'), message:text}).show();
	if (focus.length > 0) {
		$("#"+focus).focus();
	}
	if (typeof(callback) == "function") {
		callback.call(this);
	}
}

function ToastTips(msg, focus, callback) {
	if (typeof(msg) == 'undefined') {
		msg = "";
	}
	if (typeof(focus) == "undefined") {focus = "";}
	if (typeof(callback) == "undefined") {callback = "";}
	$obj_id = "ToastTips";
	$("#"+$obj_id).remove();
	$append_html = "<div id='"+$obj_id+"' class='oe_toasttips'><span>"+msg+"</span></div>";
	$($append_html).appendTo("body");

	$height =  ($(window).height()-$("#"+$obj_id).height())/3;
	$("#"+$obj_id).css("left", Math.max(0, (($(window).width() - $("#"+$obj_id).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
	$("#"+$obj_id).css("bottom", $height+"px");
	
	$("#"+$obj_id).fadeIn(800);
	setTimeout(function(){
		$("#"+$obj_id).fadeOut(2000);
	}, 2000);
	if (focus.length > 0) {
		$("#"+focus).focus();
	}
	if (typeof(callback) == "function") {
		callback.call(this);
	}
}

//自适应居中
function varPopMarginAuto(tabid){
	$('#'+tabid).css("position","fixed");
	$height =  ($(window).height()-$("#"+tabid).height())/2;
	$('#'+tabid).css("top", $height+"px");
	$('#'+tabid).css("left", Math.max(0, (($(window).width() - $('#'+tabid).outerWidth()) / 2) + $(window).scrollLeft()) + "px");
}

//弹出窗口
function varPopShow(tabid) {
	$(".varpop-shade").fadeIn(200);
	varPopMarginAuto(tabid);
	$("#"+tabid).fadeIn(200);
}

//关闭弹窗
function varPopClose(tabid) {
	if(typeof(tabid) == 'undefined') {
		tabid = "";
	}
	$("#"+tabid).fadeOut(200);
	$(".varpop-shade").fadeOut(200);
}

/**
 * 弹出遮罩层 支持 iframe,ajax 2017.11.27
 * @param:: string $var_tabid 元素ID
 * @param:: string $var_type 页面类型 iframe/ajax/html...
 * @param:: string var_value 内容值
 * @param:: int $var_width 页面宽度
 * @param:: int $var_height 页面高度
 * @param:; function callback 回调函数
 * @return:: string ...
 */
function oeShadeBox(var_tabid, var_type, var_value, var_width, var_height, callBack) {
    callBack = callBack || function(){};
    $("html").addClass("dialog_lock_hide");
    if (typeof(var_width) == "undefined") {
        var_width = 600;
    }
    if (typeof(var_height) == "undefined") {
        var_height = 500;
    }
    $box_id = var_tabid+"_box";
    $box_data_id = var_tabid+"_data";

    //初始化遮罩层
    $shade_html = "<div class='oe_shade' style='display:none;' id='"+$box_id+"'>"+
                    "  <div class='oe_boxloading'><span></span></div>"+
                    "  <div class='oe_shade_wrap' style='width:"+parseInt(var_width+20)+"px;height:"+parseInt(var_height+40)+"px;margin-top:-"+(parseInt(var_height+40)/2)+"px;'>"+
                    "    <span class='close' style='cursor:pointer;display:none;' f='but_close_shade' data-id='"+var_tabid+"' id='"+var_tabid+"_close'></span>"+
                    "    <div class='oe_shade_box' style='width:"+var_width+"px;height:"+var_height+"px;display:none;' id='"+$box_data_id+"'>"+
                    "    </div>"+
                    "  </div>"+
                  "</div>";
    $("body").append($shade_html);

    //内容区
    $_var_content = "";
    if (var_type == "iframe") { //iframe页面
        $_var_content = "<iframe frameborder='0' allowtransparency='true' style='width:100%;height:"+var_height+"px;border:0px none;' src='"+var_value+"'></iframe>";
        $("#"+$box_data_id).html($_var_content);//赋值
        varPopMarginAuto($box_id); //居中
        $("#"+$box_id).find(".oe_boxloading").hide();
        $("#"+$box_id).show();
        $("#"+$box_data_id).yanVhSlideSide(100, function(){
            $("[f='but_close_shade']").show();
            if (typeof(callBack) == "function") {
                callBack();
            }
        });
    }
    else if (var_type == "ajax") { //ajax请求出页面
        $("#"+$box_id).show();
        $.ajax({
            type: "POST",
            url: var_value,
            cache: false,
            data: {r:get_rndnum(8)},
            dataType: "json",
            success: function($data) {
                $json = eval($data);
                $response = $json.response;
                $result = $json.result;
                if ($response == "1") {
                    $_var_content = $result;
                }
                else {
                    if ($result.length == 0) {
                        $result = "页面请求出错啦！~";
                    }
                    $_var_content = "<div class='inbox_tips' style='height:150px;margin-top:-85px;'>"+
                        "  <p class='p_1'><span></span></p>"+
                        "  <p class='p_2'>"+$result+"</p>"+
                        "</div>";

                }

                $("#"+$box_data_id).html($_var_content);//赋值
                varPopMarginAuto($box_id); //居中
                $("#"+$box_id).find(".oe_boxloading").hide();
                $("#"+$box_data_id).yanVhSlideSide(100, function(){
                    $("[f='but_close_shade']").show();
                    if (typeof(callBack) == "function") {
                        callBack();
                    }
                });

            },
            error: function() {
                ToastShow("系统繁忙，请稍后再试！");
            }
        });

    }
    else if (var_type == "html") {
        $("#"+$box_data_id).html(var_value);//赋值
        varPopMarginAuto($box_id); //居中
        $("#"+$box_id).find(".oe_boxloading").hide();
        $("#"+$box_id).show();
        $("#"+$box_data_id).yanVhSlideSide(100, function(){
            $("[f='but_close_shade']").show();
            if (typeof(callBack) == "function") {
                callBack();
            }
        });
    }
}

$(function(){
    //关闭遮罩层 2017.11.27
    $(document).on("click", "[f='but_close_shade']", function(){
        //$("[f='but_close_shade']").hide();
        $_id = $(this).attr("data-id");
        if (typeof($_id) == "undefined") {
            $_id = "";
        }
        if ($_id.length > 0) {
            _closeShadeBox($_id);
            /*
             $("#"+$_id+"_data").yanVhSlideCenter(200, function(){
             $("#"+$_id+"_box").remove();
             $("html").removeClass("dialog_lock_hide");
             });
             */
        }
    });
});
//关闭遮罩层 func 2017.11.27
function _closeShadeBox($_id, callBack) {
    callBack = callBack || function(){};
    $("#"+$_id+"_close").remove();
    $("#"+$_id+"_data").yanVhSlideCenter(100, function(){
        $("#"+$_id+"_data").html("");
        $("#"+$_id+"_box").remove();
        if ($("[f='but_close_shade']").length > 0) {
        }
        else {
            $("html").removeClass("dialog_lock_hide"); //滚动条
        }
        if (typeof(callBack) == "function") {
            callBack();
        }
    });
}