
/*
app 配置信息
包括: 
后台服务器地址
短信服务地址
消息通知服务地址
*/
angular.module('iHotelApp')
    .constant('APP_CONFIG', 
    {
        /*
        后台服务配置
        */
        server: {
            address: 'http://192.168.1.100',
            name:'hotelMgr',
            port: '8080',
            getUrl: function () {
                return this.address + ':' + this.port + '/'+this.name+'/';

            }
        }
    });

/*




*/