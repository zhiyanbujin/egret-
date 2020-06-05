class NZDManager extends egret.Sprite{
	
	public zm:Array<NZD>;		//Array动态数组(容器)，通过添加，添加对象，移除对象。
	public game:MainGame;

	public constructor(game:MainGame) {
		super();
		this.game = game;
		this.zm = new Array();
	}
	//每create一次就new一个
	public create(id:number,x:number,y:number,v:number,n?:number){
		
		//如果n角度是空的，就是没有赋值
		if(!n){
			n = Math.atan2(this.game.player.x - x,y - this.game.player.y);
			//注意：三角函数算出的都是弧度制，还需要弧度制转换角度制
			n = n * 180/Math.PI;

		}


		//生成子弹
		let one = new NZD(id,x,y,v,n,this.game);
		//添加到世界
		this.addChild(one);
		//放到仓库数组最后
		this.zm.push(one);
		
	}
	//更新所有子弹，找到每一颗子弹，每颗更新
	public update(){
		//整个仓库长度 ，利用循环可以循环出所有子弹
		for(let i = 0 ; i < this.zm.length ; i++){
			//找到每颗子弹
			let one = this.zm[i];
			one.update();
			if(this.game.player.isHit(one.x , one.y) ==true ){
				
				one.vis = false;
				if(this.game.player.m == 1 && this.game.player.bhT <= 0 ){
					this.game.player.dead();
				} 
			}
			//若子弹太多，仓库会满，所以子弹需要移除
			//子弹出屏，vis == false。移除
			if(one.vis == false){
				//先从场景移除
				this.removeChild(one);
				//仓库移除 
				this.zm.splice(i ,1);
				//移除一个对象，长度-1
				i--;
			}
		}
	}
	
	public reset(){
		for(let i = 0 ; i < this.zm.length ; i++){
			let one = this.zm[i];
				
					this.removeChild(one);
					this.zm.splice(i ,1);
					i--;
				}
		

	}

}