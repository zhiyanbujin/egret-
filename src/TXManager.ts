class TXManager extends egret.Sprite{
	
	public tm:Array<TX>;		//Array动态数组(容器)，通过添加，添加对象，移除对象。
	public game:MainGame;

	public constructor(game:MainGame) {
		super();
		this.game = game;
		this.tm = new Array();
	}
	//每create一次就new一个
	public create(id:number,x:number,y:number,t:number,l:number,game:MainGame){
		//生成子弹
		let one = new TX(id,x,y,t,l,this);
		//添加到世界
		this.addChild(one);
		//放到仓库数组最后
		this.tm.push(one);
		
	}
	//更新所有子弹，找到每一颗子弹，每颗更新
	public update(){
		//整个仓库长度 ，利用循环可 以循环出所有子弹
		for(let i = 0 ; i < this.tm.length ; i++){
			//找到每颗子弹
			let one = this.tm[i];
			one.update();
			//若子弹太多，仓库会满，所以子弹需要移除
			//子弹出屏，vis == false。移除
			if(one.vis == false){
				//先从场景移除
				this.removeChild(one);
				//仓库移除 
				this.tm.splice(i ,1);
				//移除一个对象，长度-1
				i--;
			}
		}
	}
}