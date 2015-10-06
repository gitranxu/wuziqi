$().ready(function(){

    var i_now = 0;//����2����Ϊ��ʱ���壬����Ϊ����
    var i_success = 0;//ʤ������
    var wuziqi = {
        init : function(){
            //  ��������������̨
            i_now = 0;
            var rows = $('.rows').val() || 12;
            var cols = $('.cols').val() || 12;
            var html = "";
            for(var i = 0;i < rows;i++){
                for(var j = 0;j < cols;j++){
                    html += '<div class="stone" rowno="'+i+'" colno="'+j+'"></div>'
                }
            }
            $('.stones').empty().width(40*cols).append(html);

            var fg_html = '';
            var fg_rows = rows - 0 + 1;
            var fg_cols = cols - 0 + 1;
            for(var i = 0;i < fg_rows;i++){
                for(var j = 0;j < fg_cols;j++){
                    fg_html += '<div class="fg fg'+i+j+'" rowno="'+i+'" colno="'+j+'"></div>';
                }
            }
            $('.fgs').empty().width(40*fg_cols).append(fg_html);
            $('.container').width(40*cols).height(40*rows+10);
        },
        bind : function(){
            var _this = this;
            $('.fgs').delegate('.fg','click',function(){
                //��������ж��Ƿ��Ѿ��������ˣ����û�п������ɣ�������������ɡ��������ߣ��ڰ����α�ɫ
                if($(this).hasClass('black')||$(this).hasClass('white')){
                    return;
                }
                var fgcolor = '';
                if(i_now%2==0){
                    fgcolor = 'black';
                    $(this).removeClass('white').addClass('black');
                }else{
                    fgcolor = 'white';
                    $(this).removeClass('black').addClass('white');
                }
                i_now++;

                if(_this.fn.is_ok($(this),fgcolor)){
                   alert('game over!');
                }
            });
        },
        fn : {
            //fgcolor��ǰ������ɫ
            is_ok : function($fg,fgcolor){
                //�ɹ������������ж����£����ң�б��б���ĸ�����ֻҪ��һ��������4������ǰͬɫ����һ����Ϸ�ɹ�����
                var a_query = [{z:'up',f:'down'},{z:'left',f:'right'},{z:'leftup',f:'rightdown'},{z:'rightup',f:'leftdown'}];
                for(var i = 0,j = a_query.length;i < j;i++){
                    i_success = 0;
                    this.direct_num($fg,fgcolor,a_query[i].z);
                    this.direct_num($fg,fgcolor,a_query[i].f);
                    if(i_success==4){
                        return true;
                    }
                }
                return false;
            },
            direct_num : function($fg,fgcolor,direct){
                var $prev_fg =  this.get_prev_fg($fg,direct);
                if($prev_fg && $prev_fg.length==1 && $prev_fg.hasClass(fgcolor)){
                    i_success++;
                    this.direct_num($prev_fg,fgcolor,direct);
                }
            },
            get_prev_fg : function($fg,direct){
                var rowno = $fg.attr('rowno');
                var colno = $fg.attr('colno');
                if(direct=='up'){
                    return $('.fg'+(rowno-1)+colno);
                }else if(direct=='down'){
                    return $('.fg'+(rowno-0+1)+colno);
                }else if(direct=='left'){
                    return $('.fg'+rowno+(colno-1));
                }else if(direct=='right'){
                    return $('.fg'+rowno+(colno-0+1));
                }else if(direct=='leftup'){
                    return $('.fg'+(rowno-1)+(colno-1));
                }else if(direct=='rightdown'){
                    return $('.fg'+(rowno-0+1)+(colno-0+1));
                }else if(direct=='leftdown'){
                    return $('.fg'+(rowno-0+1)+(colno-1));
                }else{//���һ����rightup
                    return $('.fg'+(rowno-1)+(colno-0+1));
                }
            }
        }
    };
    window.wzq = window.wzq || {};
    wzq.init = function(){
        wuziqi.init();
        wuziqi.bind();
    };
});