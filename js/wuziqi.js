$().ready(function(){

    var i_now = 0;//除以2余数为零时黑棋，否则为白旗
    var i_success = 0;//胜利条件
    var wuziqi = {
        init : function(){
            //  根据行列生成舞台
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
                    fg_html += '<div class="fg fg'+i+j+'" rowno="'+i+'" colno="'+j+'"></div>';
                }
            }
            $('.fgs').empty().width(40*fg_cols).append(fg_html);
            $('.container').width(40*fg_cols);
        },
        bind : function(){
            var _this = this;
            $('.fgs').delegate('.fg','click',function(){
                //点击首先判断是否已经有棋子了，如果没有可以生成，如果有则不能生成。黑棋先走，黑白依次变色
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
                   alert('成功，游戏结束！');
                }
            });
        },
        fn : {
            //fgcolor当前棋子颜色
            is_ok : function($fg,fgcolor){
                //成功条件，依次判断上下，左右，斜上斜下四个方向，只要有一个方向有4个跟当前同色的连一起，游戏
                //成功
                //console.log('begin----');
                i_success = 0;
                this.direct_num($fg,fgcolor,'up');
                this.direct_num($fg,fgcolor,'down');
                console.log(i_success+'------a');
                if(i_success==4){//五子棋条件
                    console.log('成功，游戏结束');
                    return true;
                }

                i_success = 0;
                this.direct_num($fg,fgcolor,'left');
                this.direct_num($fg,fgcolor,'right');
                console.log(i_success+'------b');
                if(i_success==4){//五子棋条件
                    console.log('成功，游戏结束');
                    return true;
                }

                i_success = 0;
                this.direct_num($fg,fgcolor,'leftup');
                this.direct_num($fg,fgcolor,'rightdown');
                console.log(i_success+'------b');
                if(i_success==4){//五子棋条件
                    console.log('成功，游戏结束');
                    return true;
                }

                i_success = 0;
                this.direct_num($fg,fgcolor,'leftdown');
                this.direct_num($fg,fgcolor,'rightup');
                console.log(i_success+'------b');
                if(i_success==4){//五子棋条件
                    console.log('成功，游戏结束');
                    return true;
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
                }else{//最后一个是rightup
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