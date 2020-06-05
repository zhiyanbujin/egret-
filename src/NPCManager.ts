class NPCManager extends egret.Sprite{
	
	
	public nm:Array<NPC0>;		//Array动态数组(容器)，通过添加，添加对象，移除对象。

	public game:MainGame;
	public t:number;			//生成计时
	public cID:number;		//当前生成的波数

	public constructor(game:MainGame) {
		super();
		this.game = game;
		this.nm = new Array();

		this.t = 0 ;
		this.cID = 0;
	}
	//每create一次就new一个
	public create(id:number,x:number,y:number,v?:number,dy?:number){
		//生成子弹
		// let one = new NPC0(x,y,v,this);
		let one = null;
		switch(id){
			//从上飞到下
			case 0 :
				one = new NPC0(x,y,v,this);
			break;
			//从上飞到下，转向回去
			case 1 :
				one = new NPC1(x,y,v,dy,this);
			break;
			//BOSS id
			case 100:
				one = new BOSS0(x,y, this);
			break;
		}
		//添加到世界
		this.addChild(one);
		//放到仓库数组最后
		this.nm.push(one);
	}
	//更新所有子弹，找到每一颗子弹，每颗更新
	public update(){
		this.zl();
		//整个仓库长度 ，利用循环可以循环出所有子弹
		for(let i = 0 ; i < this.nm.length ; i++){
			//找到每颗子弹
			let one = this.nm[i];
			one.update();
			//若子弹太多，仓库会满，所以子弹需要移除
			//子弹出屏，vis == false。移除
			if(one.vis == false){
				//先从场景移除
				this.removeChild(one);
				//仓库移除 
				this.nm.splice(i ,1);
				//移除一个对象，长度-1
				i--;
			}
		}
	}
		//时间阵列
	// 	public zl(){
	// 		this.t++;
	// 	switch(this.t){
	// 		//左侧3
	// 		case 10 :
	// 			this.create( 0 , 100 , -100 , 15 , 0);
	// 			this.create( 0 , 100 , -200 , 15 , 0);
	// 			this.create( 0 , 100 , -300 , 15 , 0);
	// 		break;
	// 		//右侧3
	// 		case 20 :
	// 			this.create( 0 , 300 , -100 , 15 , 0);
	// 			this.create( 0 , 300 , -200 , 15 , 0);
	// 			this.create( 0 , 300 , -300 , 15 , 0);
	// 		break;
	// 		//中间3个
	// 		case 30 :
	// 			this.create( 1 , 200 , -100 , 15 , 300);
	// 			this.create( 1 , 300 , -250 , 15 , 300);
	// 			this.create( 1 , 100 , -250 , 15 , 300);
	// 		break;
	// 		case 100 :
	// 			this.create( 100 , 240 , -200);
	// 		break;
	// 	}
	// }
	//NPC阵列生成
	public zl(){
		//仓库长度<=0 说明仓库是空的。
		if(this.nm.length <= 0){
			this.t++;
			//每波NPC间隔10个主循环
			if(this.t > 10)
			{	
				switch(this.game.level)
				{
					case 0 :
						switch(this.cID)
						{
							// 时间队列模式:根据时间生成  左侧3  case10，20，30
							case 0 :
								this.create( 0 , 100 , -100 , 15 );
								this.create( 0 , 100 , -200 , 15 );
								this.create( 0 , 100 , -300 , 15 );
								break;
							//右侧3
							case 1 :
								this.create( 0 , 300 , -100 , 15 );
								this.create( 0 , 300 , -200 , 15 );
								this.create( 0 , 300 , -300 , 15 );
								break;
							//中间BOSS0
							case 2 :
								this.create( 100 , 240 , -200 );
								break;
						}
					break;
					case 1 :
							switch(this.cID){
							case 2 :
								this.create( 100 , 240 , -200 );
							break;
							}
						break;
						}
							this.t = 0;
							this.cID++;
							// if(this.cID >=4)
							// {
							// 	this.cID = 0;
							// }
							// 	break;
							// }
						
			}
		}
		  		// if(this.t <=0){

        //    this.nm.create( Math.floor(Math.random()*2),
        //    Math.random()*480, -200,Math.random()*5 + 10 , 300);
        //    this.t = Math.random()* 20 + 10;
        // }
	}
	//获取NPC
	public getNPC():NPC{
		//仓库长度>0说明有NPC,如果没有跳出
		if(this.nm.length > 0 ){
			//有npc 随机取一个npc。
			let npc = this.nm[Math.floor(Math.random()* this.nm.length)]
			//判断npc是否在屏幕内，满足条件在屏幕内
			if(npc.x > 0 && npc.x < 480 && npc.y > 0 && npc.y < 800){
				return npc;
			}
		}
		//没找到 为空
		return null;
	}
	//仓库中所有东西 移除
	public reset(){
			//整个仓库长度 ，利用循环可以循环出所有子弹
			for(let i = 0 ; i < this.nm.length ; i++){
				//找到每颗子弹
				let one = this.nm[i];
					this.removeChild(one);
					this.nm.splice(i ,1);
					i--;
			
			}
			this.t =0;
			this.cID = 0;
			}
	
}