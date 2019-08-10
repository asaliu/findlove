/**
 * [OElove] (C)2010-2099 OELOVE.COM Inc.biz
 * Email: service@phpcoo.com ,phpcoo@qq.com
 * This is NOT a freeware, use is subject to license terms
 * $ Last update 2017/11/08 by CL $
*/
$(function(){
	//模拟单选
	$(document).on("change", "[f='but_cond_sel']", function(){
		$_tid = $(this).attr("data-tid");
		$_val = $(this).find("option:selected").val();
		$_text = $(this).find("option:selected").text();
		$_tips = $(this).attr("data-tips");
		if ($_val.length == 0) {
			$_text = $_tips;
		}
		$("#"+$_tid).html($_text);

	});

    //新的下拉选择 7.11.30
    $(document).on("change", "[f='but_change_sel']", function(){
        $tid = $(this).attr("data-tid");
        $text = $(this).find("option:selected").text();

        $("#"+$tid).html($text);
    });

	//模拟二选
	$(document).on("click", "[f='but_cond_multi_sel']", function(){
		$_box = $(this).attr("data-box");
		if ($("#"+$_box).css("display") == "none") {
			$("#"+$_box).show();
		}
		else {
			$("#"+$_box).hide();
		}
	});
	$(document).on("click", "[f='but_cond_multi_confirm']", function(){
		$_tid = $(this).attr("data-tid");
		$_tips = $(this).attr("data-tips");
		$_box = $(this).attr("data-box");

		$_id1 = $(this).attr("data-id1");
		$_id2 = $(this).attr("data-id2");

		$_id1_val = $("#"+$_id1).find("option:selected").val();
		$_id1_text = $("#"+$_id1).find("option:selected").text();

		$_id2_val = $("#"+$_id2).find("option:selected").val();
		$_id2_text = $("#"+$_id2).find("option:selected").text();
		
		if ($_id1_val.length > 0 && $_id2_val.length > 0) {
			$_text = $_id1_text+"-"+$_id2_text;
		}
		else {
			$_text = $_tips;
		}
		$("#"+$_tid).html($_text);
		$("#"+$_box).hide();
	});

	//模拟三选
	$(document).on("click", "[f='but_cond_three_sel']", function(){
		$_box = $(this).attr("data-box");
		if ($("#"+$_box).css("display") == "none") {
			$("#"+$_box).show();
		}
		else {
			$("#"+$_box).hide();
		}
	});
	$(document).on("click", "[f='but_cond_three_confirm']", function(){
		$_tid = $(this).attr("data-tid");
		$_tips = $(this).attr("data-tips");
		$_box = $(this).attr("data-box");

		$_id1 = $(this).attr("data-id1");
		$_id2 = $(this).attr("data-id2");
		if (typeof($_id2) == "undefined") {
			$_id2 = "";
		}
		$_id3 = $(this).attr("data-id3");
		if (typeof($_id3) == "undefined") {
			$_id3 = "";
		}

		$_id1_val = $("#"+$_id1).find("option:selected").val();
		$_id1_text = $("#"+$_id1).find("option:selected").text();
		
		if ($_id2.length > 0) {
			$_id2_val = $("#"+$_id2).find("option:selected").val();
			if (typeof($_id2_val) == "undefined") {
				$_id2_val = "";
			}
			$_id2_text = $("#"+$_id2).find("option:selected").text();
			if (typeof($_id2_text) == "undefined") {
				$_id2_text = "";
			}
		}
		else {
			$_id2_val = "";
			$_id2_text = "";
		}

		if ($_id3.length > 0) {
			$_id3_val = $("#"+$_id3).find("option:selected").val();
			if (typeof($_id3_val) == "undefined") {
				$_id3_val = "";
			}
			$_id3_text = $("#"+$_id3).find("option:selected").text();
			if (typeof($_id3_text) == "undefined") {
				$_id3_text = "";
			}
		}
		else {
			$_id3_val = "";
			$_id3_text = "";
		}

		$_text = $_tips;


		if ($_id1_val.length > 0) {
			$_text = $_id1_text;
		}
		if ($_id2_val.length > 0) {
			$_text = $_text+ " " +$_id2_text;
		}
		if ($_id3_val.length > 0) {
			$_text = $_text+ " " +$_id3_text;
		}

		$("#"+$_tid).html($_text);
		$("#"+$_box).hide();
	});
	//搜索本店
	$(document).on("click", "[f='but_search_cond_user']", function(){
		$("#search_normal").submit();
	});
});

