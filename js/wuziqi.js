$().ready(function(){

    var i_now = 0;//����2����Ϊ��ʱ���壬����Ϊ����
    var wuziqi = {
        init : function(){
            //  ��������������̨
            i_now = 0;
            var rows = $('.rows').val() || 4;
            var cols = $('.cols').val() || 4;
            //$('.stones').width(40*rows);
            var html = "";
            for(var i = 0;i < rows;i++){
                for(var j = 0;j < cols;j++){
                    html += '<div class="stone" rowno="'+i+'" colno="'+j+'"></div>'
                }
            }
            $('.stones').empty().width(40*cols).append(html);
            /*var $stone = $('.stone');
            for(var i = rows * cols-1;i > 0;i--){
                var $item = $stone.eq(i);
                var left = $item.position().left;
                var top = $item.position().top;
                console.log(left+'---'+top);
                $item.css({
                    position:'absolute',
                    left:left,
                    top:top
                });
            }*/
            var fg_html = '';
            var fg_rows = rows - 0 + 1;
            var fg_cols = cols - 0 + 1;
            for(var i = 0;i < fg_rows;i++){
                for(var j = 0;j < fg_cols;j++){
                    fg_html += '<div class="fg" rowno="'+i+'" colno="'+j+'"></div>';
                }
            }
            $('.fgs').empty().width(40*fg_cols).append(fg_html);
        },
        bind : function(){
            $('.fgs').delegate('.fg','click',function(){
                //��������ж��Ƿ��Ѿ��������ˣ����û�п������ɣ�������������ɡ��������ߣ��ڰ����α�ɫ
                if($(this).hasClass('black')||$(this).hasClass('white')){
                    return;
                }
                if(i_now%2==0){
                    $(this).removeClass('white').addClass('black');
                }else{
                    $(this).removeClass('black').addClass('white');
                }
                i_now++;

                
            });
        }
    };
    window.wzq = window.wzq || {};
    wzq.init = function(){
        wuziqi.init();
        wuziqi.bind();
    };


});