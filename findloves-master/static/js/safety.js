/**
 * [OElove] (C)2010-2099 phpcoo.com Inc.free
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * This is NOT a freeware, use is subject to license terms
 * $ Last update 2018/04/19 by OE $
*/
$(function(){
	//焦点处理
	//$("[f='changept']").bind("click", function(){
	$(document).on("click", "[f='changept']", function(){
		$_input_id = $(this).attr("data-id");
		$("#"+$_input_id).focus();
	});
	//$("[f='checkinput']").bind("blur", function(){
	$(document).on("blur", "[f='checkinput']", function(){
		$_input_id = $(this).attr("id");
		if ($("#"+$_input_id).val().length > 0) {
			$("#"+$_input_id+"_pt").hide();
		}
		else {
			$("#"+$_input_id+"_pt").show();
		}
	});
	//$("[f='checkinput']").bind("keyup", function(){
	$(document).on("keyup", "[f='checkinput']", function(){
		$_input_id = $(this).attr("id");
		if ($("#"+$_input_id).val().length > 0) {
			$("#"+$_input_id+"_pt").hide();
		}
		else {
			$("#"+$_input_id+"_pt").show();
		}
	});

	//切换诚信查询
	$(document).on("click", "[f='but_credit_type']", function(){
		$_type = $(this).attr("data-type");
		$("[f='but_credit_type']").removeClass("current");
		$(this).addClass("current");
		
		$_text = "";
		if ($_type == "mobile") {
			$_text = "请输入查询手机号";
		}
		else if ($_type == "qq") {
			$_text = "请输入查询QQ号";
		}
		else if ($_type == "email") {
			$_text = "请输入查询邮箱";
		}
		else if ($_type == "weixin") {
			$_text = "请输入查询微信";
		}
		else if ($_type == "idcard") {
			$_text = "请输入查询身份证号";
		}
		else {
			$_text = "请输入查询关键词";
		}
		$("#credit_key").val("");
		$("#credit_key_pt").html($_text).show();
		$("#credit_type").val($_type);
		$("#credit_result").hide();
	});
	
	//查询
	$(document).on("click", "[f='but_check_credit']", function(){
		$_credit_flag = $(this).attr("data-flag");
		if ($_credit_flag == "0") {
			ToastShow("网站暂未开启该功能，请联系客服");
			return false;
		}
		$("#credit_loading").show();
		$("#credit_result").hide();
		$_keyword = $("#credit_key").val();
		$_type = $("#credit_type").val();
		if ($_keyword.length == 0) {
			ToastShow("请输入要查询的信息");
			$("#credit_loading").hide();
			return false;
		}
		$.ajax({
			type: "POST",
			url: _ROOT_PATH + "index.php?c=rpzy",
			cache: false,
			data: {
                a:"query", type:$_type, value:$_keyword, datatype:"json", r:get_rndnum(8)
            },
			dataType: "json",
			success: function($data) {
				$json = eval($data);
				$response = $json.response;
				$result = $json.result;
				$("#key_tips").html("“"+$_keyword+"”");
				$("#credit_img").removeClass("current");
				if ($response == "1") { //查询成功，没有举报
					$("#credit_img").removeClass("current");
					$("#check_tips").html("记录良好，没有被举报过");
				}
				else if ($response == "2") { //查询成功，有举报
                    $("#credit_img").addClass("current");
					$("#check_tips").html("有举报记录，可能存在风险");
				}
				else { //查询失败
					$("#credit_img").addClass("current");
					$("#check_tips").html("信息查询失败");
				}
				$("#credit_result").show();
				$("#credit_loading").hide();
			},
			error: function() {
				ToastShow("系统繁忙，请稍后再试");
				$("#credit_loading").hide();
			}
		});

	});
	
});

