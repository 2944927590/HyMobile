/**
 * Data Module
 * Created by Homkai on 2015/8/8.
 */
define('data', function(require, exports, module){

    var Cache = require('cache'),
        URL = require('url');

    module.exports = {
        query: query
    };

    /**
     * AJAX���󣬻�Я��URL query��Ϣ��֧�ֻ���
     * @param url URL
     * @param data Ҫ���͵����ݣ���ѡ
     * @param cb ����ɹ�����ʧ�ܶ���ִ������ص�����
     * @param cacheTime number|callback
     * @returns {*}
     */
    function query(url, data, cb, cacheTime){
        if(!url) return false;
        if(!$.isPlainObject(data) && $.isFunction(data)){
            cacheTime = cb;
            cb = data;
            data = {};
        }
        // Я��URL����query����
        data = $.extend({}, data, URL.get('?'));
        if(cacheTime && !$.isFunction(cacheTime)){
            cacheTime = function(){
                return cacheTime;
            }
        }
        if(cacheTime){
            var res = Cache.getItem(url);
            if(res){
                return $.isFunction(cb) && cb(res);
            }
        }
        $.ajax({
            url: url,
            data: data,
            success: function(res){
                if(cacheTime){
                    var cacheTime = cacheTime(res);
                    Cache.setItem(url, res, cacheTime);
                }
                $.isFunction(cb) && cb(res);
            },
            error: function(res){
                // TODO ֮�������ͳһ�ϱ�
                $.isFunction(cb) && cb(false);
            }
        });


    }


});