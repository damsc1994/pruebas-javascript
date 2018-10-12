var getLogs = function (startDate, endDate, stateCode) {
    var urlApi = 'https://api.cebroker.com/v1/cerenewaltransactions/GetLogsRecordData?'+
            'startdate='+startDate+'&enddate='+endDate+'&state='+stateCode;

    return new Promise((resolve, reject) => {
            var logs = fetch(urlApi).then( (response)=> {
                return response.json();
                }).then((data) => {
                return data;
                });

            if (!logs) return reject(new Error('ERROR AL INTENTAR LISTAR LOS DATOS'));

            return resolve(logs);
    });
}

export default getLogs;

