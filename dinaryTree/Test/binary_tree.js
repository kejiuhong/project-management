


function BinaryTree() {

    //添加一个含有this.key,this.left,this.right属性的node传入值

    var Node = function(key) {

        this.key = key,
            this.left = null,
            this.right = null

    };

    var root = null; //初始化根节点


    //将传入值进行判断
    var insertNode = function(node, newNode) {

        if (newNode.key < node.key) {

            //如果小于根节点就像又判断根节点左边是否有数值
            if (node.left === null) {
                node.left = newNode;
            } else {
                insertNode(node.left, newNode);
            }

        } else {
            //如果小于根节点就像又判断根节点左边是否有数值
            if (node.right === null) {
                node.right = newNode;
            } else {
                insertNode(node.right, newNode);
            }
        }
    };



    //第一个函数接口，判断根节点是否存在
    //
    this.insert = function(key) {
        var newNode = new Node(key);

        if (root === null) {
            root = newNode;
        } else {
            //如果存在就执行上面的函数
            insertNode(root, newNode);
        }
    };


    //将三叉树的值按照倒序排列并打印出来

    var inOrderTraverseNode = function(node, callback) {
        if (node !== null) {
            inOrderTraverseNode(node.left, callback);
            callback(node.key);
            inOrderTraverseNode(node.right, callback);
        }
    };


    //将root根植和传入的值callback 赋值给inOrderTraverseNodes;
    this.inOrderTraverse = function(callback) {
        inOrderTraverseNode(root, callback);
    };



    //前序遍历三叉树
    
    var preOrderTraverseNode=function(node,callback){
        if(node!==null){
            preOrderTraverseNode(node.left,callback);
            preOrderTraverseNode(node.right,callback);
            callback(node.key);
        }
    }
    this.preOrderTraverse=function(callback){
        preOrderTraverseNode(root,callback);
    };

    //前序遍历三叉树 end
    

    //后序遍历三叉树


    var postOrderTraverseNode=function(node,callback){
        if(node!==null){
            callback(node.key);
            postOrderTraverseNode(node.left,callback);
            postOrderTraverseNode(node.right,callback);
        }
    };

    this.postOrderTraverse=function(callback){
        postOrderTraverseNode(root,callback);
    }


    //三叉树根据已知数据找到节点并打印出来
    var searchNode=function(node,key){
        if(node===null){
            return null;
        }else{
            if (key<node.key){
                return searchNode(node.left,key);
            }else if(key>node.key){
                return searchNode(node.right,key);
            }else{
                return node;
            }
            console.log('已知值：'+key+'找到的值'+node);
        }

    }
    
    this.search=function(key){
        searchNode(root,key);
        
    }


}



//建立一个数组并赋值
var nodes = [8, 3, 10, 1, 6, 14, 4, 7, 13];

//实例化binaryTree
var binarytree = new BinaryTree();

//遍历nodes里面的值，将其传入binarytree.insert

nodes.forEach(function(key) {
    binarytree.insert(key);
})


//将三叉树的值打印出来

//定义个callback函数，将传入到此函数的值打印出来
var callback = function(key) {
    console.log('已知值：'+key);
}

//将callback函数作为参数，赋值进入inOrderTraverse

binarytree.search(1);

