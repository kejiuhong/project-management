window.onload = function() {


    if (!document.getElementsByClassName) {
        document.getElementsByClassName = function (cls) {
            var ret = [];
            var els = document.getElementsByTagName('*');
            for (var i = 0, len = els.length; i < len; i++) {
                if (els[i].className === cls
                    || els[i].className.indexOf(cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls + ' ') >= 0
                    || els[i].className.indexOf(' ' + cls) >= 0) {
                    ret.push(els[i]);
                }
            }
            return ret;
        }
    }


    var table = document.getElementById('shopping');
    var tr = table.children[1].rows;
    var allChecked = document.getElementById('allcheck');
    var inputChecked = document.getElementsByClassName('checked');
    var number = document.getElementsByClassName('number');
    var selectedallDown = document.getElementById('selectedallDown');
    var selectedtotal = document.getElementById('selectedtotal');
    var accounttotal = document.getElementById('accounttotal');
    var foot = document.getElementById('foot');
    var selectedallDown = document.getElementById('selectedallDown');
    var veiwSelectedList = document.getElementById('veiwSelectedList');
    var veiwSelected = document.getElementById('veiw-selected');
    var arrow = document.getElementsByClassName('arrow');
    var selected = document.getElementById('selected');
    //console.log(selectedtotal);io





    //获得所勾选总数量，价格
    function getTotal() {
        var selectNum = 0;
        var priceAll = 0;
        var HTMLshow = '';
        for (var i = 0; i < tr.length; i++) {
            if (tr[i].getElementsByTagName('input')[0].checked) {
                var price = parseFloat(tr[i].cells[2].innerHTML);
                var count = parseInt(tr[i].getElementsByTagName('input')[1].value);
                var priceRow = parseFloat(price * count);
                selectNum += count;
                priceAll += priceRow;
                HTMLshow += '<div class="selectedImg"><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del-selected" index="' + i + '">取消选择</span></div>'

            } else {

                allChecked.checked = false;
                selectedallDown.checked = false;
            }
        }
        selectedtotal.innerHTML = selectNum;
        accounttotal.innerHTML = priceAll.toFixed(2);
        veiwSelectedList.innerHTML = HTMLshow;
        //console.log(selectedtotal);
        if(selectedtotal.innerHTML==0){
        	foot.className='foot';
        }
    }


    //获得每行总价格
    function getSubTotal(row) {
        var tds = row.cells;
        var counts = parseInt(row.getElementsByTagName('input')[1].value);
        var price = parseFloat(tds[2].innerHTML);
        var subtotal = parseFloat(price * counts);
        //console.log(counts);
        tds[4].innerHTML = subtotal.toFixed(2);
    }

    for (var i = 0; i < tr.length; i++) {

        tr[i].onclick = function(e) {
            var ev = e || window.e;
            //console.log(ev);
            var el = ev.srcElement;
            var symbolCl = el.className;
            var inputVal = this.getElementsByTagName('input')[1];
            var val = parseInt(inputVal.value);
            var reduce = this.getElementsByTagName('span')[1];
            //console.log(symbolCl);
            switch (symbolCl) {
                case 'add':
                    inputVal.value = val + 1;
                    reduce.innerHTML = '-';
                    getSubTotal(this);
                    break;
                case 'reduce':
                    if (val < 1) {
                        reduce.innerHTML = '';
                        inputVal.value = 1;

                    } else if (val > 1) {
                        inputVal.value = val - 1;
                        //reduce.innerHTML='-';
                        getSubTotal(this);
                    } else {
                        reduce.innerHTML = '';
                    }
                    break;
                case 'control del':
                    var conf = confirm('are you sure delete this row');
                    if (conf) {
                        this.parentNode.removeChild(this);
                    }

                    break;
                default:
                    break;
            }

            getTotal();
        }


        //鼠标直接输入框内输入
        tr[i].getElementsByTagName('input')[1].onkeyup=function(){
        	var val=parseInt(this.value);
        	var tr=this.parentNode.parentNode;
        	var span=tr.getElementsByTagName('span');
        	if(isNaN(val) || val<1){
        		val=1;
        	}
        	this.value=val;
        	if(val>1){
        		span[1].innerHTML='-';
        	}else{
        		span[1].innerHTML='';
        	}
        	getTotal();
        	getSubTotal(tr);
        }
    }
    




    //一次性删除所有选取商品
    foot.onclick = function(e) {
        var ev = e || window.e;
        var evl = ev.srcElement;
        var evCl = evl.className;
        //console.log(evCl);
        switch (evCl) {
            case 'all-del':
                if (selectedtotal.innerHTML != '0') {
                    var conf = confirm('are you sure delete this row');
                    if (conf) {
                        delSelect();
                        getTotal();
                    }
                }
                break;
            default:
                break;
        }
    }
//一次性删除商品
    function delSelect() {
        for (var i = 0; i < tr.length; i++) {
            var inputs = tr[i].getElementsByTagName('input')[0];
            if (inputs.checked) {
                tr[i].parentNode.removeChild(tr[i]);
                i--;
            }
            getTotal();
        }
    }






    //所选商品的展示
    selected.onclick = function() {
        if (foot.className == 'foot') {
            if (selectedtotal.innerHTML != 0) {
                foot.className = 'foot show';
            }
        } else {

            foot.className = 'foot';
            console.log(this.className);
        }
    }






    //顶部的全选功能
    allChecked.onchange = function() {
        for (var k = 0; k < inputChecked.length; k++) {
            inputChecked[k].checked = this.checked;

        }
        selectedallDown.checked = this.checked;
        getTotal();
        //console.log(inputChecked.checked);

    }

    //下部的全选
    selectedallDown.onchange = function() {
        for (var k = 0; k < inputChecked.length; k++) {
            inputChecked[k].checked = this.checked;
        }
        allChecked.checked = this.checked;
        getTotal();

        //console.log(inputChecked.checked);
    }



    



    //展示所选商品的动画效果_删除商品
    veiwSelectedList.onclick = function(e) {
        var ev = e || window.e;
        var evS = ev.srcElement;
        var evCl = evS.className;
        if (evCl == 'del-selected') {
            var index = evS.getAttribute('index');
            //console.log(index);
            this.removeChild(evS.parentNode);
            tr[index].getElementsByTagName('input')[0].checked = false;
            getTotal();
        }
    }

allChecked.checked=true;
allChecked.onchange();



}



/**
 * 单独选择时，全选择完成，全选按钮没触发
 * 当选择浏览栏打开，操作增加商品，点击单选框，浏览栏会关闭
 * 当上述操作出现，商品的箭头并没发生改变
 */