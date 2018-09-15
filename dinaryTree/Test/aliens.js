window.load=function(){


	//调用binary_tree.js里面的函数
	
	document.write('<script src="binary_tree.js" type="text/javascript"></script>')
	


	var GameAliens=function(){

		var aliensX=0,
			aliensY=0,
			guessX=0,
			guessY=0,
			misslieX=0,
			misslieY=0,
			shotsRemaining=20,
			shotsMade=0,
			gameState='',
			gameWin=false;


		var cannon=document.getElemtnsById('connon'),
			aliens=document.getElemtnsById('aliens'),
			plosion=document.getElemtnsById('plosion'),
			bomb=document.getElemtnsById('bomb'),
			inputX=document.getElemtnsById('inputX'),
			inputY=document.getElemtnsById('inputY'),
			btn=document.getElemtnsById('btn');


		//实例化 BinaryTree()
		var binarytree=new BinaryTree();

	}

}