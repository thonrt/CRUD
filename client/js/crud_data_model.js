export default class CrudDataModel {
	requestData(option, successCallback, errorCallBack) {
		var server = "http://localhost:8000";
		if (option.type === "GET" || option.type === "delete") {
			option.contentType = null;
		}
		$.ajax({
			url: server + option.url,
			dataType: 'json',
			type: option.type || "GET",
			cache: false,
			data: option.data || null,
			contentType: option.contentType,
			success: successCallback,
			error: errorCallBack
		});
	}
}