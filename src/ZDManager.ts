class ZDManager extends egret.Sprite{
	
	public zm:Array<ZD>;		//Array动态数组(容器)，通过添加，添加对象，移除对象。
	public game:MainGame;

	public constructor(game:MainGame) {
		super();
		this.game = game;
		this.zm = new Array();
	}
	//每create一次就new一个
	public create(id:number,x:number,y:number,v:number,n:number,game:MainGame){
		//生成子弹
		let one = new ZD(id,x,y,v,n,game);
		//添加到世界
		this.addChild(one);
		//放到仓库数组最后
		this.zm.push(one);
		
	}
	//更新所有子弹，找到每一颗子弹，每颗更新
	public update(){
		//整个仓库长度 ，利用循环可 以循环出所有子弹
		for(let i = 0 ; i < this.zm.length ; i++){
			//找到每颗子弹
			let one = this.zm[i];
			one.update();
			//j是NPC game是上一级，nm：所有NPC(工厂) ，nm:仓库数组Array.length 仓库长度
			for(let j = 0 ; j < this.game.nm.nm.length; j ++){
				let npc = this.game.nm.nm[j];
				if(npc.isHit(one.x,one.y) == true){
					npc.hp -= one.gj;
					//NPC消失
					if(npc.hp <= 0 ){
						npc.dead();
						npc.vis = false;
					}
				
					//子弹消失
					one.vis = false;
					//子弹和NPC碰撞结束，
					break;	
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
}