/**
 * Time Format Module
 * Created by Homkai on 2015/8/8.
 */
define('time', function(require, exports, module){

    module.exports = {
        now: now,
        // TODO ��������
        format: format
    };

    function getSvrTimeDiff(){
        // TODO ����Ҫ�������������ʱ���
        return 0;
    }

    function now(){
        var t = (Date.now && Date.now()) || (new Date()).getTime();
        return t + getSvrTimeDiff();
    }

    function pad2(num){
        return num < 10 ? '0'+num : num;
    }

    /**
     * ʱ���ʽ��
     * @param ymdhiswx Ϊ��ʽ��ƥ��ؼ��� yy ��ʾ
     * @param timestamp
     * @returns {XML|void|string}
     */
    function format(format, timestamp){
        var timestamp = (timestamp || now()), date = new Date(timestamp);
        var dayMap = ['��', 'һ', '��', '��', '��', '��', '��'];
        return format.replace(/(yyyy|m{2}|m{1}|d{2}|d{1}|h{2}|h{1}|i{2}|i{1}|s{2}|s{1}|w|x)/ig, function(m0){
            switch(m0.toLowerCase()){
                case 'yyyy':
                    return date.getFullYear();
                case 'mm':
                    return pad2(date.getMonth()+1);
                case 'm':
                    return date.getMonth()+1;
                case 'dd':
                    return pad2(date.getDate());
                case 'd':
                    return date.getDate();
                case 'hh':
                    return pad2(date.getHours());
                case 'h':
                    return date.getHours();
                case 'ii':
                    return pad2(date.getMinutes());
                case 'i':
                    return date.getMinutes();
                case 'ss':
                    return pad2(date.getSeconds());
                case 's':
                    return date.getSeconds();
                case 'w':
                    return date.getDay();
                case 'x':
                    return dayMap[date.getDay()];
            }
        });
    }

});