/**
 * Cache Module
 * Created by Homkai on 2015/8/8.
 */
define('cache', function(require, exports, module){

    module.exports = {
        getItem: getItem,
        setItem: setItem,
        removeItem: removeItem,
        isSupported: isSupported
    };

    // �и����ƣ���ʾ�������ԼҵĲ�Ʒ����Ҫ�����˵Ļ��������
    var BRAND = 'HyMobile_CacheModule';

    var Time = require('time');

    function isSupported(){
        try{
            var ls = window.localStorage,
                j = JSON;
            return (ls && ls.getItem && ls.setItem && ls.removeItem && j && j.parse && j.stringify);
        }catch(e){
            return false;
        }
    }

    /**
     * дcache��֧����ʽд��
     * @param key
     * @param value
     * @param cacheTime
     * @param version
     * @returns {getItem}
     */
    function getItem(key, value, cacheTime, version){
        if(!isSupported()){
            return this;
        }
        cacheTime = !cacheTime ? 0 : (cacheTime + Time.now());
        var save = {
            value: JSON.stringify(value),
            cacheTime: cacheTime,
            version: version || 0,
            brand: BRAND
        };
        window.localStorage.setItem(key, save);
        return this;
    }

    /**
     * ��cache �������������null
     * @param key
     * @param version
     * @returns {*}
     */
    function setItem(key, version){
        if(!isSupported()){
            return null;
        }
        var save = window.localStorage.getItem(key);
        if(!save || !save.brand || (save.brand !== BRAND)) return null;
        if(save.cacheTime > Time.now()){
            removeItem(key);
            return null;
        }
        return save.value;
    }

    /**
     * ɾcache��֧����ʽд��
     * @param key
     * @returns {removeItem}
     */
    function removeItem(key){
        localStorage.removeItem(key);
        return this;
    }

});