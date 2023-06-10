// require('jquery')
$(function () {


    // let arr1={mute:false,translate:'bd',group:0,id:0}
    // let arr2=[{groupname:"groupname",group:0},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:0,id:1},{word:'color',bd:'',wyy:'',group:0,id:2},{word:'block',bd:'',wyy:'',group:0,id:3},{word:'input',bd:'',wyy:'',group:0,id:4},{word:'class',bd:'',wyy:'',group:0,id:5}]
    // let arr3=[{groupname:"groupname",group:1},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:1,id:1},{word:'color',bd:'',wyy:'',group:1,id:2}]
    // let arr4=[{groupname:"groupname",group:2},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:2,id:1},{word:'color',bd:'',wyy:'',group:2,id:2}]
    // let arr5=[{groupname:"groupname",group:3},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:3,id:1},{word:'color',bd:'',wyy:'',group:3,id:2}]
    // let arr6=[{groupname:"groupname",group:4},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:4,id:1},{word:'color',bd:'',wyy:'',group:4,id:2}]
    // let arr7=[{groupname:"groupname",group:5},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:5,id:1},{word:'color',bd:'',wyy:'',group:5,id:2}]
    // let arr8=[{groupname:"groupname",group:6},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:6,id:1},{word:'color',bd:'',wyy:'',group:6,id:2}]
    // let arr9=[{groupname:"groupname",group:7},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:7,id:1},{word:'color',bd:'',wyy:'',group:7,id:2}]
    // let arr10=[{groupname:"groupname",group:8},{word:'blue',bd:'',wyy:'',group:0,id:0},{word:'red',bd:'',wyy:'',group:8,id:1},{word:'color',bd:'',wyy:'',group:8,id:2}]
    function Modle() {
        let arr1, arr2 = [], arr3 = [], arr4 = [], arr5 = [],
            arr6 = [], arr7 = [], arr8 = [], arr9 = [], arr10 = [];
        let array = [arr1, arr2, arr3, arr4, arr5, arr6, arr7, arr8, arr9, arr10]
        class Word {
            constructor(word, group, id, iswrite) {
                this.word = word
                this.bd = ''
                this.wyy = ''
                this.group = group
                this.id = id
                this.iswrite = iswrite
            }
        }
        class Memory {
            constructor(mute, translate, group, id) {
                this.mute = mute
                this.translate = translate
                this.group = group
                this.id = id
            }
        }
        class Group {
            constructor(groupname, group) {
                this.groupname = groupname
                this.group = group
            }
        }
        let word_arr = ['待添加']
        // new Word('blue',0,0,false)
        //array创建模板
        for (let i = 0; i < array.length; i++) {
            if (i == 0) {
                array[i] = new Memory(false, 'bd', 0, 0)
                continue
            }
            for (let j = 0; j < (word_arr.length + 1); j++) {
                if (j == 0) {
                    array[i][j] = new Group(`groupname${i}`, i - 1)
                    continue
                }
                array[i][j] = new Word(word_arr[j - 1], i - 1, j - 1, false)
            }
        }
        return array
    }
    // 
    let array = Modle()
    console.log(array);
    if (localStorage.getItem('array')) {
        array = JSON.parse(localStorage.getItem('array'))
    }
    group(array[1])
    function group(arr) {

        let index = 1                    //单词数
        let end = arr[index].word.split('').length   //当前单词长度
        let start = 0                           //当前单词字母
        let en = true                           //声音使能 
        let entozh_flag = 'bd'                     //翻译选项1百度2有道 
        let target_delete = {}
        //动态生成组
        function group_name() {
            for (let i = 1; i < array.length; i++) {
                if (array[i][0].group == array[0].group) {
                    $('.group em').html(`${array[i][0].groupname}`)
                    // console.log(00);
                }
                let li = $('<li></li>')
                console.log(array[i][0].groupname);
                li.html(`${array[i][0].groupname}`)
                li.data('group', array[i][0].group)
                $('.group .two').append(li)
            }
        }
        group_name()
        //判断本地是否有翻译标志
        if (localStorage.getItem('array')) {
            //记忆的当前单词
            function dqword() {
                index = array[0].id + 1
                arr = array[array[0].group + 1]
                end = arr[index].word.split('').length
            }
            dqword()
            //翻译选择
            function zh() {
                if (array[0].translate == 'bd') {
                    entozh_flag == 'bd'
                    $('.active_entozh').removeClass('active_entozh')
                    $('.entozh ul li').eq(0).addClass('active_entozh')
                } else {
                    entozh_flag = 'wyy'
                    $('.active_entozh').removeClass('active_entozh')
                    $('.entozh ul li').eq(1).addClass('active_entozh')
                }
                if (entozh_flag == 'bd') {
                    ajax_entozh_bd(arr[index].word)
                } else {
                    ajax_entozh_wyy(arr[index].word)
                }
            }
            zh()
            //是否静音
            function mtue() {
                if (array[0].mute == true) {
                    en = true
                } else {
                    en = false
                }
                if (en == true) {
                    $('.body_input .disable').toggleClass('icon-sound-Mute')
                    $('.right')[0].muted = true
                    $('.wrong')[0].muted = true
                }
                else {
                    $('.right')[0].muted = false
                    $('.wrong')[0].muted = false
                }
            }
            mtue()
            // arr=array[arr[0].group+1]
            console.log(arr);
        }
        //渲染函数
        function render(word) {

            if (entozh_flag == 'bd') {
                ajax_entozh_bd(word)
            } else {
                ajax_entozh_wyy(word)
            }
            word = word.split('')
            // console.log(word);
            $('.body_input .box').html('')
            $.each(word, function (i) {
                let span = $('<span></span>').addClass('input').html(word[i])
                $('.body_input .box').append(span)
            })
        }
        render(arr[index].word)
        function keyup(e) {
            // 重新赋值temp对象防止过度进行ajax请求
            if (localStorage.getItem('array')) {
                array = JSON.parse(localStorage.getItem('array'))
            }
            if (e.key == 'Shift') return
            if (!/^[a-zA-Z]$/.exec(e.key)) return
            if (e.key === arr[index].word.split('')[start]) {
                $('.body_input .input').eq(start).addClass('active')
                start++
                $('.right')[0].currentTime = 0
                $('.right')[0].play()
                if (start == end) {
                    arr[index].iswrite = true
                    index++
                    if (index == arr.length) {
                        index = arr.length - 1
                        start = 0
                        end = arr[index].word.split('').length
                        render(arr[index].word)
                        $(document.documentElement).unbind('keyup')
                        $('.hint').stop().slideDown()
                        return
                    } else {
                        start = 0
                        end = arr[index].word.split('').length
                        render(arr[index].word)
                    }
                    array[0].id = arr[index].id
                    array[0].group = arr[index].group
                    console.log(arr);
                    array[arr[0].group + 1][index].iswrite = arr[index].iswrite
                    set(array)
                    //   if(entozh_flag=='bd')
                    //   {
                    //     ajax_entozh_bd(arr[index].word)
                    //   }else{
                    //     ajax_entozh_wyy(arr[index].word)
                    //   }
                }
            } else {
                $('.wrong')[0].currentTime = 0
                $('.wrong')[0].play()
                start = 0
                render(arr[index].word)
            }
            console.log(start, end, index);
        }
        //键盘输入事件
        $(document.documentElement).on('keyup', keyup)
        // 设置声音
        $('.disable').on('click', function () {
            $(this).toggleClass('icon-sound-Mute')
            if (en == true) {
                en = false
                $('.right')[0].muted = false
                $('.wrong')[0].muted = false
                array[0].mute = en
                set(array)
            }
            else {
                en = true
                $('.right')[0].muted = true
                $('.wrong')[0].muted = true
                array[0].mute = en
                set(array)
            }
        })
        //选择目标单词 
        $('.displayword tbody').on('click', function (e) {
            if ($(e.target).data('istr') == "true") {
                return
            }
            // console.log(e.target);
            index = $(e.target).data('id') + 1
            array[0].id = arr[index].id
            array[0].group = arr[index].group
            set(array)
            render(arr[index].word)
            word_rend()
            end = arr[index].word.split('').length
            start = 0
        })
        //设置点击美式发音事件
        $('.audio_word_e').on('click', function () {
            // e.preventDefault()
            $('audio.word').attr('src', `http://dict.youdao.com/dictvoice?type=0&audio=${arr[index].word}`)
        })
        //设置点击英式发音事件
        $('.audio_word_a').on('click', function () {
            // e.preventDefault()
            $('audio.word').attr('src', `http://dict.youdao.com/dictvoice?type=1&audio=${arr[index].word}`)
        })
        //设置翻译选项按钮鼠标按钮进入事件
        $('.entozh').on('mouseenter', function () {
            $('.entozh ul').stop().slideDown()
        })
        $('.entozh').on('mouseleave', function () {
            $('.entozh ul').stop().slideUp()
        })
        //设置百度翻译
        $('.entozh ul li').eq(0).on('click', function () {
            array[0].translate = 'bd';
            entozh_flag = 'bd'
            $('.active_entozh').removeClass('active_entozh')
            $(this).addClass('active_entozh')
            ajax_entozh_bd(arr[index].word)
            set(array)
        })
        //设置有道翻译
        $('.entozh ul li').eq(1).on('click', function () {
            array[0].translate = 'wyy';
            entozh_flag = 'wyy'
            $('.active_entozh').removeClass('active_entozh')
            $(this).addClass('active_entozh')
            ajax_entozh_wyy(arr[index].word)
            set(array)
        })
        // 发起百度翻译请求
        function ajax_entozh_bd(word) {
            if (arr[index].word == '待添加') {
                $('.zh span').html(arr[index].bd)
                return
            }
            if (arr[index].bd !== '' && arr[index].bd != '待添加') {
                $('.zh span').html(arr[index].bd)
                return
            }
            console.log(22);
            var appid = '20230304001586140';
            var key = 'mSO32J2kvZnLYoUS9jZw';
            var salt = (new Date).getTime();
            var query = word;
            var from = 'en';
            var to = 'zh';
            var str1 = appid + query + salt + key;
            var sign = MD5(str1);
            $.ajax({
                url: 'https://api.fanyi.baidu.com/api/trans/vip/translate',
                type: 'get',
                dataType: 'jsonp',
                data: {
                    q: query,
                    appid: appid,
                    salt: salt,
                    from: from,
                    to: to,
                    sign: sign
                },
                success: function (data) {
                    if (!data.error_code) {
                        $('.zh span').html(data.trans_result[0].dst)
                        arr[index].bd = data.trans_result[0].dst
                        array[arr[0].group + 1] = arr
                        set(array)
                    }
                    console.log(data);
                }
            });
        }
        // 发起网易云翻译请求
        function ajax_entozh_wyy(word) {
            if (arr[index].word == '待添加') {
                $('.zh span').html(arr[index].wyy)
                return
            }
            if (arr[index].wyy != '' && arr[index].wyy != '这不是英语单词单词') {
                $('.zh span').html(arr[index].wyy)
                return
            }

            console.log(222);
            var appKey = '7832b475af84bda1';
            var key = 'fKqEZcPHzXCGD6CfdSqVW29ByQzZzOLt';//注意：暴露appSecret，有被盗用造成损失的风险
            var salt = (new Date).getTime();
            var curtime = Math.round(new Date().getTime() / 1000);
            var query = word;
            // 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
            var from = 'zh-CHS';
            var to = 'en';
            var str1 = appKey + truncate(query) + salt + curtime + key;
            var vocabId = '23DF370EA91940878FB1C94711110C14';

            var sign = CryptoJS.SHA256(str1).toString(CryptoJS.enc.Hex);
            $.ajax({
                url: 'https://openapi.youdao.com/api',
                type: 'post',
                dataType: 'jsonp',
                data: {
                    q: query,
                    appKey: appKey,
                    salt: salt,
                    from: from,
                    to: to,
                    sign: sign,
                    signType: "v3",
                    curtime: curtime,
                    vocabId: vocabId,
                },
                success: function (data) {
                    console.log(data);
                    if (!data.isWord) {
                        arr[index].wyy = '这不是英语单词单词'
                        $('.zh span').html('这不是英语单词单词')
                        array[arr[0].group + 1] = arr
                        set(array)
                    }
                    if (data.errorCode == 0 && data.basic) {

                        let adj, n, v
                        let str
                        adj = ''
                        n = ''
                        v = ''
                        if (data.basic.explains.length < 2) {
                            adj = data.basic.explains[0].split('；')
                            adj.splice(2, adj.length - 2)
                            str = adj.join()
                        } else if (data.basic.explains.length < 3) {
                            adj = data.basic.explains[0].split('；')
                            adj.splice(2, adj.length - 2)
                            n = data.basic.explains[1].split('；')
                            n.splice(2, n.length - 2)
                            str = adj.join() + '<br>' + n.join()
                        } else if (data.basic.explains.length < 4) {
                            adj = data.basic.explains[0].split('；')
                            adj.splice(2, adj.length - 2)
                            n = data.basic.explains[1].split('；')
                            n.splice(2, n.length - 2)
                            v = data.basic.explains[2].split('；')
                            v.splice(2, v.length - 2)
                            str = adj.join() + '<br>' + n.join() + '<br>' + v.join()
                        } else {
                            adj = data.basic.explains[0].split('；')
                            adj.splice(2, adj.length - 2)
                            n = data.basic.explains[1].split('；')
                            n.splice(2, n.length - 2)
                            v = data.basic.explains[2].split('；')
                            v.splice(2, v.length - 2)
                            str = adj.join() + '<br>' + n.join() + '<br>' + v.join()
                        }
                        $('.zh span').html(str)
                        arr[index].wyy = str
                        array[arr[0].group + 1] = arr
                        set(array)
                    }
                }
            });

            function truncate(q) {
                var len = q.length;
                if (len <= 20) return q;
                return q.substring(0, 10) + len + q.substring(len - 10, len);
            }
        }
        // 存储请求回的数据
        function set(word) {
            localStorage.setItem('array', JSON.stringify(word))
        }
        // 重新开始按钮
        $('.hint .one').on('click', function () {
            $(document.documentElement).on('keyup', keyup)
            index = 1
            array[0].id = arr[index].id
            array[0].group = arr[index].group
            set(array)
            end = arr[index].word.split('').length
            start = 0
            render(arr[index].word)
            $('.hint').stop().slideUp()
        })
        //选择处开始 
        $('.hint .two').on('click', function () {
            $('.hint').stop().slideUp()
            $('.add_word li').eq(0).trigger('click')
        })
        //检测是否合法
        $('.body_input .input_word input').on('input', function () {
            if ($(this).val() !== '') {
                if (!/^[a-zA-Z]{1,16}$/g.exec($('.body_input .input_word input').val())) {
                    $('.input_word em').stop().fadeIn()
                    return
                } else {
                    $('.input_word em').stop().fadeOut()
                }
            }
        })
        //单词鼠标进入事件
        $('.group').on('mouseenter', function () {
            $('.group .two').stop().slideDown()
            $('.group span').addClass('icon-arrow-down')
        })
        //单词鼠标离开事件
        $('.group').on('mouseleave', function () {
            $('.group .two').stop().slideUp()
            $('.group span').removeClass('icon-arrow-down')
            // $('.displayword').stop().slideUp()
        })
        //已有单词点击事件
        $('.add_word li').eq(0).on('click', function () {
            $(document.documentElement).unbind('keyup')
            $('.displayword').stop().slideDown()
            word_rend()
        })
        //已有单词关闭点击事件
        $('.displayword .close').on('click', function () {
            if ($(('.input_word:hidden')).length == 1) {
                $(document.documentElement).on('keyup', keyup)
            }
            $('.displayword').stop().slideUp()
        })
        //添加单词
        $('.add_word li').eq(1).on('click', function () {
            $('.input_word').stop().slideDown()
            $('.add_word  li').eq(0).trigger('click')
            $(document.documentElement).unbind('keyup')
        })
        function word_rend() {
            $('.displayword tbody').html('')

            for (let i = 0; i < arr.length / 100; i++) {
                let end = 0
                if (i * 100 < arr.length && (i + 1) * 100 >= arr.length) {
                    end = (arr.length - 1) % 100
                } else {
                    end = 100
                }
                // console.log(end);
                let tr = $('<tr></tr>')
                tr.data('istr', 'true')
                for (let j = 0; j <= end; j++) {
                    if (j == 0) {
                        let trtop = $('<tr></tr>')
                        trtop.data('istr', 'true')
                        trtop.html(`${(i) * 100}~${(1 + i) * 100}`)
                        $('.displayword tbody').append(trtop)
                        continue
                    }
                    // console.log(j);
                    let td = $(`<td></td>`)
                    td.html(`${j}.${arr[(i) * 100 + j].word}`)
                    td.data('group', arr[i * 100 + j].group)
                    td.data('id', arr[i * 100 + j].id)
                    if (arr[i * 100 + j].id == arr[index].id) {
                        td.addClass('dqactive')
                    } else if (arr[i * 100 + j].iswrite) {
                        td.addClass('active')
                    }
                    tr.append(td)
                }
                $('.displayword tbody').append(tr)
            }
        }
        //添加单词事件
        $('.body_input .input_word button').on('click', function () {
            //    console.log($('.body_input .input_word input').val());
            for (let i = 1; i < arr.length; i++) {
                if ($('.input_word .one').val() == arr[i].word) {
                    $('.input_word em').html('已存在该单词')
                    $('.input_word em').stop().fadeIn()
                    return
                } else {
                    $('.input_word em').stop().fadeOut()
                    $('.input_word em').html('请输入1~16位英文字母')
                }
            }
            if ($('.input_word .one').val() == '') return
            if (arr.length == 2 && arr[1].word == '待添加') {
                console.log(`${arr.length}`);
                arr[1].word = $('.input_word .one').val()
                end = arr[index].word.split('').length
                array[arr[0].group + 1] = arr
                set(array)
                $('.add_word li').eq(0).trigger('click')
                return render(arr[1].word)
            }
            arr.push({ word: $('.body_input .input_word input').val(), bd: '', wyy: '', group: arr[0].group, id: arr.length - 1 })
            array[arr[0].group + 1] = arr
            set(array)
            $('.add_word li').eq(0).trigger('click')
        })
        //关闭输入界面
        $('.input_word .close').on('click', function () {
            if ($('.displayword .close:hidden').length == 0) {
                $('.displayword .close').trigger('click')
            }
            $(document.documentElement).on('keyup', keyup)
            $('.input_word').stop().slideUp()
        })
        //设置组
        $('.group .two').on('click', function (e) {
            arr = array[$(e.target).data('group') + 1]
            array[0].group = $(e.target).data('group')
            array[0].id = 0
            index = 1
            end = arr[index].word.split('').length   //当前单词长度
            start = 0
            render(arr[index].word)
            set(array)
            word_rend()
            $('.group em').html(`${array[array[0].group + 1][0].groupname}`)
        })
        //显示删除列表
        $('.add_word li').eq(3).on('click', function () {
            $('.deleteword').stop().slideDown()
            $(document.documentElement).unbind('keyup')
            word_delete()
        })
        function word_delete() {
            $('.deleteword tbody').html('')
            for (let i = 0; i < arr.length / 100; i++) {
                let end = 0
                if (i * 100 < arr.length && (i + 1) * 100 >= arr.length) {
                    end = (arr.length - 1) % 100
                } else {
                    end = 100
                }
                // console.log(end);
                let tr = $('<tr></tr>')
                tr.data('istr', 'true')
                for (let j = 0; j <= end; j++) {
                    if (j == 0) {
                        let trtop = $('<tr></tr>')
                        trtop.data('istr', 'true')
                        trtop.html(`${(i) * 100}~${(1 + i) * 100}`)
                        $('.deleteword tbody').append(trtop)
                        continue
                    }
                    // console.log(j);
                    let td = $(`<td></td>`)
                    td.html(`${j}.${arr[(i) * 100 + j].word}`)
                    td.data('group', arr[i * 100 + j].group)
                    td.data('id', arr[i * 100 + j].id)
                    if (arr[i * 100 + j].id == arr[index].id) {
                        td.addClass('dqactive')
                    } else if (arr[i * 100 + j].iswrite) {
                        td.addClass('active')
                    }
                    tr.append(td)
                }
                $('.deleteword tbody').append(tr)
            }
        }
        //关闭删除界面
        $('.deleteword .close').on('click', function () {
            $(document.documentElement).on('keyup', keyup)
            $('.deleteword').stop().slideUp()
        })
        //删除单词事件
        $('.deleteword tbody').on('click', function (e) {
            if ($(e.target).data('istr') == "true") {
                return
            }
            if (arr[$(e.target).data('id') + 1].word == '待添加') {
                return
            } else {
                $('.tanchuang .one em').html(arr[$(e.target).data('id') + 1].word)
                $('.tanchuang').stop().fadeIn()
            }
            target_delete = $(e.target)
        })
        //删除单词弹窗按钮'是'
        $(' .tanchuang .one .btn1').on('click', function () {
            if (arr.length == 2) {
                arr[1].word = '待添加'
                arr[1].bd = ''
                arr[1].wyy = ''
            } else {

                arr.splice(target_delete.data('id') + 1, 1)
                if (index >= target_delete.data('id') + 1) {

                    index = index - 1
                    if (index == 0) {
                        index = 1
                    }
                    console.log(index);
                }
            }
            array[arr[0].group + 1] = arr
            set(array)
            console.log(index);
            render(arr[index].word)
            for (let i = 1; i < arr.length; i++) {
                arr[i].id = i - 1
            }
            word_delete()
            $('.tanchuang').stop().fadeOut()
        })
        //删除单词弹窗按钮'否'
        $(' .tanchuang .one .btn2').on('click', function () {
            $('.tanchuang').stop().fadeOut()
        })
        //添加组名
        $('.body_input .add_word li').eq(2).on('click', function () {
            $('.input_groupname').stop().slideDown()
            $(document.documentElement).unbind('keyup')
        })
        //关闭组名输入
        $('.input_groupname .close').on('click', function () {
            $('.input_groupname').stop().slideUp()
            $(document.documentElement).on('keyup', keyup)
        })
        //输入组名符合条件
        $('.input_groupname .one').on('input', function () {
            if ($(this).val() !== '') {
                if (!/^[a-zA-Z\u4e00-\u9fa5]{1,16}$/g.exec($(this).val())) {
                    $('.input_groupname em').stop().fadeIn()
                } else {
                    $('.input_groupname em').stop().fadeOut()
                }
            }
        })
        //输入组名添加事件
        $('.input_groupname button').on('click', function () {
            arr[0].groupname = $('.input_groupname .one').val()
            array[arr[0].group + 1] = arr
            set(array)
            $('.body_input .group .two').html('')
            group_name()
        })
    }
})