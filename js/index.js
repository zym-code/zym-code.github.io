window.onload = function () {
    getSwiperList()//轮播图
    // logo下拉框
    let navItems = document.getElementsByClassName('nav-item')
    let itemList = document.getElementsByClassName('itemList-outside')[0]
	let buyCarList = document.getElementsByClassName('buyCar-list')[0]
    let  onnavItem = document.getElementsByClassName('onnav-item')
	let navListUl = document.getElementsByClassName('nav-listU')[0]
	let inner = document.getElementsByClassName('inner')
	
		for(let i = 0;i<navItems.length;i++){
			 navItems[i].addEventListener('mousemove', listShow, false)
			function listShow(){
				 let roundIndex = parseInt(this.getAttribute("data-index"))
				 if(roundIndex == 0){
					 	for(let i = 0;i<inner.length;i++){
					inner[i].innerHTML =`  <img src="./img/itemList/index0.jpg"> 
                                         <div class="title">小米11</div> 
                                         <p class="price">3999元起</p> `
				}
				
				 }else if(roundIndex == 1){
					 	for(let i = 0;i<inner.length;i++){
					inner[i].innerHTML =`  <img src="./img/itemList/index1.jpg"> 
                                         <div class="title">Redmi K30S 至尊纪念版</div> 
                                         <p class="price">2599元起</p> `
				}
				
				 }else if(roundIndex == 2){
					 		 	for(let i = 0;i<inner.length;i++){
					inner[i].innerHTML =`  <img src="./img/itemList/index2.jpg"> 
                                         <div class="title">小米透明电视</div> 
                                         <p class="price">49999元</p> `
				}
				 }else if(roundIndex == 3){
					 		 	for(let i = 0;i<inner.length;i++){
					inner[i].innerHTML =`  <img src="./img/itemList/index3.jpg"> 
                                         <div class="title">Redmi G 游戏本</div> 
                                         <p class="price">85299元起</p> `
				}
				 }else if(roundIndex == 4){
					 		 	for(let i = 0;i<inner.length;i++){
					inner[i].innerHTML =`  <img src="./img/itemList/index4.jpg"> 
                                         <div class="title">Redmi全自动波轮洗衣机1A</div> 
                                         <p class="price">799元起</p> `
				}
				 }else if(roundIndex == 5){
					 		 	for(let i = 0;i<inner.length;i++){
					inner[i].innerHTML =`  <img src="./img/itemList/index5.jpg"> 
                                         <div class="title">小米路由器AX6000</div> 
                                         <p class="price">599元起</p> `
				}
				 }else if(roundIndex == 6){
					 		 	for(let i = 0;i<inner.length;i++){
					inner[i].innerHTML =`  <img src="./img/itemList/index6.jpg"> 
                                         <div class="title">小米小爱触屏音箱</div> 
                                         <p class="price">199元起</p> `
				}
				 }
			}
		}
	
		

    // 搜索框
    const searchInput = document.getElementById('searchInput')
    searchInput.addEventListener('focus', showKeyword, false)
    searchInput.addEventListener('blur', hideKeyword, false)
    let inputIndex = 0
    let infoGoods = ['日用百货', '个护', '耳机', '小米10', '笔记本', '会员限定卫衣']

    function showKeyword() {
        document.getElementById('goodsList').style.display = 'block'
    }
    function hideKeyword() {
        document.getElementById('goodsList').style.display = 'none'
    }


    // placeholder="日用百货"
    searchInput.setAttribute("placeholder", infoGoods[inputIndex]);
    setInterval(function () {
        inputIndex++
        inputInfo()
    }, 4000)
    function inputInfo() {
        if (inputIndex > infoGoods.length - 1) {
            inputIndex = 0
        }
	
        for (let i = 0; i < infoGoods.length; i++) {
            searchInput.setAttribute("placeholder", infoGoods[inputIndex]);
        }
    }
	for(let i = 0;i<navItems.length;i++){
	navItems[i].onmousemove= function(){
	searchInput.stop

	}
		}
		// 获取搜索框下面推荐本地json
		getSuggest()
		function getSuggest(){
			ajax("get","./json/suggest.json",function(res){
				if(res.code == 0){
					const goodsList = document.getElementById('goodsList')
					let data = res.data
					let str = ''
					for(let i = 0;i<data.length;i++){
						str += `<a href="javascript:;">${data[i].suggestName}</a>`
					}
					goodsList.innerHTML = str
				}
			},true)
		}
		
		   // 轮播图左侧
		   let showWrap = document.getElementsByClassName('show-wrap')
		   
			for(let i = 0;i<showWrap.length;i++){
				let showWrapUl = showWrap[i].getElementsByClassName('show-wrapUl')
				showWrap[i].style.width = showWrapUl.length*248 + 'px'
			}
		   
    // 轮播图
 
    // 获取轮播图列表
    function getSwiperList(){
        ajax("get","./json/lunbo.json",function(res){
            if(res.code == 0){
                const imgList = document.getElementsByClassName('img-list')
                let data = res.data
                let str = ''
                for(let i = 0;i<data.length;i++){
                    str = ` <img src="${data[i].swiper_img}">`
                    imgList[i].innerHTML = str
                }
               
                imgOption()
            }
         
        },true)
    }
  
    function imgOption() {
        let img = document.getElementById('img')
        let imgList = img.getElementsByClassName('img-list')
        let left = document.getElementById('left')
        let right = document.getElementById('right')
        let timer = null
        let index = 0

        let round = document.getElementById('round')
        let roundLi = document.getElementsByClassName('roundLi')

        for (let i = 0; i < imgList.length; i++) {
            if (index == i) {
                imgList[i].style.opacity = 1
            } else {
                imgList[i].style.opacity = 0
            }
        }
        left.onclick = function () {
            index--
            changeImg()
        }
        right.onclick = function () {
            index++
            changeImg()
        }

        img.addEventListener("mouseover", function () {
            clearInterval(timer)
        }, false)

        img.addEventListener("mouseout", function () {
            autoChange()
        }, false)

        function changeImg() {
            if (index < 0) {
                index = imgList.length - 1
            } else {
                if (index > imgList.length - 1) {
                    index = 0
                }
            }
            for (let i = 0; i < imgList.length; i++) {
                imgList[i].style.opacity = 0
            }
            imgList[index].style.opacity = 1
            changeOn()
        }

        function changeOn() {
            for (let i = 0; i < roundLi.length; i++) {
                roundLi[i].classList.remove('on')
            }
            roundLi[index].classList.add('on')
        }

        for (let i = 0; i < roundLi.length; i++) {
            roundLi[i].onclick = function () {
                let roundIndex = parseInt(this.getAttribute("data-index"))
                index = roundIndex
                changeImg()
            }
        }


        autoChange()
        function autoChange() {
            timer = setInterval(function () {
                index++
                changeImg()
            }, 4000)
        }
    }
    

    // 秒杀倒计时
    let ms_time = 7200
    let ms_timer = setInterval(function () {
        if (ms_time < 0) {
            clearInterval(ms_timer)
        } else {
            claTime(ms_time)
            ms_time--
        }
    }, 1000)
    function claTime(time) {
        let hour = Math.floor(time / 60 / 60)
        let minutes = Math.floor(time / 60 % 60)
        let seconds = Math.floor(time % 60)
        hour = formatTime(hour)
        minutes = formatTime(minutes)
        seconds = formatTime(seconds)
        document.getElementById('time-hour').innerHTML = hour
        document.getElementById('time-minute').innerHTML = minutes
        document.getElementById('time-second').innerHTML = seconds
    }
    function formatTime(t) {
        if (t < 10) {
            t = '0' + t
        }
        return t
    }

    // 秒杀区轮播图
    const miaoshaUl = document.getElementsByClassName('miaosha-swiperUl')[0]
    const arrowLeft = document.getElementById('arrowLeft')
    const arrowRight = document.getElementById('arrowRight')
    let pageLength = document.getElementsByClassName('pageList').length

    const PAGE_WIDTH = 992
    const TIME = 900 //翻页的持续时间
    const ITEM_TIME = 20
    // var flagDistance = parseInt(getStyle(miaoshaUl, "left"))
    autoChange()
    function autoChange() {
        let index = 0
        let speed = 0
        timer = setInterval(function () {
            speed =37
            index++

            if (index > 2) {
                index = 0
                speed = 85
            }

            move(miaoshaUl, "left", -992 * index, speed , function () {
						 let flagDistance =  parseInt(getStyle(miaoshaUl,"left"))
						 autoArrow(flagDistance)
                })
				
        }, 5000)

    }
    arrowRight.onclick = function () {
        clearInterval(timer)
        let flagDistance =  parseInt(getStyle(miaoshaUl,"left"))
        if (flagDistance == 0) {
			arrowLeft.style.color = "#b0b0b0"
					arrowLeft.style.cursor = "pointer"
            move(miaoshaUl, "left", -992, 50, function () {
                flagDistance = parseInt(getStyle(miaoshaUl, "left"))

            })
        }
        if (flagDistance = parseInt(getStyle(miaoshaUl, "left")) == -992) {
				arrowRight.style.color = "#e0e0e0"
				arrowRight.style.cursor = "default"
            move(miaoshaUl, "left", -992 * 2, 50, function () {
                flagDistance = parseInt(getStyle(miaoshaUl, "left"))

            })
        }
    }
    arrowLeft.onclick = function () {
        clearInterval(timer)
        let flagDistance =  parseInt(getStyle(miaoshaUl,"left"))
        if (flagDistance == -992) {
					arrowLeft.style.color = "#e0e0e0"
							arrowLeft.style.cursor = "default"
            move(miaoshaUl, "left", 0, 50, function () {
                flagDistance = parseInt(getStyle(miaoshaUl, "left"))
				
            })

        }
		
        // flag =  parseInt(getStyle(miaoshaUl,"left"))

        if (flagDistance == -1984) {
			arrowRight.style.color = "#b0b0b0"
			arrowRight.style.cursor = "pointer"
            move(miaoshaUl, "left", -992, 50, function () {
                flagDistance = parseInt(getStyle(miaoshaUl, "left"))

            })
        }
    }
	function autoArrow(flagDistance){
		if(flagDistance == -1984){
				arrowRight.style.color = "#e0e0e0"
				arrowRight.style.cursor = "default"
		}else if(flagDistance != 0){
				arrowLeft.style.color = "#b0b0b0"
				arrowLeft.style.cursor = "pointer"
			
		}else if(flagDistance == 0){
		arrowRight.style.color = "#b0b0b0"
			arrowLeft.style.color = "#e0e0e0"
				arrowRight.style.cursor = "pointer"
					arrowLeft.style.cursor = "default"
		}
		
	}
    function getStyle(obj, name) {
        if (getComputedStyle) {
            return getComputedStyle(obj, null)[name]
        } else {
            return obj.currentStyle[name]
        }
    }

    function move(obj, attr, targ, speed, fun) {
        clearInterval(obj.timer)

        // var obj = document.getElementById("obj");

        var current = parseInt(getStyle(obj, attr))
        if (current > targ) {
            speed = -speed
        }
        obj.timer = setInterval(function () {
            var oldValue = parseInt(getStyle(obj, attr));
            var newValue = oldValue + speed
            if (speed < 0 && newValue < targ || speed > 0 && newValue > targ) {
                newValue = targ
            }

            obj.style[attr] = newValue + "px"

            if (newValue == targ) {
                clearInterval(obj.timer)
                fun && fun()
            }
        }, 30)
    }
	
	// 加载更多
	const lodingMore = document.getElementsByClassName('loding-more')[0]
	lodingMore.onclick = function(){
		let miaoshaInside = document.getElementsByClassName('miaosha-inside')[0]
		const divNode1 = document.createElement('div')
		const divNode2 = document.createElement('div')
		let divNode = miaoshaInside.childNodes
		let More = document.getElementById('More')
		  for(i = 0; i < divNode.length; i++) {
            if(divNode[i].nodeName == "#text" && /\s/.test(divNode[i].nodeValue)) {
                miaoshaInside.removeChild(divNode[i]);
            }
        }
			
			if(divNode.length == 13){
				More.removeChild(lodingMore)
			}
		divNode1.setAttribute("class","home-box")
		divNode2.setAttribute("class","guanggao")
		divNode1.innerHTML = `<div class="box-hd">
				<h2 class="title">家电</h2>
				<div class="box-more">
				<a href="javascript:;">查看全部
				  <i class="fas fa-angle-right"></i>
				 </a>
				</div>
				</div>
			<div class="box-bd clearfix">
			<div>
			<div class="box-left">
			  <ul class="box-leftUl">					
					<li class="both" >
                        <a href="javascript:;">
                             <img src="./img/家电01.jpg">
                        </a>
                    </li>
					    <li class="both" >
                        <a href="javascript:;">
                             <img src="./img/家电02.jpg">
                        </a>
                    </li>
					</ul>
			</div>
			<div class="box-right">
			<ul class="box-rightUl">
			 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
						 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
						 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
						 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
						 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
						 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
						 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
						 <li class="box-rightLi">
                            <a href="javascript:;">
                                <div class="boxRightMain">
                                    <div class="boxRight-img">
                                        <img src="./img/家电03.jpg">
                                    </div>
                                    <h3 class="title">小米全面屏电视65英寸 E65X</h3>
                                    <p class="desc">全面屏设计</p>
                                    <p class="price">
                                        <span>2899</span>元起
                                        <del>3099元</del>
                                    </p>
                                </div>
                            </a>
                        </li>
			</ul>
			</div>
			</div>
			</div>`
			divNode2.innerHTML = ` <a href="javascript:;">
				   <img src="./img/家电下.jpg">
				 </a>`
			miaoshaInside.appendChild(divNode1)
			miaoshaInside.appendChild(divNode2)
			
	}


  }
	window.onscroll = function(){
		scrollShow()
			// 去顶部
	
	function scrollShow(){
		let top = document.documentElement.scrollTop || document.body.scrollTop
		if(top > 400){
			document.getElementsByClassName('totop')[0].style.visibility = 'visible'
		}else{
				document.getElementsByClassName('totop')[0].style.visibility = 'hidden'
		}
	}
	
	
	}
	function gotop(){
		const topTimer= setInterval(function(){
			let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
			let speed = Math.floor(-scrollTop/8)
			if(scrollTop == 0){
				clearInterval(topTimer)
			}
			 document.documentElement.scrollTop = document.body.scrollTop = scrollTop + speed
		},20)
		
	}

