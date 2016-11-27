export default class CrudDataModel {
	requestData(option, successCallback, errorCallBack) {
		var server = "http://localhost:8000";
		$.ajax({
			url: server + option.url,
			dataType: 'json',
			type: option.type || "GET",
			cache: false,
			data: option.data || null,
			success: successCallback,
			error: errorCallBack
		});
	}
}