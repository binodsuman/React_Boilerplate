import $ from 'jquery';

class RestApi {
    static getHosts(data) {
        let url = '';
        return new Promise((resolve, reject)=>{
            // $.ajax({
            //     type: 'POST',
            //     url: 'http://127.0.0.1:5000/secondVisitPrediction',
            //     contentType: 'application/json',
            //     data: JSON.stringify(data),
            //     success: function (responseData) {
            //         resolve(responseData);
            //     },
            //     error: function (status, err) {
            //         reject(err);
            //     }
            // });
            resolve(['amz-crawler-b-1419129811-1-1474237919.prod.cloud-modules.cd-cia.prod-az-westus-28.prod.us.walmart.net', 
            'amz-crawler-b-1419129812-1-1474237919.prod.cloud-modules.cd-cia.prod-az-westus-28.prod.us.walmart.net', 
            'amz-crawler-b-1419129813-1-1474237919.prod.cloud-modules.cd-cia.prod-az-westus-28.prod.us.walmart.net'])
        });
    }

    static getHostStatus(data) {
        let url = '';
        return new Promise(async (resolve, reject)=>{
            // $.ajax({
            //     type: 'POST',
            //     url: 'http://127.0.0.1:5000/secondVisitPrediction',
            //     contentType: 'application/json',
            //     data: JSON.stringify(data),
            //     success: function (responseData) {
            //         resolve(responseData);
            //     },
            //     error: function (status, err) {
            //         reject(err);
            //     }
            // });

            await new Promise((resolve)=>setTimeout(resolve, 10000))

            resolve({name:data.name, reachable:false, running: false})
        });
    }
}

export default RestApi;