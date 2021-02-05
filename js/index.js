(function () {
    let playBtn = document.querySelector('#section1 .play'),
        dialog = document.querySelector('.dialog'),
        shadow = document.querySelector('.shadow'),
        colseBtn = document.querySelector('.colseBtn'),
        movie = document.querySelector('.movie'),
        movieInner = movie.innerHTML;

    playBtn.onclick = function () {
        dialog.style.display = shadow.style.display = 'block';
        movie.innerHTML = movieInner;
    }
    colseBtn.onclick = function () {
        dialog.style.display = shadow.style.display = 'none';
        movie.innerHTML = '';
    };
})();
//选项卡
(function () {
    function tab(btn, content) {
        let btns = btn.children;
        let cons = content.children;

        for (let i = 0; i < btns.length; i++) {
            btns[i].index = i;
            btns[i].onclick = function () {
                //让别的元素身上的active去掉，让别的元素对应的内容隐藏 
                for (let i = 0; i < btns.length; i++) {
                    btns[i].classList.remove('active');
                    cons[i].classList.remove('active');
                }
                //让自己身上加上active，让自己对应的内容显示
                this.classList.add('active');
                cons[this.index].classList.add('active');
            }
        }
    }
    let tabBtns = document.querySelectorAll('.tabBtn');
    let tabContents = document.querySelectorAll('.tabContent');

    for (let i = 0; i < tabBtns.length; i++) {
        tab(tabBtns[i], tabContents[i])
    }
})();
//轮播图
(function () {
    function carousel(id) {
        let wrap = document.querySelector(id + ' .wrap'),
            ul = document.querySelector(id + ' ul'),
            prev = document.querySelector(id + ' .prev'),
            next = document.querySelector(id + ' .next'),
            circle = document.querySelectorAll(id + ' .circle span'),
            boxWidth = wrap.offsetWidth, //一个轮播图的宽
            timer = null;
        canclick = true;
        //初始化
        ul.innerHTML += ul.innerHTML;
        let len = ul.children.length;
        ul.style.width = len * boxWidth + 'px';

        let cn = 0;
        let ln = 0;
        next.onclick = function () {
            if (!canclick) {
                //这个条件成立说明 现在不能点击
                return;
            }
            cn++;
            move();
        }
        prev.onclick = function () {
            if (cn == 0) {
                cn = len / 2;
                ul.style.transition = null;
                ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)'
            }
            setTimeout(function () {
                //transition的值会被mover里给覆盖了，所以我会让他俩不是同时执行，借助定时器
                cn--;
                move();
            }, 16);
        }
        for (let i = 0; i < circle.length; i++) {
            circle[i].index = i;
            circle[i].onclick = function () {
                if (!canclick) {
                    //这个条件成立说明 现在不能点击
                    return;
                }
                cn = this.index;
                move();
            }
        }
        function move() {
            canclick = false; //运动正在进行，不让有你点击
            ul.style.transition = '.3s';
            ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)'


            let hn = cn % (len / 2);
            circle[ln].className = '';
            circle[hn].className = 'active';
            ln = hn;

            ul.addEventListener('transitionend', function () {
                if (cn == len / 2) { //当第四个索引对应的图片运动完了，要把ul拉回原点，才能做到无缝滚动
                    ul.style.transition = null;
                    cn = 0;
                    ul.style.transform = 'translateX(' + -cn * boxWidth + 'px)'
                }
                canclick = true;
            });

        }
        timer = setInterval(next.onclick, 3000);
    }
    carousel('#section3');
    carousel('#section5');
})();
/*新增场景*/
(function () {
    let section4 = document.querySelector('#section4');
    let lis = document.querySelectorAll('#section4 li');
    let bottom = document.querySelector('#section4 .bottom');
    let ln = 0;
    for (let i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            lis[ln].classList.remove('active');
            this.classList.add('active');
            section4.style.background = 'url(images/section4_big_0' + (this.index + 1) + '.png) no-repeat center top'
            bottom.style.background = 'url(images/section4_big_0' + (this.index + 1) + '_bottom.png) no-repeat center top'
            ln = this.index;
        }
    }
})();
/*手风琴*/
(function () {
    let lis = document.querySelectorAll('#section7 li');
    let ln = 0;
    for (let i = 0; i < lis.length; i++) {
        lis[i].index = i;
        lis[i].onclick = function () {
            lis[ln].classList.remove('active');
            this.classList.add('active');
            ln = this.index;
        }
    }
})();

/*游戏特色轮播图*/
(function () {
    let ul = document.querySelector('#section8 ul'),
        lis = ul.children,
        prev = document.querySelector('#section8 .prev'),
        next = document.querySelector('#section8 .next'),
        spans = document.querySelectorAll('#section8 .circle span'),
        cn = 0,
        ln = 0;

    next.onclick = function () {
        cn++;
        cn %= lis.length;
        ul.appendChild(lis[0]);
        spans[ln].className = '';
        spans[cn].className = 'active';
        ln = cn;
    }
    prev.onclick = function(){
        cn--;
        if(cn < 0){
            cn = lis.length-1;
        }
        //把最后一个元素插入到第0个元素的前面
        ul.insertBefore(lis[lis.length - 1],lis[0]);

        lis[0].style.opacity = 0;
        setTimeout(function(){
            lis[0].style.opacity = '';
        })
        spans[ln].className = '';
        spans[cn].className = 'active';
        ln = cn;
    }
})()
